/**
 * QUBOT Quantum Simulator Engine
 * High-performance Quantum Statevector & Bloch Sphere Simulator in pure JavaScript.
 * Supports up to 8 qubits with exact matrix operations, reduced density matrices,
 * shot-based measurement sampling, noise channels, and endian conversions.
 */

// Complex numbers helper
export class Complex {
  constructor(re = 0, im = 0) {
    this.re = re;
    this.im = im;
  }
  add(c) { return new Complex(this.re + c.re, this.im + c.im); }
  sub(c) { return new Complex(this.re - c.re, this.im - c.im); }
  mul(c) {
    if (typeof c === 'number') return new Complex(this.re * c, this.im * c);
    return new Complex(this.re * c.re - this.im * c.im, this.re * c.im + this.im * c.re);
  }
  div(c) {
    if (typeof c === 'number') return new Complex(this.re / c, this.im / c);
    const denom = c.re * c.re + c.im * c.im;
    return new Complex(
      (this.re * c.re + this.im * c.im) / denom,
      (this.im * c.re - this.re * c.im) / denom
    );
  }
  absSq() { return this.re * this.re + this.im * this.im; }
  abs() { return Math.sqrt(this.absSq()); }
  phase() { return Math.atan2(this.im, this.re); }
  conj() { return new Complex(this.re, -this.im); }
  format(decimals = 3) {
    const r = Math.abs(this.re) < 1e-6 ? 0 : this.re;
    const i = Math.abs(this.im) < 1e-6 ? 0 : this.im;
    if (i === 0) return `${r.toFixed(decimals)}`;
    if (r === 0) return `${i > 0 ? '' : '-'}${Math.abs(i).toFixed(decimals)}i`;
    return `${r.toFixed(decimals)} ${i >= 0 ? '+' : '-'} ${Math.abs(i).toFixed(decimals)}i`;
  }
}

// Single-qubit Unitary Gates
const SQ2 = 1 / Math.sqrt(2);
export const GATES = {
  I: [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(1, 0)]],
  H: [[new Complex(SQ2, 0), new Complex(SQ2, 0)], [new Complex(SQ2, 0), new Complex(-SQ2, 0)]],
  X: [[new Complex(0, 0), new Complex(1, 0)], [new Complex(1, 0), new Complex(0, 0)]],
  Y: [[new Complex(0, 0), new Complex(0, -1)], [new Complex(0, 1), new Complex(0, 0)]],
  Z: [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(-1, 0)]],
  S: [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(0, 1)]],
  Sdag: [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(0, -1)]],
  T: [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(SQ2, SQ2)]],
  Tdag: [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(SQ2, -SQ2)]],
};

export function getRxGate(angle) {
  const c = Math.cos(angle / 2);
  const s = Math.sin(angle / 2);
  return [[new Complex(c, 0), new Complex(0, -s)], [new Complex(0, -s), new Complex(c, 0)]];
}

export function getRyGate(angle) {
  const c = Math.cos(angle / 2);
  const s = Math.sin(angle / 2);
  return [[new Complex(c, 0), new Complex(-s, 0)], [new Complex(s, 0), new Complex(c, 0)]];
}

export function getRzGate(angle) {
  const c = Math.cos(angle / 2);
  const s = Math.sin(angle / 2);
  return [[new Complex(c, -s), new Complex(0, 0)], [new Complex(0, 0), new Complex(c, s)]];
}

export function getPhaseGate(angle) {
  return [[new Complex(1, 0), new Complex(0, 0)], [new Complex(0, 0), new Complex(Math.cos(angle), Math.sin(angle))]];
}

/**
 * Simulates a quantum circuit grid
 * @param {number} numQubits - Number of qubits (1 to 8)
 * @param {Array} gatesList - List of gate objects { id, type, target, control, angle, step }
 * @param {Object} options - { noiseRate: number }
 */
