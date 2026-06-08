import { motion } from 'motion/react';
import { TestimonialsSection } from '../components/ui/testimonial-v2';
import { ArrowRight, Star, CheckCircle2, Play, Users, ShieldCheck, Zap, Heart, Settings, Briefcase, Music, Disc, Gift, Rocket, GraduationCap, Sparkles, Trophy, MonitorPlay, Volume2, Lightbulb, Cpu, Layers, Activity, Presentation, Megaphone, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, TESTIMONIALS, PACKAGES } from '../constants';
import { cn } from '../lib/utils';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServiceIconMap: Record<string, React.ComponentType<any>> = {
  Monitor,
  Layers,
  Presentation,
  Rocket,
  Award: Trophy, // Fallback to Trophy if Award is not direct, or we can use Trophy/Sparkles
  Settings,
  GraduationCap,
  Megaphone,
  Heart
};


const fadeInUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: 'easeOut' as const }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } }
};

const eventMarqueeItems = [
  { name: "Wedding Events", icon: Heart },
  { name: "Corporate Shows", icon: Briefcase },
  { name: "Live Concerts", icon: Music },
  { name: "DJ & Club Nights", icon: Disc },
  { name: "Product Launches", icon: Rocket },
  { name: "Awards & Gala Dinners", icon: Trophy }
];

