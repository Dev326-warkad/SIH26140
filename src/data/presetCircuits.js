/**
 * Pre-built Quantum Algorithm Library Presets
 */

export const PRESET_CIRCUITS = [
  {
    id: 'bell-state',
    name: 'Bell State |Φ⁺⟩',
    numQubits: 2,
    description: 'Maximal 2-qubit entanglement (|00⟩ + |11⟩)/√2 created via Hadamard and CNOT.',
    gates: [
      { id: 'b1', type: 'H', target: 0, step: 0 },
      { id: 'b2', type: 'CX', control: 0, target: 1, step: 1 }
    ]
  },
  {
    id: 'ghz-state',
    name: '3-Qubit GHZ State',
    numQubits: 3,
    description: 'Greenberger–Horne–Zeilinger state (|000⟩ + |111⟩)/√2 demonstrating multi-particle non-locality.',
    gates: [
      { id: 'g1', type: 'H', target: 0, step: 0 },
      { id: 'g2', type: 'CX', control: 0, target: 1, step: 1 },
      { id: 'g3', type: 'CX', control: 1, target: 2, step: 2 }
    ]
  },
  {
    id: 'deutsch-jozsa',
    name: 'Deutsch-Jozsa (Balanced Oracle)',
    numQubits: 2,
    description: 'Determines global balanced property of oracle f(x) in 1 query via phase kickback.',
    gates: [
      { id: 'd1', type: 'X', target: 1, step: 0 },
      { id: 'd2', type: 'H', target: 0, step: 1 },
      { id: 'd3', type: 'H', target: 1, step: 1 },
      { id: 'd4', type: 'CX', control: 0, target: 1, step: 2 },
      { id: 'd5', type: 'H', target: 0, step: 3 }
    ]
  },
  {
    id: 'grover-2q',
    name: 'Grover Search (Target |11⟩)',
    numQubits: 2,
    description: 'Amplifies amplitude of marked state |11⟩ to 100% probability using oracle & diffusion operator.',
    gates: [
      { id: 'gr1', type: 'H', target: 0, step: 0 },
      { id: 'gr2', type: 'H', target: 1, step: 0 },
      { id: 'gr3', type: 'CZ', control: 0, target: 1, step: 1 },
      { id: 'gr4', type: 'H', target: 0, step: 2 },
      { id: 'gr5', type: 'H', target: 1, step: 2 },
      { id: 'gr6', type: 'X', target: 0, step: 3 },
      { id: 'gr7', type: 'X', target: 1, step: 3 },
      { id: 'gr8', type: 'CZ', control: 0, target: 1, step: 4 },
      { id: 'gr9', type: 'X', target: 0, step: 5 },
      { id: 'gr10', type: 'X', target: 1, step: 5 },
      { id: 'gr11', type: 'H', target: 0, step: 6 },
      { id: 'gr12', type: 'H', target: 1, step: 6 }
    ]
  },
  {
    id: 'qft-3q',
    name: 'Quantum Fourier Transform (3-Qubit)',
    numQubits: 3,
    description: 'Maps computational basis states to frequency domain basis via phase rotations.',
    gates: [
      { id: 'qft1', type: 'H', target: 0, step: 0 },
      { id: 'qft2', type: 'S', target: 0, step: 1 },
      { id: 'qft3', type: 'H', target: 1, step: 2 },
      { id: 'qft4', type: 'T', target: 1, step: 3 },
      { id: 'qft5', type: 'H', target: 2, step: 4 }
    ]
  }
];
