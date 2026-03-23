import React, { useState } from 'react';

export default function LessonViewer({ lesson, onStartDemo }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizError, setQuizError] = useState(false);

  if (!lesson) return null;

  const slides = lesson.slides || [];
  const maxSlides = slides.length;

  const handleNext = () => {
    if (activeSlide < maxSlides - 1) {
      setActiveSlide(activeSlide + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleQuizChoice = (isCorrect) => {
    if (isCorrect) {
      setQuizAnswered(true);
      setQuizError(false);
    } else {
      setQuizError(true);
      setTimeout(() => setQuizError(false), 2000);
    }
  };

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col overflow-hidden font-sans">
      
      {/* Background Image Layer */}
      <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden">
        <img 
          src={lesson.simulation?.images?.present || "https://images.unsplash.com/photo-1454165833767-02755157f86e?auto=format&fit=crop&w=800&q=80"} 
          className="w-full h-full object-cover brightness-[0.4] scale-110 blur-sm animate-pulse" 
          alt="Lesson Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
      </div>

      {/* Top Header */}
      <header className="relative p-8 pt-14 flex items-center justify-between z-10">
         <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-1">
              {showQuiz ? "Knowledge Test" : "Lesson Phase"}
            </span>
            <div className="flex gap-2">
               {!showQuiz ? slides.map((_, i) => (
                 <div key={i} className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i === activeSlide ? 'bg-blue-500 scale-x-125' : 'bg-slate-700'}`} />
               )) : (
                 <div className="h-1.5 w-full bg-blue-500 rounded-full" />
               )}
            </div>
         </div>
         <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-xl">
            {showQuiz ? "❓" : (slides[activeSlide]?.visual || lesson.icon)}
         </div>
      </header>

      {/* Slide Content Overlay */}
      <div className="relative flex-1 px-8 flex flex-col justify-end pb-24 z-10">
         {!showQuiz ? (
           <div className="animate-in slide-in-from-bottom-8 fade-in duration-700">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400 mb-2">
                Step {activeSlide + 1}: {lesson.title}
              </h2>
              <h1 className="text-4xl font-black text-white italic tracking-tighter leading-tight drop-shadow-2xl">
                {slides[activeSlide]?.text.split('(')[0]}
              </h1>
              <p className="text-slate-400 font-bold text-lg mt-4 leading-relaxed italic opacity-80">
                {slides[activeSlide]?.text.split('(')[1]?.replace(')', '') || ""}
              </p>
           </div>
         ) : (
           <div className="animate-in zoom-in-95 fade-in duration-500">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-amber-400 mb-2">Final Quiz</h2>
              <h1 className="text-2xl font-black text-white leading-tight mb-8">
                {lesson.quiz.question}
              </h1>
              
              <div className="flex flex-col gap-4">
                {lesson.quiz.options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleQuizChoice(opt.isCorrect)}
                    className={`w-full p-6 text-left rounded-3xl font-bold transition-all border-2 ${quizAnswered && opt.isCorrect ? 'bg-green-600 border-green-400 text-white' : quizError && !opt.isCorrect ? 'bg-red-600 border-red-400 text-white animate-shake' : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
           </div>
         )}

         {/* Navigation Controls */}
         <div className="flex gap-4 mt-12 w-full">
            {!quizAnswered ? (
              <>
                <button 
                  onClick={handlePrev}
                  className={`flex-1 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all ${activeSlide === 0 && !showQuiz ? 'opacity-0 pointer-events-none' : ''}`}
                >
                  Back
                </button>
                {!showQuiz && (
                  <button 
                    onClick={handleNext}
                    className="flex-[2] py-5 bg-blue-600 border border-blue-400 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    Continue Journey ➔
                  </button>
                )}
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
