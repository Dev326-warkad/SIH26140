import React, { useState } from 'react';
import { BookOpen, CheckCircle, ArrowRight, Award, Lock, Sparkles } from 'lucide-react';
import { CURRICULUM_TRACKS } from '../../data/lessonsData';

export default function CurriculumTracks({ setNumQubits, setGatesList, completedLessons, setCompletedLessons }) {
  const [activeLesson, setActiveLesson] = useState(CURRICULUM_TRACKS[0].lessons[0]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const loadLessonCircuit = (lesson) => {
    setActiveLesson(lesson);
    if (lesson.presetCircuit) {
      setNumQubits(2);
      setGatesList(lesson.presetCircuit);
    }
    setQuizAnswer(null);
    setQuizResult(null);
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === null) return;
    const isCorrect = quizAnswer === activeLesson.quiz.correct;
    setQuizResult({
      isCorrect,
      message: isCorrect
        ? 'Correct! You passed this checkpoint.'
        : 'Incorrect. Review the lesson explanation and try again.'
    });

    if (isCorrect && !completedLessons.includes(activeLesson.id)) {
      setCompletedLessons([...completedLessons, activeLesson.id]);
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-orbitron font-bold text-base text-purple-300">12-Chapter Quantum Computing Curriculum Matrix</h2>
            <p className="text-xs text-slate-400">Interactive track-based learning with real-time circuit checkpoints</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300 font-bold">Progress: {completedLessons.length} / 12 Lessons Completed</span>
        </div>
      </div>

      {/* Track List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CURRICULUM_TRACKS.map((track) => (
          <div key={track.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="font-orbitron font-bold text-xs text-cyan-300">{track.title}</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">{track.description}</p>

            <div className="space-y-1.5 pt-1">
              {track.lessons.map((lesson) => {
                const isSelected = activeLesson.id === lesson.id;
                const isDone = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => loadLessonCircuit(lesson)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all border ${
                      isSelected
                        ? 'bg-purple-500/20 text-purple-200 border-purple-500/50 shadow-sm'
                        : 'bg-slate-950/60 text-slate-300 hover:bg-slate-900 border-slate-800/80'
                    }`}
                  >
                    <span className="truncate pr-2">{lesson.title}</span>
                    {isDone ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Active Lesson Sandbox */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-orbitron font-extrabold text-lg text-purple-300">{activeLesson.title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeLesson.summary}</p>
          </div>

          <button
            onClick={() => loadLessonCircuit(activeLesson)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
          >
            Load Lesson Circuit
          </button>
        </div>

        {/* Checkpoint & Quiz */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Checkpoint:</span>
          </div>
          <p className="text-xs text-slate-300">{activeLesson.checkpoint}</p>

          <div className="pt-2 border-t border-slate-800/80 space-y-3">
            <p className="font-bold text-xs text-cyan-300">{activeLesson.quiz.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeLesson.quiz.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuizAnswer(idx)}
                  className={`p-2.5 rounded-lg text-xs font-medium text-left transition-all border ${
                    quizAnswer === idx
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/60 ring-1 ring-cyan-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuizSubmit}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Submit Checkpoint Answer
            </button>

            {quizResult && (
              <div className={`p-3 rounded-lg border text-xs ${
                quizResult.isCorrect
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              }`}>
                {quizResult.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
