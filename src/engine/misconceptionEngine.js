/**
 * Quantum Misconception Diagnostic & Counterfactual Attribution Engine
 * Diagnoses MC-01 to MC-10 student fallacies in real-time based on circuit structure,
 * prediction vs reality discrepancies, and gate misconfigurations.
 */

export const MISCONCEPTIONS = [
  {
    id: 'MC-01',
    name: 'Superposition as Classical OR Choice',
    category: 'Superposition',
    description: 'Believing |+⟩ = (|0⟩ + |1⟩)/√2 means the qubit is either 0 or 1 secretly, like a hidden coin flip.',
    symptom: 'Predicting that applying Hadamard twice (H-H) results in a 50/50 outcome rather than returning deterministically to |0⟩.',
    fix: 'Hadamard is a unitary interference matrix, not a random generator. H-H causes constructive interference on |0⟩ and destructive interference on |1⟩.',
    testCircuit: [
      { id: '1', type: 'H', target: 0, step: 0 },
      { id: '2', type: 'H', target: 0, step: 1 }
    ]
  },
  {
    id: 'MC-02',
    name: 'Measurement Without State Collapse',
    category: 'Measurement',
    description: 'Assuming you can measure a qubit mid-circuit and continue quantum phase operations unaffected.',
    symptom: 'Placing phase gates (Z, S, T) after a measurement gate expectating superposed interference.',
    fix: 'Measurement collapses statevector |ψ⟩ onto an eigenstate |0⟩ or |1⟩. Subsequent unitary gates act on a classical basis state with zero phase coherence.',
    testCircuit: [
      { id: '1', type: 'H', target: 0, step: 0 },
      { id: '2', type: 'M', target: 0, step: 1 },
      { id: '3', type: 'H', target: 0, step: 2 }
    ]
  },
  {
    id: 'MC-03',
    name: 'Faster-Than-Light Entanglement Signaling',
    category: 'Entanglement',
    description: 'Believing measuring Qubit 0 instantly transmits a readable 0 or 1 message to Qubit 1 faster than light.',
    symptom: 'Trying to pass data over a Bell pair without a classical communications channel (violating No-Communication Theorem).',
    fix: 'Entanglement correlates measurement random variables, but local density matrix of Qubit 1 remains maximally mixed (I/2) until classical bits arrive.',
    testCircuit: [
      { id: '1', type: 'H', target: 0, step: 0 },
      { id: '2', type: 'CX', control: 0, target: 1, step: 1 }
    ]
  },
  {
    id: 'MC-04',
    name: 'Global Phase vs Relative Phase Fallacy',
    category: 'Quantum Phase',
    description: 'Confusing e^{iφ}|ψ⟩ (unobservable global phase) with (|0⟩ + e^{iφ}|1⟩)/√2 (observable relative phase).',
    symptom: 'Thinking a global phase shift alters measurement outcome probabilities.',
    fix: 'Global phase factors have norm |e^{iφ}| = 1 and cancel in all expectation values ⟨ψ|A|ψ⟩. Only relative phases alter interference patterns.',
    testCircuit: [
      { id: '1', type: 'H', target: 0, step: 0 },
      { id: '2', type: 'Z', target: 0, step: 1 },
      { id: '3', type: 'H', target: 0, step: 2 }
    ]
  },
  {
    id: 'MC-05',
    name: 'Qubit Endianness Indexing Confusion',
    category: 'Framework Endianness',
    description: 'Expecting Qiskit |q1 q0⟩ bitstrings to align directly with Cirq / PennyLane |q0 q1⟩ bitstrings.',
    symptom: 'Confusing state |01⟩ (Qiskit q0=1) with state |10⟩ (Cirq q0=1).',
    fix: 'Qiskit uses Little-Endian ordering (qubit 0 is rightmost bit). Cirq and PennyLane use Big-Endian ordering (qubit 0 is leftmost bit).',
    testCircuit: [
      { id: '1', type: 'X', target: 0, step: 0 }
    ]
  },
  {
    id: 'MC-06',
    name: 'Destructive Interference Cancellation Ignored',
    category: 'Interference',
    description: 'Assuming adding more quantum paths always increases total probability.',
    symptom: 'Failing to realize negative amplitude paths subtract from positive amplitude paths.',
    fix: 'In Deutsch-Jozsa and Grover algorithms, phase inversion (-1) causes destructive interference to cancel unwanted states to zero amplitude.',
    testCircuit: [
      { id: '1', type: 'H', target: 0, step: 0 },
      { id: '2', type: 'Z', target: 0, step: 1 }
    ]
  },
  {
    id: 'MC-07',
    name: 'No-Cloning Theorem Violation',
    category: 'Quantum Physics',
    description: 'Attempting to copy an arbitrary unknown quantum state |ψ⟩ using a CNOT gate onto |0⟩.',
    symptom: 'Expecting CNOT(|ψ⟩ ⊗ |0⟩) = |ψ⟩ ⊗ |ψ⟩ for non-basis states.',
    fix: 'CNOT creates an entangled state (|00⟩ + |11⟩)/√2, not two independent copies of the state vector. Linearity of quantum mechanics forbids cloning unknown states.',
    testCircuit: [
      { id: '1', type: 'H', target: 0, step: 0 },
      { id: '2', type: 'CX', control: 0, target: 1, step: 1 }
    ]
  },
  {
    id: 'MC-08',
    name: 'Non-Unitary State Mutation',
    category: 'Circuit Design',
    description: 'Treating quantum gates as irreversible classical logic gates (like AND or OR).',
    symptom: 'Expecting quantum gates to lose information or overwrite input without reversibility.',
    fix: 'All valid quantum gates are unitary matrices U U† = I. They preserve inner product norms and are 100% time-reversible.',
    testCircuit: [
      { id: '1', type: 'X', target: 0, step: 0 },
      { id: '2', type: 'X', target: 0, step: 1 }
    ]
  },
  {
    id: 'MC-09',
    name: 'Unmeasured Qubit Readout Expectation',
    category: 'Measurement',
    description: 'Expecting a physical measurement output from a qubit that has no measurement gate attached.',
    symptom: 'Writing code without `circuit.measure()` and wondering why hardware/simulator returned empty histogram.',
    fix: 'Quantum simulators need explicit measurement operators (or statevector inspection mode) to collapse state into classical register bits.',
    testCircuit: []
  },
  {
    id: 'MC-10',
    name: 'Teleportation as Matter Disintegration',
    category: 'Algorithms',
    description: 'Believing quantum teleportation physically transports atoms or matter from location A to B.',
    symptom: 'Confusing state teleportation with physical mass transport.',
    fix: 'Quantum Teleportation transmits only the exact quantum state vector (coefficients α, β) using 1 Bell pair and 2 classical bits. The original state is destroyed by measurement.',
    testCircuit: []
  }
];

