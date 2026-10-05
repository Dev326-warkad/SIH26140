import React from 'react';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { PRESET_CIRCUITS } from '../../data/presetCircuits';

export default function AlgorithmPresets({ setNumQubits, setGatesList }) {
  const loadPreset = (preset) => {
    setNumQubits(preset.numQubits);
    setGatesList(preset.gates);
  };

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800 space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <Sparkles className="w-4 h-4 text-purple-400" />
        <h3 className="font-orbitron font-bold text-sm text-purple-300">Pre-Built Algorithm Presets</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {PRESET_CIRCUITS.map((p) => (
          <div
            key={p.id}
            onClick={() => loadPreset(p)}
            className="p-3 rounded-lg bg-slate-900/80 hover:bg-purple-950/30 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-slate-200 group-hover:text-purple-300 transition-colors">
                {p.name}
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {p.numQubits} Qubit{p.numQubits > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight mb-2 line-clamp-2">{p.description}</p>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Load Algorithm</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
