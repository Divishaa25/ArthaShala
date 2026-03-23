import React, { useState } from 'react';

export default function LessonViewer({ lesson, onStartDemo }) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!lesson) return null;

  const slides = [
    {
      title: "The Situation",
      text: lesson.crisis,
      image: lesson.images.present,
      icon: "🚨"
    },
    {
      title: "The Wisdom",
      text: lesson.lessonText,
      image: "https://images.unsplash.com/photo-1454165833767-02755157f86e?auto=format&fit=crop&w=800&q=80",
      icon: "💡"
    },
    {
      title: "The Choice",
      text: "Every decision has a cost. Your goal is to choose the path that maximizes your long-term wealth, not just immediate survival.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
      icon: "⚖️"
    }
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col overflow-hidden font-sans">
      
      {/* Background Image Layer */}
      <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden">
        <img 
          src={slides[activeSlide].image} 
          className="w-full h-full object-cover brightness-[0.4] scale-110 blur-sm animate-pulse" 
          alt="Lesson Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
      </div>

      {/* Top Header */}
      <header className="relative p-8 pt-14 flex items-center justify-between z-10">
         <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-1">Lesson Phase</span>
            <div className="flex gap-2">
               {slides.map((_, i) => (
                 <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i === activeSlide ? 'bg-blue-500 scale-x-125' : 'bg-slate-700'}`} />
               ))}
            </div>
         </div>
         <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl">
            {slides[activeSlide].icon}
         </div>
      </header>

      {/* Slide Content Overlay */}
      <div className="relative flex-1 px-8 flex flex-col justify-end pb-24 z-10">
         <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-2">
              Step {activeSlide + 1}: {slides[activeSlide].title}
            </h2>
            <h1 className="text-4xl font-black text-white italic tracking-tighter leading-tight drop-shadow-2xl">
              {slides[activeSlide].text.split('(')[0]}
            </h1>
            <p className="text-slate-400 font-bold text-lg mt-4 leading-relaxed italic opacity-80">
              {slides[activeSlide].text.split('(')[1]?.replace(')', '') || ""}
            </p>
         </div>

         {/* Navigation Controls */}
         <div className="flex gap-4 mt-12 w-full">
            {activeSlide < slides.length - 1 ? (
              <>
                {activeSlide > 0 && (
                   <button 
                     onClick={handlePrev}
                     className="flex-1 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all"
                   >
                     Back
                   </button>
                )}
                <button 
                  onClick={handleNext}
                  className="flex-[2] py-5 bg-blue-600 border border-blue-400 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Continue Journey ➔
                </button>
              </>
            ) : (
              <button 
                onClick={onStartDemo}
                className="w-full py-8 bg-gradient-to-r from-blue-600 to-indigo-700 border-t border-white/20 text-white rounded-[2.5rem] font-black text-2xl animate-bounce shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)] active:scale-95 transition-all"
              >
                 मैप पर आजमाएं (Try on Map) ➔
              </button>
            )}
         </div>
      </div>

    </div>
  );
}
