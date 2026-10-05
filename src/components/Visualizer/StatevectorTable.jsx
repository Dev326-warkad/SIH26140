import React from 'react';
import { Layers } from 'lucide-react';

export default function StatevectorTable({ probabilities, entanglementInfo }) {
  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          <h3 className="font-orbitron font-bold text-sm text-purple-300">Full Quantum Statevector Amplitudes</h3>
        </div>

        {entanglementInfo && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
            entanglementInfo.isEntangled
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-md shadow-purple-500/10'
              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
          }`}>
            {entanglementInfo.label}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-sans">
              <th className="py-2 px-3">Basis State</th>
              <th className="py-2 px-3">Complex Amplitude α + iβ</th>
              <th className="py-2 px-3">Magnitude |α|</th>
              <th className="py-2 px-3">Probability |α|²</th>
              <th className="py-2 px-3">Phase φ (rad / deg)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {probabilities.map((p) => {
              const deg = (p.phase * 180 / Math.PI).toFixed(1);
              return (
                <tr key={p.binaryLSB} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-cyan-300">|{p.binaryLSB}⟩</td>
                  <td className="py-2.5 px-3 text-slate-200">{p.amplitude.format(4)}</td>
                  <td className="py-2.5 px-3 text-slate-300">{p.amplitude.abs().toFixed(4)}</td>
                  <td className="py-2.5 px-3 font-bold text-purple-300">{(p.prob * 100).toFixed(2)}%</td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {p.phase.toFixed(3)} rad ({deg}°)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