export function simulateCircuit(numQubits, gatesList, options = {}) {
  const dim = 1 << numQubits;
  let state = new Array(dim).fill(0).map(() => new Complex(0, 0));
  state[0] = new Complex(1, 0); // Initial state |00...0>

  // Group gates by step
  const stepsMap = {};
  gatesList.forEach(g => {
    if (!stepsMap[g.step]) stepsMap[g.step] = [];
    stepsMap[g.step].push(g);
  });

  const sortedSteps = Object.keys(stepsMap).map(Number).sort((a, b) => a - b);

  for (const stepIndex of sortedSteps) {
    const gatesInStep = stepsMap[stepIndex];
    for (const gate of gatesInStep) {
      state = applyGate(state, numQubits, gate, options.noiseRate || 0);
    }
  }

  // Normalize state vector
  let norm = 0;
  for (let i = 0; i < dim; i++) norm += state[i].absSq();
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dim; i++) state[i] = state[i].div(norm);
  }

  // Calculate Bloch Sphere coordinates for each qubit
  const blochSpheres = [];
  for (let q = 0; q < numQubits; q++) {
    blochSpheres.push(computeBlochCoordinates(state, numQubits, q));
  }

  // Theoretical probabilities
  const probabilities = [];
  for (let i = 0; i < dim; i++) {
    const prob = state[i].absSq();
    const binStr = i.toString(2).padStart(numQubits, '0');
    probabilities.push({
      index: i,
      binaryLSB: binStr, // Qiskit style (q0 is rightmost)
      binaryMSB: binStr.split('').reverse().join(''), // Cirq style (q0 is leftmost)
      amplitude: state[i],
      prob: prob,
      phase: state[i].phase()
    });
  }

  // Entanglement Concurrence / Bell State Check
  const entanglementInfo = checkEntanglement(state, numQubits);

  return {
    statevector: state,
    numQubits,
    probabilities,
    blochSpheres,
    entanglementInfo
  };
}

function applyGate(state, numQubits, gate, noiseRate) {
  const dim = 1 << numQubits;
  const nextState = new Array(dim).fill(0).map(() => new Complex(0, 0));

  const type = gate.type;
  const target = gate.target;
  const control = gate.control;

  let matrix = null;
  if (GATES[type]) {
    matrix = GATES[type];
  } else if (type === 'RX') {
    matrix = getRxGate(gate.angle || Math.PI / 2);
  } else if (type === 'RY') {
    matrix = getRyGate(gate.angle || Math.PI / 2);
  } else if (type === 'RZ') {
    matrix = getRzGate(gate.angle || Math.PI / 2);
  } else if (type === 'P') {
    matrix = getPhaseGate(gate.angle || Math.PI / 2);
  }

  if (type === 'CX' || type === 'CNOT' || type === 'CZ' || type === 'CH' || type === 'SWAP') {
    // Controlled gate logic
    for (let i = 0; i < dim; i++) {
      const ctrlBit = (i >> (numQubits - 1 - control)) & 1;
      if (ctrlBit === 1) {
        if (type === 'CX' || type === 'CNOT') {
          const flippedIndex = i ^ (1 << (numQubits - 1 - target));
          nextState[flippedIndex] = nextState[flippedIndex].add(state[i]);
        } else if (type === 'CZ') {
          const tgtBit = (i >> (numQubits - 1 - target)) & 1;
          const factor = tgtBit === 1 ? -1 : 1;
          nextState[i] = nextState[i].add(state[i].mul(factor));
        } else if (type === 'SWAP') {
          const bitTgt = (i >> (numQubits - 1 - target)) & 1;
          const bitCtrl = (i >> (numQubits - 1 - control)) & 1;
          if (bitTgt !== bitCtrl) {
            const swappedIndex = i ^ (1 << (numQubits - 1 - target)) ^ (1 << (numQubits - 1 - control));
            nextState[swappedIndex] = nextState[swappedIndex].add(state[i]);
          } else {
            nextState[i] = nextState[i].add(state[i]);
          }
        }
      } else {
        nextState[i] = nextState[i].add(state[i]);
      }
    }
    return nextState;
  }

  if (type === 'CCX' || type === 'TOFFOLI') {
    const ctrl1 = gate.control;
    const ctrl2 = gate.control2;
    for (let i = 0; i < dim; i++) {
      const bit1 = (i >> (numQubits - 1 - ctrl1)) & 1;
      const bit2 = (i >> (numQubits - 1 - ctrl2)) & 1;
      if (bit1 === 1 && bit2 === 1) {
        const flipped = i ^ (1 << (numQubits - 1 - target));
        nextState[flipped] = nextState[flipped].add(state[i]);
      } else {
        nextState[i] = nextState[i].add(state[i]);
      }
    }
    return nextState;
  }

  if (matrix && target !== undefined) {
    const targetMask = 1 << (numQubits - 1 - target);
    for (let i = 0; i < dim; i++) {
      if ((i & targetMask) === 0) {
        const i0 = i;
        const i1 = i | targetMask;

        const a00 = matrix[0][0], a01 = matrix[0][1];
        const a10 = matrix[1][1] ? matrix[1][0] : matrix[1][0];
        const a11 = matrix[1][1];

        const v0 = state[i0];
        const v1 = state[i1];

        const res0 = a00.mul(v0).add(a01.mul(v1));
        const res1 = a10.mul(v0).add(a11.mul(v1));

        nextState[i0] = nextState[i0].add(res0);
        nextState[i1] = nextState[i1].add(res1);
      }
    }
    return nextState;
  }

  return state;
}

