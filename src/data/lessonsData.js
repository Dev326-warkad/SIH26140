/**
 * 12-Chapter Quantum Computing Curriculum Matrix
 * Divided across 4 Tracks: Foundations, Gates & Entanglement, Master Algorithms, Error Correction & Hardware
 */

export const CURRICULUM_TRACKS = [
  {
    id: 'track-1',
    title: 'Track 1: Quantum Foundations',
    description: 'Master Qubits, Superposition, Bloch Spheres, and Born Rule probability measurement.',
    lessons: [
      {
        id: 'l1',
        title: 'Lesson 1: The Single Qubit & Superposition',
        summary: 'Understand |0⟩, |1⟩, vector states, and how Hadamard gate creates equal superposition (|0⟩ + |1⟩)/√2.',
        checkpoint: 'Apply a Hadamard gate on Qubit 0 and observe the Bloch sphere vector rotate to the X-axis.',
        quiz: {
          question: 'What is the probability of measuring |1⟩ after applying a Hadamard gate to |0⟩?',
          options: ['0%', '25%', '50%', '100%'],
          correct: 2,
          explanation: 'Hadamard produces state (|0⟩ + |1⟩)/√2. The probability magnitude is |1/√2|² = 1/2 = 50%.'
        },
        presetCircuit: [
          { id: '1', type: 'H', target: 0, step: 0 }
        ]
      },
      {
        id: 'l2',
        title: 'Lesson 2: The Bloch Sphere & Phase Rotations',
        summary: 'Explore 3D state visualization θ and φ. Learn Pauli-X, Y, Z, and phase rotations Rx, Ry, Rz.',
        checkpoint: 'Apply Pauli-X to flip |0⟩ to |1⟩, then apply Rz(π/2) to introduce a 90° phase shift.',
        quiz: {
          question: 'Does applying a Pauli-Z gate alter measurement probabilities in the Z-basis?',
          options: ['Yes, it flips 0 to 1', 'No, it only changes relative phase φ', 'It collapses the qubit', 'It doubles the amplitude'],
          correct: 1,
          explanation: 'Z gate changes state (|0⟩ + |1⟩)/√2 into (|0⟩ - |1⟩)/√2. The probabilities stay 50/50, but relative phase changes by π.'
        },
        presetCircuit: [
          { id: '1', type: 'H', target: 0, step: 0 },
          { id: '2', type: 'Z', target: 0, step: 1 }
        ]
      },
      {
        id: 'l3',
        title: 'Lesson 3: Born Rule & Measurement Collapse',
        summary: 'Discover how quantum measurement projects continuous statevectors onto discrete classical basis bits.',
        checkpoint: 'Add a Measurement gate after superposition and run 1024 shots to observe statistical collapse.',
        quiz: {
          question: 'What happens to the quantum statevector immediately after measurement?',
          options: ['It remains superposed', 'It collapses to the measured eigenstate', 'It doubles its phase', 'It entangles with all qubits'],
          correct: 1,
          explanation: 'Measurement projects state |ψ⟩ = α|0⟩ + β|1⟩ to either |0⟩ or |1⟩ with non-unitary state collapse.'
        },
        presetCircuit: [
          { id: '1', type: 'H', target: 0, step: 0 },
          { id: '2', type: 'M', target: 0, step: 1 }
        ]
      }
    ]
  },
  {
    id: 'track-2',
    title: 'Track 2: Multi-Qubit Gates & Entanglement',
    description: 'Build 2-qubit circuits, CNOT gates, Bell states, and quantum teleportation protocols.',
    lessons: [
      {
        id: 'l4',
        title: 'Lesson 4: CNOT & Controlled Gates',
        summary: 'Master 2-qubit interactions where target qubit state is flipped conditioned on control qubit state.',
        checkpoint: 'Place X on Qubit 0, then CNOT(ctrl=0, target=1) to observe Qubit 1 flip to 1.',
        quiz: {
          question: 'If control qubit is |0⟩, what does CNOT do to target qubit?',
          options: ['Flips target', 'Leaves target unchanged', 'Sets target to superposition', 'Resets target'],
          correct: 1,
          explanation: 'CNOT matrix acts as Identity on target when control qubit is |0⟩.'
        },
        presetCircuit: [
          { id: '1', type: 'X', target: 0, step: 0 },
          { id: '2', type: 'CX', control: 0, target: 1, step: 1 }
        ]
      },
      {
        id: 'l5',
        title: 'Lesson 5: Bell States & Quantum Entanglement',
        summary: 'Create maximal 2-qubit entanglement (|00⟩ + |11⟩)/√2 and verify non-local correlations.',
        checkpoint: 'Build the Bell State |Φ⁺⟩ using H(q0) followed by CNOT(ctrl=0, target=1).',
        quiz: {
          question: 'In state (|00⟩ + |11⟩)/√2, if Qubit 0 is measured as 1, what will Qubit 1 be?',
          options: ['50% chance of 0', 'Always 0', 'Always 1', 'Undetermined'],
          correct: 2,
          explanation: 'Measuring Qubit 0 as 1 collapses the joint statevector instantly to |11⟩, ensuring Qubit 1 is 1.'
        },
        presetCircuit: [
          { id: '1', type: 'H', target: 0, step: 0 },
          { id: '2', type: 'CX', control: 0, target: 1, step: 1 }
        ]
      },
      {
        id: 'l6',
        title: 'Lesson 6: Quantum Teleportation Protocol',
        summary: 'Transfer an arbitrary unknown qubit state using an entangled pair and 2 classical bits.',
        checkpoint: 'Run the 3-qubit Teleportation circuit and confirm Qubit 2 receives Qubit 0 initial state.',
        quiz: {
          question: 'How many classical bits must be sent from Alice to Bob in Quantum Teleportation?',
          options: ['0 bits', '1 bit', '2 bits', '4 bits'],
          correct: 2,
          explanation: 'Alice measures her 2 qubits and sends 2 classical bits to Bob so he can apply X and Z correction gates.'
        },
        presetCircuit: [
          { id: '1', type: 'H', target: 1, step: 0 },
          { id: '2', type: 'CX', control: 1, target: 2, step: 1 },
          { id: '3', type: 'CX', control: 0, target: 1, step: 2 },
          { id: '4', type: 'H', target: 0, step: 3 }
        ]
      }
    ]
  },
  {
    id: 'track-3',
    title: 'Track 3: Master Quantum Algorithms',
    description: 'Explore Deutsch-Jozsa, Grover Search, Quantum Phase Estimation, and Shor Factoring.',
    lessons: [
      {
        id: 'l7',
        title: 'Lesson 7: Deutsch-Jozsa Algorithm',
        summary: 'Evaluate whether a black-box oracle function is constant or balanced in a single quantum evaluation.',
        checkpoint: 'Run the Deutsch-Jozsa circuit and observe 100% deterministic constructive interference.',
        quiz: {
          question: 'How many function evaluations does Deutsch-Jozsa require vs classical N evaluations?',
          options: ['N/2 evaluations', '1 evaluation', 'N² evaluations', '2 evaluations'],
          correct: 1,
          explanation: 'Quantum parallelism and interference allow Deutsch-Jozsa to determine global function property in 1 query.'
        },
        presetCircuit: [
          { id: '1', type: 'X', target: 1, step: 0 },
          { id: '2', type: 'H', target: 0, step: 1 },
          { id: '3', type: 'H', target: 1, step: 1 },
          { id: '4', type: 'CX', control: 0, target: 1, step: 2 },
          { id: '5', type: 'H', target: 0, step: 3 }
        ]
      },
      {
        id: 'l8',
        title: 'Lesson 8: Grover Search Algorithm',
        summary: 'Achieve quadratic speedup O(√N) for searching unsorted databases using amplitude amplification.',
        checkpoint: 'Execute Grover 2-Qubit search for target state |11⟩ and observe probability spike to 100%.',
        quiz: {
          question: 'What operation does the Grover Diffusion Operator perform on quantum amplitudes?',
          options: ['Random shuffle', 'Inversion about the mean', 'Fourier transform', 'State collapse'],
          correct: 1,
          explanation: 'Diffusion operator reflects all state amplitudes about their mean value, amplifying marked state amplitude.'
        },
        presetCircuit: [
          { id: '1', type: 'H', target: 0, step: 0 },
          { id: '2', type: 'H', target: 1, step: 0 },
          { id: '3', type: 'CZ', control: 0, target: 1, step: 1 },
          { id: '4', type: 'H', target: 0, step: 2 },
          { id: '5', type: 'H', target: 1, step: 2 },
          { id: '6', type: 'X', target: 0, step: 3 },
          { id: '7', type: 'X', target: 1, step: 3 },
          { id: '8', type: 'CZ', control: 0, target: 1, step: 4 },
          { id: '9', type: 'X', target: 0, step: 5 },
          { id: '10', type: 'X', target: 1, step: 5 },
          { id: '11', type: 'H', target: 0, step: 6 },
          { id: '12', type: 'H', target: 1, step: 6 }
        ]
      }
    ]
  },
  {
    id: 'track-4',
    title: 'Track 4: Quantum Error Correction & Hardware Noise',
    description: 'Explore depolarizing noise, bit-flip codes, phase-flip codes, and surface code architectures.',
    lessons: [
      {
        id: 'l9',
        title: 'Lesson 9: 3-Qubit Bit-Flip Correction Code',
        summary: 'Protect logical qubits against physical bit-flip errors (X noise) using majority voting parity checks.',
        checkpoint: 'Simulate a bit-flip error on Qubit 1 and verify error recovery gates restore the original state.',
        quiz: {
          question: 'Why cant we directly measure data qubits to detect quantum errors?',
          options: ['Measurement causes quantum state collapse', 'It destroys the quantum computer', 'Noise cannot be measured', 'Gates are too slow'],
          correct: 0,
          explanation: 'Direct measurement collapses quantum superposition. Error correction uses ancilla qubits for indirect parity checks.'
        },
        presetCircuit: [
          { id: '1', type: 'CX', control: 0, target: 1, step: 0 },
          { id: '2', type: 'CX', control: 0, target: 2, step: 0 }
        ]
      }
    ]
  }
];