const techMarqueeItems = [
  { name: "P3.9 LED Screens", icon: MonitorPlay },
  { name: "L-Acoustics Sound", icon: Volume2 },
  { name: "Intelligent Lighting", icon: Lightbulb },
  { name: "Fail-Safe Redundancy", icon: ShieldCheck },
  { name: "Professional Crew", icon: Users }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [playVideo1, setPlayVideo1] = useState(false);
  const [playVideo2, setPlayVideo2] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // GSAP: Cinematic hero entrance
  useEffect(() => {
    if (!heroContentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.home-badge',
        { opacity: 0, y: 20, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.5)' }
      )
      .fromTo('.home-h1',
        { opacity: 0, y: 55, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.home-p',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.45'
      )
      .fromTo('.home-btns',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      );
    }, heroContentRef);
    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger: Mission cards scrub reveal
  useEffect(() => {
    if (!missionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.mission-card',
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 78%',
            once: true,
          },
        }
      );
    }, missionRef);
    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger: Service cards stagger
  useEffect(() => {
    if (!servicesRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, servicesRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16 md:pt-20 overflow-hidden">
        {/* <ThreeBackground /> */}
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(min-width: 768px)" srcSet="/hero4.webp" />
            <img
              src="/mobile 3.webp"
              alt="Hero Background"
              className="w-full h-full object-cover object-[center_20%]"
              fetchPriority="high"
            />
          </picture>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/80 md:bg-none md:bg-black/10 z-0"></div>

        {/* Large Colorful Logo Watermark (Using user-provided logo-icon.png directly, perfectly centered) */}
        <div className="absolute inset-0 z-[1] pointer-events-none flex items-center justify-center -translate-y-2 md:-translate-y-6">
          <img
            src="/logo-icon.png"
            alt=""
            className="w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[380px] lg:h-[380px] object-contain opacity-35 mix-blend-overlay"
          />
        </div>


          {/* Hero content â€” GSAP animates .home-badge .home-h1 .home-p .home-btns */}
          <div ref={heroContentRef} className="relative w-full max-w-7xl mx-auto text-center z-10 flex flex-col items-center justify-center gap-4 md:gap-8 -translate-y-2 md:-translate-y-6">
            {/* Left LED Panel */}
            {isDesktop && (
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="hidden lg:flex absolute -left-2 xl:-left-4 top-[74%] -translate-y-1/2 flex-col items-center pointer-events-none"
              >
                <div className="relative w-[220px] h-[165px] rounded-[2px] overflow-hidden shadow-[0_0_40px_rgba(0,100,255,0.2),0_0_80px_rgba(0,100,255,0.08),inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 border-[4px] border-[#1a1a1a] rounded-[2px] z-30" />
                  <div className="absolute inset-0 border-t-[1px] border-l-[1px] border-[#444] rounded-[2px] z-30 opacity-40" />
                  <div className="absolute top-[2px] left-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute top-[2px] right-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute bottom-[2px] left-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute bottom-[2px] right-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute inset-[4px] border border-[#0077ff]/25 z-20" />
                  <div className="absolute inset-[5px] bg-gradient-to-br from-[#050510] via-[#0a0a18] to-[#060612] flex items-center justify-center">
                    <img src="/logo-icon.png?v=2" alt="Margret AV" className="w-[110px] h-[110px] object-contain brightness-125 drop-shadow-[0_0_20px_rgba(255,215,0,0.35)]" />
                  </div>
                  <div className="absolute inset-[5px] z-10 pointer-events-none">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#111]/60" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#111]/60" />
                  </div>
                  <div className="absolute inset-[5px] z-10 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 2px)` }} />
                  <motion.div animate={{ y: ["-100%", "250%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-[5px] right-[5px] h-[1.5px] bg-gradient-to-r from-transparent via-white/8 to-transparent z-10 pointer-events-none" />
                  <motion.div animate={{ opacity: [0.97, 1, 0.98, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-[5px] bg-transparent z-[5]" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-[70px] h-[4px] bg-gradient-to-b from-[#555] to-[#333] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                  <div className="w-[4px] h-[22px] bg-gradient-to-b from-[#555] via-[#444] to-[#3a3a3a] relative"><div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[14px] h-[4px] bg-[#4a4a4a] rounded-[1px] border-t border-[#666]/40" /></div>
                  <div className="w-[10px] h-[5px] bg-gradient-to-b from-[#555] to-[#3a3a3a] rounded-[1px] border border-[#666]/30" />
                  <div className="w-[4px] h-[28px] bg-gradient-to-b from-[#444] to-[#2a2a2a] relative"><div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[14px] h-[4px] bg-[#3a3a3a] rounded-[1px] border-t border-[#555]/30" /></div>
                  <div className="w-[12px] h-[5px] bg-gradient-to-b from-[#444] to-[#333] rounded-sm" />
                  <div className="relative w-[70px] h-[6px]">
                    <div className="absolute left-[4px] bottom-0 w-[24px] h-[2px] bg-gradient-to-l from-[#444] to-[#333] rounded-full -rotate-[15deg] origin-right" />
                    <div className="absolute right-[4px] bottom-0 w-[24px] h-[2px] bg-gradient-to-r from-[#444] to-[#333] rounded-full rotate-[15deg] origin-left" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[2px] h-[4px] bg-[#3a3a3a]" />
                  </div>
                </div>
                <div className="mt-1.5 flex flex-col items-center gap-0.5">
                  <span className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase">LED Display</span>
                  <span className="text-white/40 text-[8px] tracking-wider">P3.9 Indoor</span>
                </div>
              </motion.div>
            )}

            {/* Right LED Panel */}
            {isDesktop && (
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="hidden lg:flex absolute -right-2 xl:-right-4 top-[74%] -translate-y-1/2 flex-col items-center pointer-events-none"
              >
                <div className="relative w-[220px] h-[165px] rounded-[2px] overflow-hidden shadow-[0_0_40px_rgba(0,100,255,0.2),0_0_80px_rgba(0,100,255,0.08),inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 border-[4px] border-[#1a1a1a] rounded-[2px] z-30" />
                  <div className="absolute inset-0 border-t-[1px] border-l-[1px] border-[#444] rounded-[2px] z-30 opacity-40" />
                  <div className="absolute top-[2px] left-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute top-[2px] right-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute bottom-[2px] left-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute bottom-[2px] right-[2px] w-[5px] h-[5px] rounded-full bg-[#333] border border-[#555] z-30" />
                  <div className="absolute inset-[4px] border border-[#0077ff]/25 z-20" />
                  <div className="absolute inset-[5px] bg-[#050510] overflow-hidden">
                    <iframe src="https://www.youtube.com/embed/0DvvfhOgYPM?autoplay=1&mute=1&loop=1&playlist=0DvvfhOgYPM&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1" title="LED Wall Showcase" className="w-full h-full border-0 scale-[1.5] pointer-events-auto" allow="autoplay; encrypted-media" loading="lazy" />
                  </div>
                  <div className="absolute inset-[5px] z-10 pointer-events-none">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#111]/60" />
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#111]/60" />
                  </div>
                  <div className="absolute inset-[5px] z-10 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 2px), repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 2px)` }} />
                  <motion.div animate={{ y: ["-100%", "250%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }} className="absolute left-[5px] right-[5px] h-[1.5px] bg-gradient-to-r from-transparent via-white/8 to-transparent z-10 pointer-events-none" />
                  <motion.div animate={{ opacity: [0.97, 1, 0.98, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-[5px] bg-transparent z-[5]" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-[70px] h-[4px] bg-gradient-to-b from-[#555] to-[#333] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
                  <div className="w-[4px] h-[22px] bg-gradient-to-b from-[#555] via-[#444] to-[#3a3a3a] relative"><div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[14px] h-[4px] bg-[#4a4a4a] rounded-[1px] border-t border-[#666]/40" /></div>
                  <div className="w-[10px] h-[5px] bg-gradient-to-b from-[#555] to-[#3a3a3a] rounded-[1px] border border-[#666]/30" />
                  <div className="w-[4px] h-[28px] bg-gradient-to-b from-[#444] to-[#2a2a2a] relative"><div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[14px] h-[4px] bg-[#3a3a3a] rounded-[1px] border-t border-[#555]/30" /></div>
                  <div className="w-[12px] h-[5px] bg-gradient-to-b from-[#444] to-[#333] rounded-sm" />
                  <div className="relative w-[70px] h-[6px]">
                    <div className="absolute left-[4px] bottom-0 w-[24px] h-[2px] bg-gradient-to-l from-[#444] to-[#333] rounded-full -rotate-[15deg] origin-right" />
                    <div className="absolute right-[4px] bottom-0 w-[24px] h-[2px] bg-gradient-to-r from-[#444] to-[#333] rounded-full rotate-[15deg] origin-left" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[2px] h-[4px] bg-[#3a3a3a]" />
                  </div>
                </div>
                <div className="mt-1.5 flex flex-col items-center gap-0.5">
                  <span className="text-white/80 text-[10px] font-bold tracking-[0.25em] uppercase">Live Preview</span>
                  <span className="text-white/40 text-[8px] tracking-wider">Event Showcase</span>
                </div>
              </motion.div>
            )}

            {/* GSAP-animated hero text â€” classes targeted by GSAP timeline */}
            <div className="home-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-gold/20 backdrop-blur-md mb-2 md:mb-0" style={{ opacity: 0 }}>
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gold tracking-wide uppercase">Premium Event Solutions</span>
            </div>

            <h1 className="home-h1 text-3xl sm:text-4xl md:text-6xl font-display font-extrabold leading-tight text-ink drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] md:drop-shadow-none px-2" style={{ opacity: 0 }}>
              <span className="text-gray-50">Professional</span>{" "}
              <span className="text-gold-light">LED &amp; Audio Visual</span>{" "}
              <br className="hidden md:inline" />
              <span className="text-gray-50">Solution for Every Event</span>
            </h1>

            <p className="home-p text-white text-sm md:text-xl max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:drop-shadow-none px-4" style={{ opacity: 0 }}>
              Transform your events with cutting-edge LED screens, crystal-clear audio systems
              and professional lighting solutions. Crafting unforgettable experiences.
            </p>

            <div className="home-btns flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-2 md:mt-8 w-full px-4" style={{ opacity: 0 }}>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(218,165,32,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full max-w-[280px] sm:max-w-none sm:w-auto bg-gold text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gold-light transition-all group shadow-md"
              >
                Explore Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#packages"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full max-w-[280px] sm:max-w-none sm:w-auto text-[#f7f7f7] px-8 py-4 rounded-full font-bold border border-[#FFD700] flex items-center justify-center gap-2 transition-all shadow-md"
              >
                Packages
              </motion.a>
            </div>
          </div>
      </section>

      {/* High-Contrast Professional Dual-Track Marquee Section */}
      <section className="py-5.5 bg-gradient-to-r from-[#12100E] via-[#080705] to-[#12100E] overflow-hidden border-y border-gold/30 relative shadow-[inset_0_1px_0_rgba(255,215,0,0.1),inset_0_-1px_0_rgba(255,215,0,0.1),0_4px_30px_rgba(0,0,0,0.15)]">

        {/* Fade edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#12100E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#12100E] to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-4.5 relative z-10">

          {/* Row 1: Left Scrolling (Event Categories) */}
          <div className="flex overflow-hidden">
            <div className="flex gap-6 whitespace-nowrap animate-marquee py-0.5">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex gap-6 items-center">
                  {eventMarqueeItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-gold/10 border border-white/10 hover:border-gold/50 transition-all duration-300 group cursor-default shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(218,165,32,0.2)] hover:-translate-y-0.5"
                      >
                        <Icon size={16} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xs md:text-sm font-bold text-white/95 tracking-wider group-hover:text-white transition-colors duration-300 uppercase">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right Scrolling (Technical Highlights) */}
          <div className="flex overflow-hidden">
            <div className="flex gap-6 whitespace-nowrap animate-marquee-reverse py-0.5">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex gap-6 items-center">
                  {techMarqueeItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] hover:bg-gold/10 border border-white/10 hover:border-gold/50 transition-all duration-300 group cursor-default shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(218,165,32,0.2)] hover:-translate-y-0.5"
                      >
                        <Icon size={16} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xs md:text-sm font-bold text-white/95 tracking-wider group-hover:text-white transition-colors duration-300 uppercase">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>



      {/* Mission Section */}
      <section id="about" ref={missionRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 {...fadeInUp} className="text-4xl font-bold mb-4 text-ink">Our <span className="text-gold">Mission</span></motion.h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "60px", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
          />
          <motion.p {...fadeInUp} className="text-gray-600 max-w-2xl mx-auto">To empower event creators with world-class technical solutions that bridge the gap between imagination and reality.</motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Innovation', desc: 'Constantly pushing the boundaries of what is possible in event technology.', icon: Zap },
            { title: 'Reliability', desc: 'Ensuring flawless execution through rigorous testing and redundant systems.', icon: ShieldCheck },
            { title: 'Passion', desc: 'A deep-rooted love for the art of production and live experiences.', icon: Heart },
          ].map((item, i) => (
            <div
              key={i}
              className="mission-card relative glass p-10 rounded-3xl text-center group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              // GSAP sets opacity-0 → 1 on desktop; on mobile cards are visible by default
              style={{ opacity: typeof window !== 'undefined' && window.innerWidth >= 768 ? 0 : 1 }}
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                <item.icon className="text-gold w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-ink">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-gold/0 via-gold to-gold/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">
              Why <span className="text-gold">Choose Us</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600">
              The Margret AV difference lies in our commitment to quality.
            </p>
          </div>

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Professional Team",
                desc: "Highly trained technicians and engineers.",
                icon: Users,
              },
              {
                title: "High-End Equipment",
                desc: "Latest gear from industry-leading brands.",
                icon: Zap,
              },
              {
                title: "Custom Solutions",
                desc: "Tailored setups for your unique needs.",
                icon: Settings,
              },
              {
                title: "Reliable Service",
                desc: "On-time delivery and flawless execution.",
                icon: ShieldCheck,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-black/5 hover:-translate-y-2 transition-all duration-500 group overflow-hidden"
              >
                {/* Hover Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10">

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-gold group-hover:text-black" />
                  </div>

                  {/* Title */}
                  <h4 className="font-bold mb-2 text-ink">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-600 text-sm">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" ref={servicesRef} className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-ink">
              Premium <span className="text-gold">Services</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600 mt-4">
              Comprehensive technical solutions for events of all types and sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = ServiceIconMap[service.icon] || Settings;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="service-card group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
                  style={{ opacity: typeof window !== 'undefined' && window.innerWidth >= 768 ? 0 : 1 }}
                >
                  {/* IMAGE */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* DARK OVERLAY (ONLY ON HOVER DETECTED BY SCREEN SIZE) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 z-10" />

                  {/* CONTENT (VISIBLE BY DEFAULT ON MOBILE/TABLET, HIDDEN INITIALLY ON DESKTOP) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 z-20">
                    {/* ICON */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#F2EDE2]/15 border border-[#F2EDE2]/20">
                      <Icon size={24} className="text-[#F2EDE2]" />
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-bold mb-2 !text-white drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-white/80 text-sm leading-relaxed lg:translate-y-4 lg:group-hover:translate-y-0 transition-all duration-500">
                      {service.description}
                    </p>
                  </div>

                  {/* BORDER GLOW */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#F2EDE2]/30 rounded-3xl transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6 bg-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-ink">Pricing <span className="text-gold">Packages</span></h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600">Choose the perfect technical setup for your event scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "glass p-8 rounded-3xl flex flex-col relative group transition-all hover:-translate-y-2",
                  pkg.isPopular && "border-gold/50 bg-gold/5"
                )}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-ink">{pkg.name}</h3>
                <div className="text-4xl font-bold text-gold mb-8">{pkg.price}</div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feature, f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/package/${pkg.id}`}
                  className={cn(
                    "w-full py-4 rounded-xl font-bold text-center transition-colors duration-300",
                    pkg.isPopular
                      ? "bg-gold text-black hover:bg-gold-light"
                      : "bg-white/70 text-ink hover:bg-gold-light hover:text-black"
                  )}
                >
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* YouTube Showcase */}
      <section className="py-20 px-6 bg-white/20">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-ink">
              Event <span className="text-gold">Highlights</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "60px", opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
            />
            <p className="text-gray-600 mt-4">
              See our work in action across various high-profile events.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Video 1 */}
            <div className="group aspect-video rounded-3xl overflow-hidden glass p-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)] relative cursor-pointer bg-black/90">
              {playVideo1 ? (
                <iframe
                  className="w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/0DvvfhOgYPM?autoplay=1&mute=1&start=10"
                  title="Margret AV Showcase 1"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div onClick={() => setPlayVideo1(true)} className="absolute inset-2 rounded-2xl overflow-hidden group/thumb">
                  <img
                    src="https://img.youtube.com/vi/0DvvfhOgYPM/hqdefault.jpg"
                    alt="Event Showcase 1"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105 brightness-75"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover/thumb:bg-black/10 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-gold-light">
                      <Play className="w-8 h-8 fill-black translate-x-0.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video 2 */}
            <div className="group aspect-video rounded-3xl overflow-hidden glass p-2 transition-all duration-500 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)] relative cursor-pointer bg-black/90">
              {playVideo2 ? (
                <iframe
                  className="w-full h-full rounded-2xl"
                  src="https://www.youtube.com/embed/YFtGs1QSQ6A?autoplay=1&mute=1&start=10"
                  title="Margret AV Showcase 2"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div onClick={() => setPlayVideo2(true)} className="absolute inset-2 rounded-2xl overflow-hidden group/thumb">
                  <img
                    src="https://img.youtube.com/vi/YFtGs1QSQ6A/hqdefault.jpg"
                    alt="Event Showcase 2"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105 brightness-75"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 group-hover/thumb:bg-black/10 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-gold/90 text-black flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-gold-light">
                      <Play className="w-8 h-8 fill-black translate-x-0.5" />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-gold p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 text-ink">Ready to <span className="text-gold">Elevate</span> Your Event?</h2>
          <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Let's discuss your vision and create a technical masterpiece together. Our team is ready to bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to="/contact" className="w-full sm:w-auto bg-gold text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gold-light transition-all">
              Contact Us
            </Link>
            {/* <Link to="/contact" className="w-full sm:w-auto glass px-10 py-5 rounded-full font-bold text-lg hover:bg-ink/5 text-ink transition-all">
              Contact Us
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}