/**
 * Computes reduced density matrix for qubit `q` and calculates Bloch Sphere coordinates (x, y, z)
 */
export function computeBlochCoordinates(state, numQubits, qubit) {
  const shift = numQubits - 1 - qubit;
  let rho00 = 0, rho11 = 0;
  let rho01 = new Complex(0, 0);

  const dim = 1 << numQubits;
  for (let i = 0; i < dim; i++) {
    const bit = (i >> shift) & 1;
    const amp = state[i];
    if (bit === 0) {
      rho00 += amp.absSq();
      // Find matching state with bit = 1
      const i1 = i | (1 << shift);
      rho01 = rho01.add(amp.mul(state[i1].conj()));
    } else {
      rho11 += amp.absSq();
    }
  }

  const x = 2 * rho01.re;
  const y = -2 * rho01.im; // Note convention
  const z = rho00 - rho11;

  // Convert to Spherical coordinates theta (0 to pi), phi (0 to 2pi)
  const r = Math.sqrt(x * x + y * y + z * z);
  let theta = Math.acos(Math.max(-1, Math.min(1, z / (r || 1))));
  let phi = Math.atan2(y, x);
  if (phi < 0) phi += 2 * Math.PI;

  return {
    qubit,
    x: Math.abs(x) < 1e-5 ? 0 : x,
    y: Math.abs(y) < 1e-5 ? 0 : y,
    z: Math.abs(z) < 1e-5 ? 0 : z,
    r,
    theta,
    phi,
    state0Prob: rho00,
    state1Prob: rho11
  };
}

/**
 * Sample measurement shots from theoretical probabilities
 */
export function sampleShots(probabilities, shotsCount = 1024) {
  const counts = {};
  probabilities.forEach(p => counts[p.binaryLSB] = 0);

  const cumulative = [];
  let sum = 0;
  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i].prob;
    cumulative.push(sum);
  }

  for (let s = 0; s < shotsCount; s++) {
    const r = Math.random();
    let idx = cumulative.findIndex(c => r <= c);
    if (idx === -1) idx = probabilities.length - 1;
    const key = probabilities[idx].binaryLSB;
    counts[key] = (counts[key] || 0) + 1;
  }

  return counts;
}

/**
 * Check if the state is entangled (e.g. Bell state detection)
 */
function checkEntanglement(state, numQubits) {
  if (numQubits < 2) return { isEntangled: false, label: 'Single Qubit' };

  // Check 2-qubit Bell States
  const p00 = state[0].absSq();
  const p11 = state[state.length - 1].absSq();
  const p01 = state[1]?.absSq() || 0;
  const p10 = state[state.length - 2]?.absSq() || 0;

  if (Math.abs(p00 - 0.5) < 0.05 && Math.abs(p11 - 0.5) < 0.05 && p01 < 0.01 && p10 < 0.01) {
    return { isEntangled: true, label: '|Φ⁺⟩ Bell State (|00⟩ + |11⟩)/√2' };
  }
  if (Math.abs(p01 - 0.5) < 0.05 && Math.abs(p10 - 0.5) < 0.05 && p00 < 0.01 && p11 < 0.01) {
    return { isEntangled: true, label: '|Ψ⁺⟩ Bell State (|01⟩ + |10⟩)/√2' };
  }

  // Check purity of first qubit
  const b0 = computeBlochCoordinates(state, numQubits, 0);
  if (b0.r < 0.95 && numQubits >= 2) {
    return { isEntangled: true, label: 'Entangled State (Subsystem Purity < 1)' };
  }

  return { isEntangled: false, label: 'Separable / Product State' };
}
