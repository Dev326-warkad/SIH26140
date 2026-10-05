import React from 'react';
import { Sparkles, MessageSquare, Brain, Smile, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export default function MascotQubey({ emotion = 'idle', message, onClick }) {
  const emotionConfig = {
    idle: {
      color: 'from-cyan-400 via-sky-500 to-purple-600',
      shadow: 'shadow-[0_0_25px_rgba(0,240,255,0.5)]',
      badge: '3D Quantum Companion',
      icon: Smile
    },
    thinking: {
      color: 'from-purple-500 via-pink-500 to-indigo-600',
      shadow: 'shadow-[0_0_25px_rgba(176,38,255,0.6)]',
      badge: 'Computing Math...',
      icon: Brain
    },
    explaining: {
      color: 'from-sky-400 via-teal-400 to-emerald-500',
      shadow: 'shadow-[0_0_25px_rgba(0,255,157,0.5)]',
      badge: 'Socratic Tutor',
      icon: MessageSquare
    },
    celebrate: {
      color: 'from-emerald-400 via-teal-300 to-cyan-500',
      shadow: 'shadow-[0_0_30px_rgba(0,255,157,0.7)]',
      badge: 'Correct Physics!',
      icon: CheckCircle2
    },
    error: {
      color: 'from-rose-500 via-pink-600 to-amber-500',
      shadow: 'shadow-[0_0_30px_rgba(255,0,127,0.7)]',
      badge: 'Misconception Alert',
      icon: AlertCircle
    }
  };

  const curr = emotionConfig[emotion] || emotionConfig.idle;
  const EmotionIcon = curr.icon;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3.5 p-3.5 rounded-2xl holo-card border border-cyan-400/40 hover:border-cyan-300/70 cursor-pointer transition-all animate-mascot-pulse group shadow-xl"
    >
      {/* 3D Holographic Particle Orb */}
      <div className={`relative w-14 h-14 rounded-full bg-gradient-to-tr ${curr.color} p-0.5 ${curr.shadow} flex items-center justify-center shrink-0`}>
        
        {/* Orbiting Particle Ring 1 */}
        <div className="absolute inset-0 border-2 border-cyan-300/40 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
        {/* Orbiting Particle Ring 2 */}
        <div className="absolute inset-1 border border-purple-400/50 rounded-full animate-spin" style={{ animationDuration: '7s', animationDirection: 'reverse' }} />

        {/* Orbiting Particle Dot */}
        <div className="absolute w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-mascot-orbit" />

        {/* Core Inner Sphere */}
        <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Eyes */}
          <div className="flex items-center gap-2.5 z-10 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] animate-pulse" />
          </div>

          {/* Smile/Pulse Line */}
          <div className="w-4 h-0.5 bg-cyan-400 rounded-full z-10 shadow-[0_0_5px_#00f0ff]" />

        </div>
      </div>

      {/* Mascot Text Preview */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-orbitron font-extrabold text-xs text-cyan-300 text-holo-cyan">Qubey 3D</span>
          <span className="text-[9px] font-orbitron font-bold px-2 py-0.5 rounded-md bg-slate-950 text-purple-300 border border-purple-500/40 flex items-center gap-1">
            <EmotionIcon className="w-3 h-3 text-cyan-400" />
            <span>{curr.badge}</span>
          </span>
        </div>
        <p className="text-xs text-slate-200 truncate font-medium">
          {message || 'Ask me about quantum superposition, entanglement, or algorithms!'}
        </p>
      </div>
    </div>
  );
}
