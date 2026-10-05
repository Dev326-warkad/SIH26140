import React from 'react';
import { ArrowLeftRight, HelpCircle } from 'lucide-react';
import { alignFrameworkBitstrings } from '../../engine/endianVerifier';

export default function EndianMatrixView({ probabilities, numQubits }) {
  const alignedData = alignFrameworkBitstrings(probabilities, numQubits);

  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-orbitron font-bold text-sm text-cyan-300">Cross-Framework Endianness Comparator</h3>
            <p className="text-xs text-slate-400">Eliminate qubit indexing confusion between IBM Qiskit, Cirq, PennyLane & OpenQASM</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-sans">
              <th className="py-2.5 px-3 bg-cyan-950/30 text-cyan-300">IBM Qiskit (Little-Endian)</th>
              <th className="py-2.5 px-3 bg-purple-950/30 text-purple-300">Google Cirq (Big-Endian)</th>
              <th className="py-2.5 px-3 bg-emerald-950/30 text-emerald-300">Xanadu PennyLane (Big-Endian)</th>
              <th className="py-2.5 px-3 bg-blue-950/30 text-blue-300">Probability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {alignedData.map((row) => (
              <tr key={row.index} className="hover:bg-slate-900/50 transition-colors">
                <td className="py-2.5 px-3 font-bold text-cyan-300">|{row.qiskit.bitstring}⟩ (q0 rightmost)</td>
                <td className="py-2.5 px-3 font-bold text-purple-300">|{row.cirq.bitstring}⟩ (q0 leftmost)</td>
                <td className="py-2.5 px-3 font-bold text-emerald-300">|{row.pennylane.bitstring}⟩ (q0 leftmost)</td>
                <td className="py-2.5 px-3 font-bold text-slate-200">{(row.qiskit.prob * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
        <p className="font-bold text-slate-300 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          Why is this essential for learners?
        </p>
        <p>
          In Qiskit, qubit 0 represents the rightmost least significant bit (LSB). In Cirq and PennyLane, qubit 0 represents the leftmost most significant bit (MSB).
          This matrix automatically aligns all frameworks so your physics results remain perfectly consistent across libraries!
        </p>
      </div>
    </div>
  );
}
