/**
 * Cross-Framework Endianness Alignment Engine
 * Aligns bitstring indexing conventions between Qiskit (Little Endian q0=rightmost)
 * and Cirq / PennyLane / OpenQASM (Big Endian q0=leftmost).
 */

export function alignFrameworkBitstrings(probabilities, numQubits) {
  return probabilities.map(p => {
    return {
      index: p.index,
      qiskit: {
        bitstring: p.binaryLSB,
        convention: 'Little-Endian (q0 is Rightmost Bit)',
        prob: p.prob
      },
      cirq: {
        bitstring: p.binaryMSB,
        convention: 'Big-Endian (q0 is Leftmost Bit)',
        prob: p.prob
      },
      pennylane: {
        bitstring: p.binaryMSB,
        convention: 'Big-Endian (q0 is Leftmost Bit)',
        prob: p.prob
      },
      openqasm: {
        bitstring: p.binaryLSB,
        convention: 'Little-Endian Standard',
        prob: p.prob
      }
    };
  });
}
