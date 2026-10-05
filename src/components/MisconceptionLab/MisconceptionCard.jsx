import React, { useState } from 'react';
import { AlertTriangle, Play, HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { MISCONCEPTIONS, diagnoseMisconceptions } from '../../engine/misconceptionEngine';

export default function MisconceptionCard({ numQubits, setNumQubits, setGatesList, onSimulate }) {
  const [selectedMc, setSelectedMc] = useState(MISCONCEPTIONS[0]);
  const [userPrediction, setUserPrediction] = useState('0.5'); // Default 50%
  const [predictionFeedback, setPredictionFeedback] = useState(null);

  const loadTestCircuit = (mc) => {
    setSelectedMc(mc);
    if (mc.testCircuit && mc.testCircuit.length > 0) {
      setNumQubits(2);
      setGatesList(mc.testCircuit);
    }
    setPredictionFeedback(null);
  };

  const handleVerifyPrediction = () => {
    const isCorrect = selectedMc.id === 'MC-01' ? userPrediction === '1.0' : userPrediction === '0.5';
    setPredictionFeedback({
      isCorrect,
      explanation: isCorrect
        ? 'Excellent physics intuition! Constructive interference preserves classical basis certainty.'
        : `Misconception Detected (${selectedMc.id})! ${selectedMc.fix}`
    });
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-5">
      
      {/* Lab Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-base text-amber-300">Quantum Misconception Diagnostic Laboratory</h2>
            <p className="text-xs text-slate-400">Identify and resolve MC-01 through MC-10 fundamental quantum fallacies</p>
          </div>
        </div>
      </div>

      {/* Grid of 10 Misconceptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {MISCONCEPTIONS.map((mc) => {
          const isSelected = selectedMc.id === mc.id;
          return (
            <button
              key={mc.id}
              onClick={() => loadTestCircuit(mc)}
              className={`p-3 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 shadow-lg shadow-amber-500/10 ring-1 ring-amber-400'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-xs text-amber-400">{mc.id}</span>
                <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">{mc.category}</span>
              </div>
              <p className="text-xs font-bold text-slate-200 line-clamp-1">{mc.name}</p>
            </button>
          );
        })}
      </div>

      {/* Active Diagnostic Detail & Predict-Simulate Playground */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-orbitron font-extrabold text-sm text-amber-300">{selectedMc.id}: {selectedMc.name}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {selectedMc.category}
            </span>
          </div>

          <button
            onClick={() => loadTestCircuit(selectedMc)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition-colors"
          >
            <span>Load Diagnostic Circuit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block">Symptom / Fallacy:</span>
            <p className="text-slate-300">{selectedMc.symptom}</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">Physics Correction:</span>
            <p className="text-slate-300">{selectedMc.fix}</p>
          </div>
        </div>

        {/* Predict -> Simulate -> Explain Interactive Verification Widget */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <h4 className="font-bold text-xs text-cyan-300 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Predict-Simulate-Explain Challenge:</span>
          </h4>
          <p className="text-xs text-slate-400">
            For circuit <span className="font-mono text-amber-300">H-H on |0⟩</span>, what is the predicted probability of measuring outcome <span className="font-mono text-cyan-300">|0⟩</span>?
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: '50% (|0⟩) / 50% (|1⟩)', val: '0.5' },
              { label: '100% |0⟩ (Deterministic Interference)', val: '1.0' },
              { label: '0% (Always flips to |1⟩)', val: '0.0' }
            ].map(opt => (
              <label key={opt.val} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700">
                <input
                  type="radio"
                  name="prediction"
                  value={opt.val}
                  checked={userPrediction === opt.val}
                  onChange={(e) => setUserPrediction(e.target.value)}
                  className="accent-amber-400"
                />
                <span>{opt.label}</span>
              </label>
            ))}

            <button
              onClick={handleVerifyPrediction}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              Verify Prediction
            </button>
          </div>

          {predictionFeedback && (
            <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
              predictionFeedback.isCorrect
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
            }`}>
              {predictionFeedback.isCorrect ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
              <span>{predictionFeedback.explanation}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
