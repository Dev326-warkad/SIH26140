import React from 'react';
import { Atom, Github, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-panel border-t border-slate-800 py-8 px-4 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Atom className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          <div>
            <p className="font-orbitron font-bold text-slate-200">QUBOT PRIME | SIH26140</p>
            <p className="text-[11px] text-slate-400">AI-Based Interactive Quantum Algorithm Learning Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Cloud Account Needed • 100% Offline Simulation</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
