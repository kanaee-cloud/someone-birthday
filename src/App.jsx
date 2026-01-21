import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Lock, ChevronRight, Gift, Music, SkipBack, SkipForward } from "lucide-react";
import { birthdayData } from "./data";

// --- 1. NEW AURORA BACKGROUND (Dark Blue Ocean Theme) ---
const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-slate-950 pointer-events-none">
      {/* Container utama efek Aurora */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        
        {/* Layer 1: Deep Ocean Blue (Base) */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] 
          bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 
          rounded-[100%] mix-blend-overlay blur-[100px] animate-aurora 
          opacity-80 transform -rotate-12" 
        />

        {/* Layer 2: Cyan/Teal Highlight (Cahaya Utama) */}
        <div className="absolute top-[20%] -left-[20%] w-[150%] h-[40%] 
          bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 
          mix-blend-color-dodge blur-[90px] opacity-60 
          animate-pulse [animation-duration:10s] transform -skew-y-6" 
        />

        {/* Layer 3: Secondary Glow (Kedalaman) */}
        <div className="absolute bottom-0 right-[-20%] w-[100%] h-[60%] 
          bg-gradient-to-tl from-indigo-600 via-blue-700 to-cyan-800 
          mix-blend-hard-light blur-[110px] opacity-50 
          animate-bounce [animation-duration:20s]" 
        />
        
        {/* Overlay Noise/Texture (Opsional untuk kesan retro/film) */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
};

// --- 2. Modal Component ---
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={(e) => e.stopPropagation()} 
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900/90 border border-slate-700/50 p-6 rounded-2xl w-full max-w-sm relative text-white shadow-2xl backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            onClose();
          }} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{title}</h3>
        <div className="max-h-[60vh] overflow-y-auto text-slate-300 leading-relaxed text-sm text-justify pr-2 
            [&::-webkit-scrollbar]:w-1.5                 
            [&::-webkit-scrollbar-track]:bg-transparent  
            [&::-webkit-scrollbar-thumb]:bg-white/20     
            [&::-webkit-scrollbar-thumb]:rounded-full    
            hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// --- Slide Components ---

const RevealScreen = ({ onUnlock }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === birthdayData.accessCode) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 relative z-10">

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="bg-slate-800/50 p-4 rounded-full mb-4 w-fit mx-auto backdrop-blur-sm border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <Lock size={48} className="text-cyan-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center text-cyan-50">Enter Access Code</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">Hint: check your gmail inbox (6 digit code).</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">
        <input
          type="password"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="bg-slate-800/50 border border-slate-600/50 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all backdrop-blur-sm text-white placeholder-slate-600 shadow-inner"
          placeholder="••••"
        />
        <button type="submit" className="bg-gradient-to-r from-cyan-600 to-blue-600 py-3 rounded-xl font-bold shadow-lg shadow-cyan-900/20 hover:opacity-90 transition-opacity text-white">
          Unlock Memories
        </button>
      </form>
      
      {error && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-300 text-sm font-medium bg-red-900/20 border border-red-500/20 px-4 py-2 rounded-full backdrop-blur-sm">
          Access Denied. Try Again.
        </motion.div>
      )}
    </div>
  );
};

