import React from 'react';
import { HelpCircle, Sliders } from 'lucide-react';

export default function GatePalette({ selectedGateType, setSelectedGateType, rotationAngle, setRotationAngle }) {
  const gateCategories = [
    {
      category: 'Single Qubit Gates',
      gates: [
        { type: 'H', label: 'H', name: 'Hadamard', color: 'from-cyan-500 to-blue-600', desc: 'Creates equal superposition (|0⟩ + |1⟩)/√2' },
        { type: 'X', label: 'X', name: 'Pauli-X (NOT)', color: 'from-emerald-500 to-teal-600', desc: 'Flips qubit state (|0⟩ ↔ |1⟩)' },
        { type: 'Y', label: 'Y', name: 'Pauli-Y', color: 'from-teal-500 to-emerald-700', desc: 'Bit and phase flip' },
        { type: 'Z', label: 'Z', name: 'Pauli-Z', color: 'from-purple-500 to-indigo-600', desc: 'Applies π relative phase flip' },
        { type: 'S', label: 'S', name: 'Phase (S)', color: 'from-indigo-500 to-purple-600', desc: 'Applies π/2 (90°) phase shift' },
        { type: 'T', label: 'T', name: 'π/8 (T)', color: 'from-violet-500 to-fuchsia-600', desc: 'Applies π/4 (45°) phase shift' },
      ]
    },
    {
      category: 'Parametric Rotations',
      gates: [
        { type: 'RX', label: 'Rx', name: 'Rx(θ)', color: 'from-pink-500 to-rose-600', desc: 'Rotation around X-axis by angle θ' },
        { type: 'RY', label: 'Ry', name: 'Ry(θ)', color: 'from-rose-500 to-amber-600', desc: 'Rotation around Y-axis by angle θ' },
        { type: 'RZ', label: 'Rz', name: 'Rz(θ)', color: 'from-amber-500 to-yellow-600', desc: 'Rotation around Z-axis by angle θ' },
      ]
    },
    {
      category: 'Multi-Qubit & Control Gates',
      gates: [
        { type: 'CX', label: 'CX', name: 'CNOT (CX)', color: 'from-blue-600 to-indigo-700', desc: 'Flips target qubit if control qubit is 1' },
        { type: 'CZ', label: 'CZ', name: 'Controlled-Z', color: 'from-purple-600 to-blue-700', desc: 'Applies Z gate if control qubit is 1' },
        { type: 'SWAP', label: 'SW', name: 'SWAP', color: 'from-fuchsia-600 to-purple-700', desc: 'Swaps state between two qubits' },
        { type: 'CCX', label: 'CCX', name: 'Toffoli (CCX)', color: 'from-amber-600 to-orange-700', desc: 'Flips target if both control 1 and 2 are 1' },
      ]
    },
    {
      category: 'Measurement & Reset',
      gates: [
        { type: 'M', label: 'M', name: 'Measure', color: 'from-rose-600 to-red-700', desc: 'Collapses quantum state into classical bit' }
      ]
    }
  ];

  return (
    <div className="glass-panel rounded-xl p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <h3 className="font-orbitron font-bold text-sm text-cyan-400 flex items-center gap-2">
          <span>Gate Palette</span>
          <span className="text-[10px] font-normal text-slate-400 font-sans">(Click to Select Gate)</span>
        </h3>
        {['RX', 'RY', 'RZ'].includes(selectedGateType) && (
          <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded border border-slate-700 text-xs">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">θ:</span>
            <input
              type="range"
              min="0"
              max="6.28"
              step="0.1"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="w-20 accent-amber-400"
            />
            <span className="text-amber-300 font-mono text-[10px]">{rotationAngle.toFixed(2)} rad</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {gateCategories.map((cat, idx) => (
          <div key={idx}>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{cat.category}</p>
            <div className="flex flex-wrap gap-2">
              {cat.gates.map((g) => {
                const isSelected = selectedGateType === g.type;
                return (
                  <button
                    key={g.type}
                    onClick={() => setSelectedGateType(g.type)}
                    title={`${g.name}: ${g.desc}`}
                    className={`relative group px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `bg-gradient-to-r ${g.color} text-white shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400 scale-105`
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-950/40 text-[11px]">
                      {g.label}
                    </span>
                    <span>{g.type}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
