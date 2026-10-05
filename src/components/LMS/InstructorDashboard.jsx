import React, { useState } from 'react';
import { Users, Plus, Download, Share2, Award, CheckCircle2 } from 'lucide-react';

export default function InstructorDashboard() {
  const [classCode, setClassCode] = useState('SIH26140-QUANTUM-2026');
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', completed: 11, score: 96, status: 'Mastered' },
    { id: 2, name: 'Priya Patel', completed: 9, score: 88, status: 'Advanced' },
    { id: 3, name: 'Rohan Gupta', completed: 12, score: 98, status: 'Mastered' },
    { id: 4, name: 'Ananya Singh', completed: 7, score: 79, status: 'Intermediate' },
    { id: 5, name: 'Vikram Joshi', completed: 10, score: 91, status: 'Advanced' },
  ]);

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Completed Modules,Score,Status\n"
      + students.map(e => `${e.name},${e.completed},${e.score},${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "qubot_classroom_cohort_metrics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-base text-cyan-300">Instructor & Classroom Cohort Portal</h2>
            <p className="text-xs text-slate-400">Monitor student progress, assign live quantum circuit rooms & export SCORM/CSV metrics</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-slate-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Classroom Code Card */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="text-xs text-slate-400 block font-medium">Active Classroom Joining Code:</span>
          <span className="font-mono font-bold text-lg text-cyan-400 tracking-wider">{classCode}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setClassCode(`SIH26140-Q-${Math.floor(1000 + Math.random() * 9000)}`)}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
          >
            Generate New Code
          </button>
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-sans">
              <th className="py-3 px-3">Student Name</th>
              <th className="py-3 px-3">Completed Modules</th>
              <th className="py-3 px-3">Competency Score</th>
              <th className="py-3 px-3">Status Badge</th>
              <th className="py-3 px-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-200">{s.name}</td>
                <td className="py-3 px-3 text-cyan-300">{s.completed} / 12</td>
                <td className="py-3 px-3 font-bold text-purple-300">{s.score}%</td>
                <td className="py-3 px-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px]">
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <button className="text-[11px] font-bold text-purple-400 hover:text-purple-300 underline">
                    View Passport
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
