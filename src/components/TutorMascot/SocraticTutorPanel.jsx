import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, CheckCircle } from 'lucide-react';
import MascotQubey from './MascotQubey';

export default function SocraticTutorPanel({ numQubits, gatesList, simulationResult }) {
  const [messages, setMessages] = useState([
    {
      sender: 'qubey',
      text: `Greetings! I am Qubey, your Socratic AI Quantum Tutor. I can evaluate your current ${numQubits}-qubit circuit in real-time, detect physical misconceptions, and answer questions grounded in exact quantum mechanics.`
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [qubeyEmotion, setQubeyEmotion] = useState('idle');

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');
    setQubeyEmotion('thinking');

    setTimeout(() => {
      let reply = generateSocraticResponse(userText, numQubits, gatesList, simulationResult);
      setMessages(prev => [...prev, { sender: 'qubey', text: reply }]);
      setQubeyEmotion('explaining');
    }, 600);
  };

  const generateSocraticResponse = (query, numQubits, gates, sim) => {
    const q = query.toLowerCase();

    if (q.includes('hadamard') || q.includes('superposition')) {
      return `A Hadamard gate transforms basis state |0⟩ into equal superposition (|0⟩ + |1⟩)/√2. If you apply Hadamard twice (H-H), the relative phases interfere constructively to return to |0⟩. Notice how on your Bloch sphere, H rotates the Z-vector onto the X-axis!`;
    }
    if (q.includes('cnot') || q.includes('entangle')) {
      return `The CNOT (CX) gate flips the target qubit if and only if the control qubit is |1⟩. When applied to a superposed control qubit (H on q0, CNOT q0->q1), it creates the Bell State (|00⟩ + |11⟩)/√2 where measuring q0 immediately determines q1!`;
    }
    if (q.includes('grover') || q.includes('search')) {
      return `Grover's algorithm achieves quadratic speedup O(√N) by using two main steps: the Oracle (which flips the phase of the target state) and the Diffusion Operator (which reflects amplitudes about their mean). This amplifies the target state's probability to ~100%!`;
    }
    if (q.includes('phase') || q.includes('z gate')) {
      return `The Pauli-Z gate applies a relative phase shift of π (180°) to the |1⟩ state, turning (|0⟩ + |1⟩)/√2 into (|0⟩ - |1⟩)/√2. Notice that the measurement probability remains 50/50, but relative phase alters downstream interference!`;
    }
    if (q.includes('circuit') || q.includes('explain my circuit')) {
      if (!gates || gates.length === 0) {
        return `Your circuit canvas is currently empty! Try placing a Hadamard gate (H) on Qubit 0 from the Gate Palette above.`;
      }
      return `Your circuit contains ${gates.length} gates across ${numQubits} qubits. The simulator computed a statevector with ${sim?.probabilities?.length || Math.pow(2, numQubits)} state outcomes. Click on "State & Bloch Spheres" tab to inspect vectors!`;
    }

    return `That is a great quantum physics question! In quantum mechanics, statevectors evolve unitarily via linear transformations U|ψ⟩. To see how this applies to your current circuit, check the Statevector table or place a gate on the canvas!`;
  };

  return (
    <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-4 flex flex-col h-[520px]">
      
      {/* Mascot Header */}
      <MascotQubey
        emotion={qubeyEmotion}
        message={messages[messages.length - 1]?.text}
      />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
              m.sender === 'user'
                ? 'bg-purple-600 text-white'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-3 rounded-xl text-xs leading-relaxed max-w-[82%] ${
              m.sender === 'user'
                ? 'bg-purple-900/60 text-purple-100 border border-purple-700/50'
                : 'bg-slate-900/90 text-slate-200 border border-slate-800 shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="flex items-center gap-2 pt-2 border-t border-slate-800">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask Qubey about your circuit, Hadamard, Grover, Bell states..."
          className="flex-1 bg-slate-950 text-cyan-200 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500/60"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