const SimpleTextScreen = ({ title, subtitle, buttonText, onNext }) => (
  <div className="flex flex-col items-center justify-center h-full text-center px-6 relative z-10">
    <motion.h1 
      initial={{ scale: 0.8, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
    >
      {title}
    </motion.h1>
    <motion.p
      initial={{ scale: 0.8, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="text-sm mb-4 text-slate-300"
    >
      Kita lihat recap anda selama bertemu sy yh HHHH
    </motion.p>
    {subtitle && <p className="text-slate-400 mb-8 max-w-xs mx-auto">{subtitle}</p>}
    <button onClick={onNext} className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
      {buttonText || "Next"} <ChevronRight size={18} />
    </button>
  </div>
);

const GreetingScreen = ({ onNext }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 relative z-10">
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        
        <h1 className="text-4xl text-center font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-cyan-200 to-blue-500 drop-shadow-sm">
          {birthdayData.greeting.title}
        </h1>
        <p className="text-lg text-slate-300 mb-8 w-72 mx-auto">{birthdayData.greeting.subtitle}</p>
        
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
          <button onClick={() => setShowModal(true)} className="bg-slate-800/60 border border-slate-600/50 backdrop-blur-md py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-700/60 transition-colors shadow-lg">
            <Gift size={18} className="text-cyan-400" /> Open Letter
          </button>
          <button onClick={onNext} className="text-slate-400 text-sm py-2 hover:text-white transition-colors">
            Continue Recap
          </button>
        </div>
      </motion.div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Naura's Birthday Letter">
        <p className="whitespace-pre-line">{birthdayData.greeting.letter}</p>
      </Modal>
    </div>
  );
};

const MoodRecap = () => (
  <div className="h-full flex flex-col justify-center px-6 relative z-10">
    <h2 className="text-3xl font-bold mb-8 text-white">Spt apa yh anda dimata sy</h2>
    <p className="text-sm font-extralight mb-8 text-slate-300">OKDWOAKDOWDKWAOK</p>
    <div className="space-y-6">
      {birthdayData.moods.map((mood, idx) => (
        <motion.div 
          key={idx}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.3 + (idx * 0.2), duration: 1 }}
          className="relative"
        >
          <div className="flex justify-between mb-2 font-medium">
            <span className="text-slate-200">{mood.label}</span>
            <span className="text-slate-400">{mood.percent}%</span>
          </div>
          <div className="h-4 bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${mood.percent}%` }} 
              transition={{ delay: 0.5 + (idx * 0.2), duration: 1.5, type: "spring" }}
              className={`h-full ${mood.color} shadow-[0_0_15px_rgba(255,255,255,0.2)]`} 
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const MinutesTogether = () => {
  const [minutes, setMinutes] = useState(0);
  
  useEffect(() => {
    const start = new Date(birthdayData.startDate);
    const end = new Date(birthdayData.endDate);
    const diff = Math.abs(end - start);
    const totalMinutes = Math.floor(diff / (1000 * 60));
    
    let current = 0;
    const increment = Math.ceil(totalMinutes / 100);
    const timer = setInterval(() => {
      current += increment;
      if (current >= totalMinutes) {
        current = totalMinutes;
        clearInterval(timer);
      }
      setMinutes(current);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4 relative z-10">
      <h2 className="text-2xl font-medium text-slate-400 mb-4">Minutes Since {birthdayData.startDate}</h2>
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-500 mb-4 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
      >
        {minutes.toLocaleString()}
      </motion.div>
      <p className="text-sm text-slate-300">Fun Fact: Ini hari ke-99 since our first convo.</p>
    </div>
  );
};

const MomentsRecap = () => {
  const [selectedMoment, setSelectedMoment] = useState(null);

  return (
    <div className="h-full pt-20 px-6 overflow-hidden relative z-10">
      <h2 className="text-3xl font-bold mb-6 text-white">moments written in times.</h2>
      <div className="grid gap-4 max-h-[70vh] overflow-y-auto pb-20 scrollbar-hide">
        {birthdayData.moments.map((moment, idx) => (
          <motion.div
            key={moment.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.2 }}
            onClick={() => setSelectedMoment(moment)}
            className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors backdrop-blur-sm group"
          >
            <h3 className="font-bold text-lg text-cyan-200 group-hover:text-cyan-100">{moment.title}</h3>
            <p className="text-slate-400 text-sm">{moment.date}</p>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedMoment} onClose={() => setSelectedMoment(null)} title={selectedMoment?.title}>
        <p className="text-sm text-slate-400 mb-2">{selectedMoment?.date}</p>
        <p>{selectedMoment?.desc}</p>
      </Modal>
    </div>
  );
};

const PhilosophyScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="h-full flex flex-col justify-center px-6 relative z-10">
      <div className="bg-gradient-to-br from-indigo-950/80 to-blue-950/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-2 text-white">{birthdayData.philosophy.date}</h2>
        <div className="w-16 h-1 bg-cyan-500/50 mx-auto my-4 rounded-full" />
        <p className="text-indigo-100 mb-6">{birthdayData.philosophy.short} </p>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white/90 text-indigo-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors"
        >
          Open
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="THIS IS FROM MIAWZUKIII">
        <img src="https://i.pinimg.com/1200x/27/1f/28/271f28cc48330704ce6d8e2232795bdb.jpg" alt="azuki" className="w-52 h-52"/>
        <p>{birthdayData.philosophy.full}</p>
      </Modal>
    </div>
  );
};

const WishesScreen = () => (
  <div className="h-full flex flex-col justify-center px-6 text-center relative z-10">
    <h2 className="text-3xl font-bold mb-8 text-white">pronouns anda</h2>
    <div className="space-y-4">
      {birthdayData.wishes.map((wish, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.5, type: "spring" }}
          className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 drop-shadow-sm"
        >
          {wish}
        </motion.div>
      ))}
    </div>
  </div>
);

const ShoutoutsScreen = () => (
  <div className="h-full overflow-y-auto 
    [&::-webkit-scrollbar]:w-1.5                 
            [&::-webkit-scrollbar-track]:bg-transparent  
            [&::-webkit-scrollbar-thumb]:bg-white/20     
            [&::-webkit-scrollbar-thumb]:rounded-full    
            hover:[&::-webkit-scrollbar-thumb]:bg-white/40
    pt-24 px-6 relative z-10">
    <h2 className="text-3xl font-bold mb-6 text-white">alter ego gw mw speak up</h2>
    <div className="grid grid-cols-2 gap-3">
      {birthdayData.shoutouts.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ scale: 0, rotation: -10 }}
          animate={{ scale: 1, rotation: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 flex flex-col justify-between aspect-square backdrop-blur-sm"
        >
          <p className="text-sm text-slate-300 italic">"{item.msg}"</p>
          <p className="font-bold text-cyan-400 mt-2 text-right">- {item.name}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const MusicPlayer = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="space-y-6"
      >
        {/* Dekorasi kecil (Bintang/Sparkle) */}
        <div className="animate-pulse">
          <div className="w-1 h-1 bg-cyan-400 rounded-full mx-auto shadow-[0_0_10px_#22d3ee]" />
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4 opacity-50" />
        </div>

        {/* Teks Ucapan */}
        <h2 className="text-xl md:text-2xl font-light text-slate-300 tracking-wide">
          Once Again, happy birthday ya.
        </h2>

        {/* Nama dengan Efek Gradient & Glow */}
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] leading-tight">
          Naura Sayyidah<br />Maryam
        </h1>

        {/* Garis penutup pudar */}
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-4 opacity-50" />
      </motion.div>
      
      {/* Footer kecil */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 text-slate-600 text-[10px] uppercase tracking-[0.3em]"
      >
         Chapter 19, Begins.
      </motion.p>
    </div>
  );
};


export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const slides = [
    <SimpleTextScreen title="Hi, Naura" buttonText="Start" onNext={() => nextSlide()} />,
    <GreetingScreen onNext={() => nextSlide()} />,
    <MoodRecap />,
    <MinutesTogether />,
    <MomentsRecap />,
    <PhilosophyScreen />,
    <WishesScreen />,
    <ShoutoutsScreen />,
    <MusicPlayer />
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(curr => curr + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
  };
 
  useEffect(() => {
    const handleKeyDown = (e) => {
        if (!isUnlocked) return;
        if (e.key === "ArrowRight") nextSlide();
        if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isUnlocked]);
  
  return (
    <div className="relative bg-slate-950 h-screen w-full selection:bg-cyan-500 overflow-hidden text-white">
      
      {/* Background Aurora Baru */}
      <AuroraBackground />

      {/* Konten Utama */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        
        {!isUnlocked ? (
          <RevealScreen onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <div className="w-full max-w-xl h-full relative flex flex-col bg-slate-950/20 backdrop-blur-md shadow-2xl overflow-hidden sm:rounded-3xl sm:h-[90vh] sm:border sm:border-white/10">
            
            {/* Story Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-2">
              {slides.map((_, idx) => (
                <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-cyan-200 shadow-[0_0_8px_rgba(165,243,252,0.8)]"
                    initial={{ width: 0 }}
                    animate={{ width: idx < currentSlide ? "100%" : idx === currentSlide ? "100%" : "0%" }}
                    transition={{ duration: idx === currentSlide ? 5 : 0 }} 
                  />
                </div>
              ))}
            </div>

            <div className="absolute inset-y-0 -left-1 md:w-1/5 w-1/6 z-20" onClick={prevSlide} />
            <div className="absolute inset-y-0 -right-1 md:w-1/5 w-1/6 z-20" onClick={nextSlide} />

            {/* Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1 w-full h-full relative z-10"
              >
                {slides[currentSlide]}
              </motion.div>
            </AnimatePresence>

          </div>
        )}
      </div>
    </div>
  );
}