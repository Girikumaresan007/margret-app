import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

// Floating particle positions (pre-computed for consistency)
const particles = [
  { x: '15%', y: '20%', size: 3, delay: 0, duration: 3.5 },
  { x: '80%', y: '15%', size: 2, delay: 0.5, duration: 4 },
  { x: '25%', y: '75%', size: 4, delay: 1, duration: 3 },
  { x: '70%', y: '80%', size: 2.5, delay: 0.3, duration: 4.5 },
  { x: '10%', y: '50%', size: 2, delay: 0.8, duration: 3.2 },
  { x: '90%', y: '45%', size: 3, delay: 0.2, duration: 3.8 },
  { x: '50%', y: '10%', size: 2, delay: 1.2, duration: 4.2 },
  { x: '40%', y: '85%', size: 3.5, delay: 0.6, duration: 3.6 },
  { x: '85%', y: '65%', size: 2, delay: 0.4, duration: 4.1 },
  { x: '35%', y: '30%', size: 2.5, delay: 0.9, duration: 3.4 },
  { x: '60%', y: '90%', size: 2, delay: 1.1, duration: 3.9 },
  { x: '5%', y: '35%', size: 3, delay: 0.7, duration: 4.3 },
];

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'show' | 'animate' | 'exit'>('show');

  useEffect(() => {
    // Add class to body to hide navbar logo during splash flight
    document.body.classList.add('splash-active');

    // Phase 1: Show the logo centered for 2 seconds
    const showTimer = setTimeout(() => {
      setPhase('animate');
    }, 2000);

    return () => {
      document.body.classList.remove('splash-active');
      clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === 'animate') {
      // Phase 2: Start background fade-out (reveal homepage) 650ms after flight begins
      const exitTimer = setTimeout(() => {
        setPhase('exit');
      }, 650);

      return () => clearTimeout(exitTimer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'exit') {
      // Phase 3: Unmount splash screen once flight is fully complete (~1.0s total flight time + buffer)
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);

      return () => clearTimeout(completeTimer);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ backgroundColor: '#F5F2ED' }}
    >
      {/* ── Premium Background Layers ── */}

      {/* Rotating Light & Dark Rays (Sunburst) covering the whole screen */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            rotate: 360,
            opacity: phase === 'show' ? 1 : 0
          }}
          transition={{
            rotate: { duration: 45, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.8, ease: "easeInOut" }
          }}
          className="w-[280vw] h-[280vw] flex-shrink-0"
          style={{
            background: `repeating-conic-gradient(
              from 0deg,
              #F5F2ED 0deg 8deg,
              rgba(218, 165, 32, 0.05) 8deg 16deg
            )`
          }}
        />
      </div>

      {/* Vignette overlay for the rays to fade softly towards the screen edges */}
      <motion.div
        animate={{ opacity: phase === 'show' ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(245, 242, 237, 0.6) 60%, #F5F2ED 95%)'
        }}
      />


      {/* Elegant geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #DAA520 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #DAA520 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle diagonal luxury lines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 80px,
            #B8860B 80px,
            #B8860B 81px
          )`,
        }}
      />

      {/* Large radial gradient - top right accent */}
      <div
        className="absolute -top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(218,165,32,0.06) 0%, rgba(218,165,32,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Large radial gradient - bottom left accent */}
      <div
        className="absolute -bottom-[30%] -left-[20%] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184,134,11,0.05) 0%, rgba(184,134,11,0.02) 40%, transparent 70%)',
        }}
      />

      {/* ── Floating Gold Particles ── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: phase === 'show' ? [0, 0.5, 0.2, 0.5] : 0,
            scale: phase === 'show' ? [0, 1, 0.8, 1] : 0,
            y: phase === 'show' ? [0, -15, 5, -10] : 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay + 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: '#DAA520',
            boxShadow: `0 0 ${p.size * 3}px rgba(218,165,32,0.3)`,
          }}
        />
      ))}

      {/* ── Animated Concentric Rings ── */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={`ring-${ring}`}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: phase === 'show' ? [0, 0.12, 0] : 0,
            scale: phase === 'show' ? [0.3, 0.8 + ring * 0.3, 1.2 + ring * 0.3] : 0.3,
          }}
          transition={{
            duration: 3,
            delay: ring * 0.8,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: `${200 + ring * 100}px`,
            height: `${200 + ring * 100}px`,
            borderColor: `rgba(218,165,32,${0.15 - ring * 0.03})`,
          }}
        />
      ))}

      {/* ── Central Gold Glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: phase === 'show' ? 0.35 : 0,
            scale: phase === 'show' ? 1.2 : 0.5,
          }}
          transition={{ duration: 0.8 }}
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(218,165,32,0.18) 0%, rgba(218,165,32,0.06) 35%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Corner Decorative Elements ── */}
      {/* Top-left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'show' ? 0.15 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-8 left-8 pointer-events-none"
      >
        <div className="w-[60px] h-[1px] bg-gradient-to-r from-[#DAA520] to-transparent" />
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-[#DAA520] to-transparent" />
      </motion.div>

      {/* Top-right corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'show' ? 0.15 : 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-8 right-8 pointer-events-none"
      >
        <div className="w-[60px] h-[1px] bg-gradient-to-l from-[#DAA520] to-transparent ml-auto" />
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-[#DAA520] to-transparent ml-auto" />
      </motion.div>

      {/* Bottom-left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'show' ? 0.15 : 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-8 left-8 pointer-events-none"
      >
        <div className="w-[1px] h-[60px] bg-gradient-to-t from-[#DAA520] to-transparent" />
        <div className="w-[60px] h-[1px] bg-gradient-to-r from-[#DAA520] to-transparent" />
      </motion.div>

      {/* Bottom-right corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'show' ? 0.15 : 0 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 right-8 pointer-events-none"
      >
        <div className="w-[1px] h-[60px] bg-gradient-to-t from-[#DAA520] to-transparent ml-auto" />
        <div className="w-[60px] h-[1px] bg-gradient-to-l from-[#DAA520] to-transparent ml-auto" />
      </motion.div>

      {/* ── Spinning Outer Ring ── */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{
          opacity: phase === 'show' ? 0.2 : 0,
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        }}
        className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{
          border: '1px dashed rgba(218,165,32,0.2)',
        }}
      />

      {/* ── Brand Text ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: phase === 'show' ? 1 : 0,
          y: phase === 'show' ? 0 : -20,
        }}
        transition={{ duration: 0.6, delay: phase === 'show' ? 0.6 : 0 }}
        className="absolute top-[calc(50%+115px)] md:top-[calc(50%+150px)] left-1/2 -translate-x-1/2 text-center z-10"
      >
        <h1 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-[#1A1A1A]">
          MARGRET <span style={{ color: '#DAA520' }}>AUDIO VISUAL</span>
        </h1>
        <p className="text-[#1A1A1A]/50 text-xs md:text-sm tracking-[0.3em] uppercase mt-2 font-medium">
          Premium Event Solutions
        </p>
      </motion.div>

      {/* ── Main Logo ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          phase === 'show'
            ? { opacity: 1, scale: 1, x: 0, y: 0 }
            : (phase === 'animate' || phase === 'exit')
              ? {
                opacity: 1,
                scale: 0.25,
                x: typeof window !== 'undefined' ? -(window.innerWidth / 2 - 80) : -500,
                y: typeof window !== 'undefined' ? -(window.innerHeight / 2 - 30) : -300,
              }
              : { opacity: 0, scale: 0.25, x: typeof window !== 'undefined' ? -(window.innerWidth / 2 - 80) : -500, y: typeof window !== 'undefined' ? -(window.innerHeight / 2 - 30) : -300 }
        }
        transition={
          phase === 'show'
            ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            : (phase === 'animate' || phase === 'exit')
              ? { duration: 1.0, ease: [0.65, 0, 0.35, 1] }
              : { duration: 0.3 }
        }
        className="relative z-20"
      >
        <img
          src="/logo.png"
          alt="Margret AV"
          className="w-[145px] h-[145px] md:w-[195px] md:h-[195px] object-contain"
        />
      </motion.div>

      {/* ── Horizontal Decorative Lines ── */}
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: phase === 'show' ? 1 : 0,
          opacity: phase === 'show' ? 0.3 : 0,
        }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 -translate-y-1/2 left-[5%] w-[15%] h-[1px] origin-left pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #DAA520)' }}
      />

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: phase === 'show' ? 1 : 0,
          opacity: phase === 'show' ? 0.3 : 0,
        }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 -translate-y-1/2 right-[5%] w-[15%] h-[1px] origin-right pointer-events-none"
        style={{ background: 'linear-gradient(270deg, transparent, #DAA520)' }}
      />

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: phase === 'show' ? 1 : 0,
          opacity: phase === 'show' ? 1 : 0,
        }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 h-[2px] w-[60px] rounded-full origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent, #DAA520, transparent)',
        }}
      />
    </motion.div>
  );
}
