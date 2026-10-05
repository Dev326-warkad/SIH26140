import React, { useRef, useEffect, useState } from 'react';
import { Atom, Move, RefreshCw } from 'lucide-react';

export default function BlochSphereCanvas({ blochData }) {
  const canvasRef = useRef(null);

  // Interactive 3D Rotation State (Drag to rotate sphere)
  const [rotX, setRotX] = useState(0.3); // Radians
  const [rotY, setRotY] = useState(0.4);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotY(r => r + dx * 0.01);
    setRotX(r => Math.max(-1.2, Math.min(1.2, r + dy * 0.01)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const R = width * 0.38;

    ctx.clearRect(0, 0, width, height);

    // 3D Matrix Projection Helper
    const project3D = (x, y, z) => {
      // Rotate around Y-axis (rotY)
      const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
      const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
      // Rotate around X-axis (rotX)
      const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

      return {
        px: cx + x1 * R,
        py: cy - y2 * R,
        pz: z2
      };
    };

    // Draw Outer Holographic Sphere Ring
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Equatorial Ring
    ctx.beginPath();
    for (let i = 0; i <= 360; i += 5) {
      const rad = (i * Math.PI) / 180;
      const pt = project3D(Math.cos(rad), Math.sin(rad), 0);
      if (i === 0) ctx.moveTo(pt.px, pt.py);
      else ctx.lineTo(pt.px, pt.py);
    }
    ctx.strokeStyle = 'rgba(176, 38, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Axes lines (+Z top, -Z bottom, +X, +Y)
    const pZtop = project3D(0, 0, 1);
    const pZbot = project3D(0, 0, -1);
    const pXtop = project3D(1, 0, 0);
    const pYtop = project3D(0, 1, 0);

    // Z-axis line
    ctx.beginPath();
    ctx.moveTo(pZbot.px, pZbot.py);
    ctx.lineTo(pZtop.px, pZtop.py);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // X & Y axes
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(pXtop.px, pXtop.py);
    ctx.strokeStyle = 'rgba(255, 183, 0, 0.3)';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(pYtop.px, pYtop.py);
    ctx.strokeStyle = 'rgba(255, 0, 127, 0.3)';
    ctx.stroke();

    // Labels
    ctx.font = 'bold 10px Orbitron, sans-serif';
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('|0⟩ (+Z)', pZtop.px - 16, pZtop.px < cx ? pZtop.py - 6 : pZtop.py - 6);
    ctx.fillStyle = '#b026ff';
    ctx.fillText('|1⟩ (-Z)', pZbot.px - 16, pZbot.py + 14);

    // Compute State Vector Endpoint
    const bx = blochData.x;
    const by = blochData.y;
    const bz = blochData.z;
    const pState = project3D(bx, by, bz);

    // Draw Vector Arrow Line
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(pState.px, pState.py);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Vector Tip Glowing Sphere
    ctx.beginPath();
    ctx.arc(pState.px, pState.py, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#00f0ff';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [blochData, rotX, rotY]);

  return (
    <div className="holo-card p-4 border border-cyan-500/30 flex flex-col items-center select-none group">
      
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <span className="font-orbitron font-extrabold text-xs text-cyan-300 flex items-center gap-1.5 text-holo-cyan">
          <Atom className="w-4 h-4 text-cyan-400" />
          <span>Qubit |q{blochData.qubit}⟩</span>
        </span>
        <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-700/50">
          |r| = {blochData.r.toFixed(2)}
        </span>
      </div>

      {/* 3D Canvas with Drag Indicator */}
      <div
        className="relative cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas ref={canvasRef} width={230} height={230} className="my-1" />
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 px-2 py-1 rounded text-[9px] font-mono text-cyan-300 flex items-center gap-1 border border-cyan-500/30 pointer-events-none">
          <Move className="w-3 h-3 text-cyan-400" />
          <span>Drag 3D</span>
        </div>
      </div>

      {/* Probability Badges */}
      <div className="w-full grid grid-cols-2 gap-2 text-[11px] font-mono mt-2 pt-2.5 border-t border-slate-800/80">
        <div className="bg-slate-950/80 p-2 rounded-lg border border-cyan-500/20">
          <span className="text-slate-400 block text-[9px]">P(|0⟩):</span>
          <span className="text-cyan-300 font-bold font-orbitron">{(blochData.state0Prob * 100).toFixed(1)}%</span>
        </div>
        <div className="bg-slate-950/80 p-2 rounded-lg border border-purple-500/20">
          <span className="text-slate-400 block text-[9px]">P(|1⟩):</span>
          <span className="text-purple-300 font-bold font-orbitron">{(blochData.state1Prob * 100).toFixed(1)}%</span>
        </div>
        <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 col-span-2 flex justify-between text-[10px]">
          <span className="text-slate-300">θ: {blochData.theta.toFixed(2)} rad</span>
          <span className="text-slate-300">φ: {blochData.phi.toFixed(2)} rad</span>
        </div>
      </div>
    </div>
  );
}
