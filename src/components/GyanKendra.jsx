import React from 'react';
import { useFinancials } from '../context/FinancialContext.jsx';
import lessonsData from '../data/lessons.json';

export default function GyanKendra({ onSelectModule }) {
  const { language, completedModules, arthaScore } = useFinancials();

  const t = {
    hi: {
      title: 'ज्ञान केंद्र (Gyan Kendra)',
      subtitle: 'अपनी वित्तीय यात्रा शुरू करें',
      start: 'शुरू करें',
      completed: 'पूर्ण',
      score: 'आपका स्कोर'
    },
    en: {
      title: 'Gyan Kendra',
      subtitle: 'Start your financial journey',
      start: 'Start',
      completed: 'Completed',
      score: 'Your Score'
    }
  }[language] || {
    title: 'Gyan Kendra',
    subtitle: 'Start your financial journey',
    start: 'Start',
    completed: 'Completed',
    score: 'Your Score'
  };

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col overflow-hidden font-sans">
      
      {/* Header Section */}
      <header className="px-6 pt-12 pb-8 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white relative">
        <div className="absolute top-4 right-6 flex flex-col items-end">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{t.score}</span>
          <span className="text-2xl font-black italic">{arthaScore}</span>
        </div>
        
        <h1 className="text-4xl font-black italic tracking-tighter leading-tight drop-shadow-md">
          {t.title}
        </h1>
        <p className="text-indigo-100 font-bold text-sm opacity-80 mt-1">
          {t.subtitle}
        </p>
      </header>

      {/* Modules Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {lessonsData.map((module, idx) => {
          const isCompleted = completedModules.includes(module.id);
          const isLocked = idx > 0 && !completedModules.includes(lessonsData[idx - 1].id);

          return (
            <div 
              key={module.id}
              onClick={() => !isLocked && onSelectModule(module.id)}
              className={`relative group overflow-hidden rounded-[2.5rem] border-2 transition-all duration-500 p-6 flex items-center justify-between cursor-pointer ${isCompleted ? 'bg-green-50 border-green-200 opacity-90' : isLocked ? 'bg-slate-100 border-slate-200 opacity-50 grayscale cursor-not-allowed' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-400 hover:scale-[1.02]'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-3xl flex items-center justify-center text-3xl shadow-inner border ${isCompleted ? 'bg-green-100 border-green-200' : 'bg-indigo-50 border-indigo-100'}`}>
                  {isLocked ? '🔒' : isCompleted ? '✅' : '📖'}
                </div>
                <div>
                   <h3 className="text-lg font-black text-slate-800 leading-tight">
                     {module.id.replace(/_/g, ' ').toUpperCase()}
                   </h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                     {isCompleted ? t.completed : `Module 0${idx + 1}`}
                   </p>
                </div>
              </div>

              {!isLocked && !isCompleted && (
                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
                  {t.start}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative Bottom */}
      <div className="p-6 bg-white border-t border-slate-100 flex justify-center">
         <div className="w-24 h-1.5 bg-slate-100 rounded-full" />
      </div>

    </div>
  );
}
