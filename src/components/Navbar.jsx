import React from 'react';
import { Atom, Cpu, BookOpen, AlertTriangle, Award, Users, RefreshCw, Activity, Layers, Zap } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  numQubits,
  setNumQubits,
  resetCircuit,
  gatesCount,
  simulationResult
}) {
  const hilbertDim = Math.pow(2, numQubits);
  const isEntangled = simulationResult?.entanglementInfo?.isEntangled;

  const tabs = [
    { id: 'studio', label: 'Circuit Studio', icon: Cpu, badge: `${gatesCount} Gates` },
    { id: 'visualizer', label: 'State & Bloch Spheres', icon: Atom, badge: '3D Telemetry' },
    { id: 'misconceptions', label: 'Misconception Lab', icon: AlertTriangle, badge: 'MC-01..10' },
    { id: 'lms', label: 'Curriculum & Tracks', icon: BookOpen, badge: '12 Lessons' },
    { id: 'passport', label: 'Verifiable Skill Passport', icon: Award, badge: 'SHA-256' },
    { id: 'instructor', label: 'Classroom Command Hub', icon: Users, badge: 'LMS Live' },
  ];

  return (
    <header className="sticky top-0 z-50 holo-card rounded-none border-x-0 border-t-0 border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Quantum Telemetry Header */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/30 animate-mascot-pulse">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Atom className="w-6 h-6 text-cyan-300 animate-spin" style={{ animationDuration: '10s' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-orbitron font-black text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400 text-holo-cyan">
                QUBOT PRIME
              </span>
              <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                SIH26140 HOLOGRAPHIC
              </span>
            </div>

            {/* Live Quantum Telemetry Banner */}
            <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-cyan-300">
                <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>Dim: 2^{numQubits} = {hilbertDim} States</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className={isEntangled ? 'text-purple-300 font-bold text-holo-purple' : 'text-emerald-400'}>
                {isEntangled ? '⚡ Entangled' : 'Separable'}
              </span>
            </div>
          </div>
        </div>

        {/* Cyber Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold font-orbitron transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/10 border border-cyan-400/60 text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-105'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-900 text-slate-500'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Quantum Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-inner">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-slate-300">Qubits:</span>
            <select
              value={numQubits}
              onChange={(e) => setNumQubits(Number(e.target.value))}
              className="bg-slate-950 text-cyan-300 text-xs font-bold px-2 py-0.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-400 font-mono"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n} Qubit{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <button
            onClick={resetCircuit}
            title="Reset Quantum Canvas"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-800 hover:border-rose-500/50 text-xs font-bold transition-all shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>
    </header>
  );
}
