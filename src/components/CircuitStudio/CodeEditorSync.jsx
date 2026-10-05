import React, { useState, useEffect } from 'react';
import { Code, Copy, Check, Terminal, FileCode2 } from 'lucide-react';
import { generateQiskitCode, generateOpenQASMCode, generateCirqCode, generatePennyLaneCode, parseQiskitOrQASM } from '../../engine/codeTranslators';

export default function CodeEditorSync({ numQubits, gatesList, setGatesList }) {
  const [activeFramework, setActiveFramework] = useState('qiskit');
  const [copied, setCopied] = useState(false);
  const [editableCode, setEditableCode] = useState('');

  useEffect(() => {
    let generated = '';
    if (activeFramework === 'qiskit') generated = generateQiskitCode(numQubits, gatesList);
    else if (activeFramework === 'openqasm') generated = generateOpenQASMCode(numQubits, gatesList);
    else if (activeFramework === 'cirq') generated = generateCirqCode(numQubits, gatesList);
    else if (activeFramework === 'pennylane') generated = generatePennyLaneCode(numQubits, gatesList);

    setEditableCode(generated);
  }, [numQubits, gatesList, activeFramework]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeBlur = () => {
    try {
      const parsedGates = parseQiskitOrQASM(editableCode, numQubits);
      if (parsedGates && parsedGates.length > 0) {
        setGatesList(parsedGates);
      }
    } catch (e) {
      console.warn("Parse error:", e);
    }
  };

  const frameworks = [
    { id: 'qiskit', label: 'Qiskit (IBM)', badge: 'Python' },
    { id: 'openqasm', label: 'OpenQASM 3.0', badge: 'QASM Standard' },
    { id: 'cirq', label: 'Cirq (Google)', badge: 'Python' },
    { id: 'pennylane', label: 'PennyLane (Xanadu)', badge: 'Python QML' },
  ];

  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-3">
      
      {/* Code Header & Framework Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="font-orbitron font-bold text-sm text-cyan-300">Bi-Directional Code Synchronizer</h3>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {frameworks.map(fw => (
            <button
              key={fw.id}
              onClick={() => setActiveFramework(fw.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFramework === fw.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{fw.label}</span>
              <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-400 font-mono">{fw.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Area */}
      <div className="relative group">
        <textarea
          value={editableCode}
          onChange={(e) => setEditableCode(e.target.value)}
          onBlur={handleCodeBlur}
          rows={10}
          className="w-full bg-slate-950/90 text-cyan-200 font-mono-code text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/60 selection:bg-cyan-500/30 leading-relaxed shadow-inner"
        />

        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all shadow-md"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>
      <p className="text-[11px] text-slate-500">Edit Python/QASM code above and click outside to sync changes directly into the visual circuit canvas.</p>
    </div>
  );
}
