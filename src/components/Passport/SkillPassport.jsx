import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Download, Copy, Check, QrCode, Sparkles } from 'lucide-react';
import { generateSkillPassport } from '../../engine/verifiablePassport';

export default function SkillPassport({ completedLessons }) {
  const [studentName, setStudentName] = useState('Quantum Practitioner');
  const [passportData, setPassportData] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateSkillPassport(studentName, completedLessons, 94, {
      foundations: 95,
      superposition: 90,
      entanglement: 98,
      algorithms: 88,
      frameworks: 92,
      misconceptions: 94
    }).then(res => setPassportData(res));
  }, [studentName, completedLessons]);

  const handleCopyJSON = () => {
    if (passportData) {
      navigator.clipboard.writeText(JSON.stringify(passportData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-base text-cyan-300">Cryptographically Verifiable Quantum Skill Passport</h2>
            <p className="text-xs text-slate-400">JSON-LD W3C Standard Verifiable Credential with SHA-256 Merkle Proof</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied JSON-LD!' : 'Copy JSON-LD Credential'}</span>
          </button>
        </div>
      </div>

      {/* Student Name Input */}
      <div className="flex items-center gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <span className="text-xs text-slate-400 font-medium">Recipient Name:</span>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="bg-slate-950 text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Credential Card */}
      {passportData && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/40 border border-cyan-500/40 shadow-2xl relative overflow-hidden space-y-5">
          
          {/* Certificate Watermark Background */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-cyan-400">
            <Award className="w-64 h-64" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
            <div>
              <span className="text-[10px] font-orbitron uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                QUBOT Autonomous Quantum Institute
              </span>
              <h3 className="font-orbitron font-extrabold text-xl text-white">{passportData.credentialSubject.studentName}</h3>
              <p className="text-xs text-purple-300 mt-0.5">{passportData.credentialSubject.sihProblemStatement}</p>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>SHA-256 Verifiable</span>
            </div>
          </div>

          {/* Skill Radar Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {Object.entries(passportData.credentialSubject.quantumSkillsRadar).map(([skill, level]) => (
              <div key={skill} className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400 capitalize block truncate">{skill.replace(/([A-Z])/g, ' $1')}</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden mr-2">
                    <div style={{ width: `${level}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                  </div>
                  <span className="font-bold font-mono text-cyan-300">{level}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Merkle Proof Signatures */}
          <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] font-mono space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>Merkle Root Hash:</span>
              <span className="text-purple-300 font-bold">{passportData.proof.merkleRootHash}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Signature:</span>
              <span className="text-cyan-400 truncate max-w-[280px]">{passportData.proof.jwsSignature}</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
