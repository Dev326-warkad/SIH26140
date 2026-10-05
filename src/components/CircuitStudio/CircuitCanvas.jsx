import React from 'react';
import { Play, Sparkles, Plus, Zap, RefreshCw } from 'lucide-react';

export default function CircuitCanvas({
  numQubits,
  gatesList,
  setGatesList,
  selectedGateType,
  rotationAngle,
  onSimulate
}) {
  const maxSteps = 10;
  const stepsArray = Array.from({ length: maxSteps }, (_, i) => i);
  const qubitsArray = Array.from({ length: numQubits }, (_, i) => i);

  const handleCellClick = (q, step) => {
    const existing = gatesList.find(g => (g.target === q || g.control === q) && g.step === step);
    if (existing) {
      setGatesList(gatesList.filter(g => g.id !== existing.id));
      return;
    }

    if (!selectedGateType) return;

    const newGate = {
      id: `gate_${Date.now()}_${Math.random()}`,
      type: selectedGateType,
      target: q,
      step: step,
      angle: rotationAngle
    };

    if (['CX', 'CNOT', 'CZ', 'SWAP'].includes(selectedGateType)) {
      const ctrl = q === 0 ? 1 : 0;
      newGate.control = ctrl;
      newGate.target = q;
    } else if (selectedGateType === 'CCX') {
      newGate.control = 0;
      newGate.control2 = 1;
      newGate.target = q >= 2 ? q : 2;
    }

    setGatesList([...gatesList, newGate]);
  };

  const removeGate = (id, e) => {
    e.stopPropagation();
    setGatesList(gatesList.filter(g => g.id !== id));
  };

  return (
    <div className="holo-card p-6 border border-cyan-500/25 space-y-4 relative overflow-hidden">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="font-orbitron font-extrabold text-base text-cyan-300 flex items-center gap-2 text-holo-cyan">
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>Holographic Quantum Circuit Grid</span>
          </h2>
          <p className="text-xs text-slate-400">Pulsing Laser Wire Quantum Circuit Synthesizer</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSimulate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-slate-950 font-orbitron font-extrabold text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Simulate Quantum Physics</span>
          </button>
        </div>
      </div>

      {/* Grid Canvas Wire System */}
      <div className="overflow-x-auto py-3">
        <div className="min-w-[720px] space-y-7 relative">

          {/* Step Headers */}
          <div className="grid grid-cols-11 gap-2 text-center font-mono text-[11px] text-slate-400 font-bold border-b border-slate-800/80 pb-2">
            <div className="text-left font-orbitron text-cyan-400 px-2 flex items-center gap-1">
              <span>Qubits</span>
            </div>
            {stepsArray.map(s => (
              <div key={s} className="bg-slate-950/60 py-1 rounded-lg border border-slate-800 text-slate-300">
                Step {s + 1}
              </div>
            ))}
          </div>

          {/* Qubit Wires */}
          {qubitsArray.map((q) => (
            <div key={q} className="grid grid-cols-11 gap-2 items-center relative group">
              
              {/* Qubit Label Badge */}
              <div className="flex items-center gap-2 px-2">
                <span className="font-mono text-xs font-black text-cyan-300 bg-gradient-to-r from-cyan-950 to-purple-950 px-2.5 py-1.5 rounded-xl border border-cyan-400/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  |q{q}⟩
                </span>
                <span className="text-[10px] text-slate-500 font-mono">|0⟩</span>
              </div>

              {/* Step Cells on this Wire */}
              {stepsArray.map((step) => {
                const gateOnCell = gatesList.find(g => g.target === q && g.step === step);
                const isControlOnCell = gatesList.find(g => (g.control === q || g.control2 === q) && g.step === step);

                return (
                  <div
                    key={step}
                    onClick={() => handleCellClick(q, step)}
                    className="relative h-14 flex items-center justify-center cursor-pointer group/cell"
                  >
                    {/* Laser Wire Beam with Pulses */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 laser-wire laser-beam-pulse opacity-80 group-hover/cell:opacity-100" />

                    {/* Gate rendered on Target Cell */}
                    {gateOnCell && (
                      <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-purple-600 text-slate-950 font-orbitron font-black text-xs flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] border border-white/50 group/gate transition-all transform hover:scale-110">
                        <span>{gateOnCell.type}</span>
                        <button
                          onClick={(e) => removeGate(gateOnCell.id, e)}
                          title="Remove Gate"
                          className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center opacity-0 group-hover/gate:opacity-100 transition-opacity shadow-lg"
                        >
                          ✕
                        </button>
                      </div>
                    )}

                    {/* Control Dot rendered on Control Cell */}
                    {isControlOnCell && !gateOnCell && (
                      <div className="relative z-10 w-5 h-5 rounded-full bg-cyan-300 border-2 border-slate-950 shadow-[0_0_12px_#00f0ff] flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                      </div>
                    )}

                    {/* Plus icon hover indicator when cell is empty */}
                    {!gateOnCell && !isControlOnCell && (
                      <div className="relative z-10 w-7 h-7 rounded-lg border border-dashed border-slate-700 group-hover/cell:border-cyan-400 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-all bg-slate-950/90 shadow-md">
                        <Plus className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          ))}

          {/* Control Connection Vertical Laser Beam Lines */}
          {gatesList.map((g) => {
            if (g.control !== undefined && g.target !== undefined) {
              const minQ = Math.min(g.control, g.target);
              const maxQ = Math.max(g.control, g.target);
              const rowHeight = 84; // height + gap approx
              const topOffset = minQ * rowHeight + 54;
              const height = (maxQ - minQ) * rowHeight;
              const colIndex = g.step + 1;

              return (
                <div
                  key={`ctrl_wire_${g.id}`}
                  style={{
                    gridColumnStart: colIndex + 1,
                    top: `${topOffset}px`,
                    height: `${height}px`
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.9)] pointer-events-none z-0"
                />
              );
            }
            return null;
          })}

        </div>
      </div>
    </div>
  );
}
