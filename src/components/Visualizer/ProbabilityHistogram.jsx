import React, { useState } from 'react';
import { BarChart3, RefreshCw, Dices } from 'lucide-react';
import { sampleShots } from '../../engine/quantumSimulator';

export default function ProbabilityHistogram({ probabilities }) {
  const [shotsCount, setShotsCount] = useState(1024);
  const [sampledCounts, setSampledCounts] = useState(() => sampleShots(probabilities, 1024));

  const handleResample = () => {
    setSampledCounts(sampleShots(probabilities, shotsCount));
  };

  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-orbitron font-bold text-sm text-cyan-300">Measurement Outcome Distribution</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-xs">
            <Dices className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">Shots:</span>
            <select
              value={shotsCount}
              onChange={(e) => {
                const count = Number(e.target.value);
                setShotsCount(count);
                setSampledCounts(sampleShots(probabilities, count));
              }}
              className="bg-slate-800 text-cyan-300 font-bold px-2 py-0.5 rounded border border-slate-700"
            >
              {[256, 512, 1024, 4096, 8192].map(n => (
                <option key={n} value={n}>{n} shots</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleResample}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition-colors"
            title="Resample Shots"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bar Chart Grid */}
      <div className="space-y-3 pt-2">
        {probabilities.map((p) => {
          const theoreticalPct = p.prob * 100;
          const shotVal = sampledCounts[p.binaryLSB] || 0;
          const shotPct = (shotVal / shotsCount) * 100;

          return (
            <div key={p.binaryLSB} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-2">
                  <span>|{p.binaryLSB}⟩</span>
                  <span className="text-[10px] text-slate-500 font-sans font-normal">(Qiskit order)</span>
                </span>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-cyan-400">Theoretical: {theoreticalPct.toFixed(1)}%</span>
                  <span className="text-purple-300">Shots ({shotVal}): {shotPct.toFixed(1)}%</span>
                </div>
              </div>

              {/* Progress bar stack */}
              <div className="h-4 w-full bg-slate-900 rounded-md overflow-hidden relative border border-slate-800 flex items-center">
                {/* Theoretical bar */}
                <div
                  style={{ width: `${theoreticalPct}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 opacity-80"
                />
                {/* Shot marker overlay */}
                <div
                  style={{ left: `${shotPct}%` }}
                  className="absolute top-0 bottom-0 w-1 bg-purple-400 shadow-[0_0_8px_#c084fc] transition-all duration-300"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