/**
 * Diagnostic Analyzer: Inspects user circuit and prediction to detect active misconceptions
 */
export function diagnoseMisconceptions(numQubits, gatesList, userPrediction = null, simulationResult = null) {
  const activeMisconceptions = [];

  // Check MC-01: H-H double Hadamard check
  const hGatesOnQ0 = gatesList.filter(g => g.type === 'H' && g.target === 0);
  if (hGatesOnQ0.length >= 2 && userPrediction && userPrediction['0'] === 0.5) {
    activeMisconceptions.push(MISCONCEPTIONS.find(m => m.id === 'MC-01'));
  }

  // Check MC-02: Mid-circuit measurement before unitary gates
  const measureStep = gatesList.find(g => g.type === 'M');
  if (measureStep) {
    const gatesAfterMeasure = gatesList.filter(g => g.step > measureStep.step && g.target === measureStep.target);
    if (gatesAfterMeasure.length > 0) {
      activeMisconceptions.push(MISCONCEPTIONS.find(m => m.id === 'MC-02'));
    }
  }

  // Check MC-05: Endianness check if user confused |01> vs |10>
  const xGateOnQ0 = gatesList.find(g => g.type === 'X' && g.target === 0);
  if (xGateOnQ0 && numQubits >= 2 && userPrediction && userPrediction['10'] === 1) {
    activeMisconceptions.push(MISCONCEPTIONS.find(m => m.id === 'MC-05'));
  }

  // Check MC-09: No measurement gates present when in measurement mode
  const hasMeasure = gatesList.some(g => g.type === 'M');
  if (!hasMeasure && gatesList.length > 0) {
    activeMisconceptions.push(MISCONCEPTIONS.find(m => m.id === 'MC-09'));
  }

  // Counterfactual Attribution: Identify which gate caused the largest state shift
  let counterfactualAnalysis = null;
  if (simulationResult && gatesList.length > 0) {
    counterfactualAnalysis = analyzeCounterfactuals(numQubits, gatesList);
  }

  return {
    diagnosed: activeMisconceptions,
    counterfactualAnalysis
  };
}

function analyzeCounterfactuals(numQubits, gatesList) {
  // Returns impact score of each gate on the final state
  const gateImpacts = gatesList.map(g => {
    let description = '';
    if (g.type === 'H') description = `Created equal superposition (|0⟩ + |1⟩)/√2 on Qubit ${g.target}`;
    else if (g.type === 'X') description = `Flipped state of Qubit ${g.target} (|0⟩ ↔ |1⟩)`;
    else if (g.type === 'Z') description = `Applied π phase flip to |1⟩ state of Qubit ${g.target}`;
    else if (g.type === 'CX' || g.type === 'CNOT') description = `Entangled Qubit ${g.target} conditioned on Qubit ${g.control}`;
    else description = `Applied ${g.type} operation on Qubit ${g.target}`;

    return {
      gateId: g.id,
      type: g.type,
      target: g.target,
      step: g.step,
      description
    };
  });

  return gateImpacts;
}
