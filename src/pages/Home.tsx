import { motion } from 'motion/react';
import { TestimonialsSection } from '../components/ui/testimonial-v2';
import { ArrowRight, Star, CheckCircle2, Play, Users, ShieldCheck, Zap, Heart, Settings, Briefcase, Music, Disc, Gift, Rocket, GraduationCap, Sparkles, Trophy, MonitorPlay, Volume2, Lightbulb, Cpu, Layers, Activity, Presentation, Megaphone, Monitor, Gem, Headphones, CalendarCheck, ChevronDown } from 'lucide-react';
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

// Custom High-Fidelity SVG Icons for the Experience Stats Card
const LaurelWreathStar = ({ className, size = 26 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M5.5 16C4.2 14.5 3.5 12.5 3.5 10.5C3.5 6.5 6.5 3.5 10.5 3.5" strokeLinecap="round" strokeWidth="1.7" />
    <path d="M4 8.5C3.5 9 3 9 3 8" />
    <path d="M3.5 11.5C3 12 2.5 12 2.5 11" />
    <path d="M4.5 14.5C4 15 3.5 15 3.5 14" />
    <path d="M6.5 6C6 6.5 5.5 6.5 5.5 5.5" />
    <path d="M18.5 16C19.8 14.5 20.5 12.5 20.5 10.5C20.5 6.5 17.5 3.5 13.5 3.5" strokeLinecap="round" strokeWidth="1.7" />
    <path d="M20 8.5C20.5 9 21 9 21 8" />
    <path d="M20.5 11.5C21 12 21.5 12 21.5 11" />
    <path d="M19.5 14.5C20 15 20.5 15 20.5 14" />
    <path d="M17.5 6C18 6.5 18.5 6.5 18.5 5.5" />
    <path d="M10 18.5C11 19 13 19 14 18.5" strokeLinecap="round" />
    <path d="M11.5 18.5L9.5 21" strokeLinecap="round" />
    <path d="M12.5 18.5L14.5 21" strokeLinecap="round" />
    <polygon points="12 6.5 13.5 9.5 16.8 9.8 14.3 12 15 15.2 12 13.5 9 15.2 9.7 12 7.2 9.8 10.5 9.5" fill="currentColor" stroke="none" />
  </svg>
);

const CustomCalendar = ({ className, size = 22 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="3" y="6" width="18" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M3 11H21" stroke="currentColor" strokeWidth="2" />
    <path d="M8 3V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 3V7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="6" y="13" width="2.5" height="2" rx="0.5" />
    <rect x="10.75" y="13" width="2.5" height="2" rx="0.5" />
    <rect x="15.5" y="13" width="2.5" height="2" rx="0.5" />
    <rect x="6" y="17" width="2.5" height="2" rx="0.5" />
    <rect x="10.75" y="17" width="2.5" height="2" rx="0.5" />
    <rect x="15.5" y="17" width="2.5" height="2" rx="0.5" />
  </svg>
);

const CustomUsers = ({ className, size = 22 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Left User */}
    <path d="M 1.5,18.5 C 1.5,15.2 3.5,12.5 6,12.5 C 8.5,12.5 10.5,15.2 10.5,18.5 Z" />
    <circle cx="6" cy="10" r="2.5" />

    {/* Right User */}
    <path d="M 13.5,18.5 C 13.5,15.2 15.5,12.5 18,12.5 C 20.5,12.5 22.5,15.2 22.5,18.5 Z" />
    <circle cx="18" cy="10" r="2.5" />

    {/* Center User (in front) */}
    <path d="M 5.5,21.5 C 5.5,17.2 8.5,13.5 12,13.5 C 15.5,13.5 18.5,17.2 18.5,21.5 Z" stroke="#FAF6F0" strokeWidth="1.2" />
    <circle cx="12" cy="10.2" r="3.2" stroke="#FAF6F0" strokeWidth="1.2" />
  </svg>
);

const CustomSupport = ({ className, size = 22 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" />
    <rect x="2" y="13" width="3" height="5" rx="1.5" fill="currentColor" />
    <rect x="19" y="13" width="3" height="5" rx="1.5" fill="currentColor" />
    <path d="M4 17.5c0 2 1.5 3.5 3.5 3.5h1.5" />
    <circle cx="9.5" cy="21" r="1" fill="currentColor" />
  </svg>
);



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
  const missionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
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
      {/* ══ Hero Section ══ */}
      <section className="relative min-h-[100svh] md:min-h-screen overflow-hidden bg-[#FAF6F0]">

        {/* Full-width background photo */}
        <div className="absolute inset-0 z-0">
          {/* Desktop view image */}
          <img
            src="/hero%20pic.png"
            alt="Hero Background"
            className="hidden lg:block w-full h-full object-cover"
            style={{ objectPosition: '65% center' }}
            fetchPriority="high"
          />
          {/* Mobile view image */}
          <img
            src="/mobile-pic.png"
            alt="Hero Background"
            className="block lg:hidden w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
            fetchPriority="high"
          />
          {/* Responsive gradient overlay */}
          <div
            className="absolute inset-0 block lg:hidden"
            style={{
              background: 'linear-gradient(to bottom, #FAF6F0 0%, #FAF6F0 16%, transparent 28%, transparent 55%, #FAF6F0 66%, #FAF6F0 100%)'
            }}
          />
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background: 'linear-gradient(to right, #FAF6F0 0%, #FAF6F0 42%, transparent 46%)'
            }}
          />
        </div>

        {/* Content panel */}
        {/* Desktop Content Panel (Visible on lg and larger) */}
        <div className="hidden lg:flex relative z-10 flex-col justify-between pl-12 pr-4 pt-20 pb-5 min-h-screen w-full">

          {/* Left top elements - limited width to prevent overlapping text */}
          <div className="w-full lg:max-w-[48%] flex flex-col pt-3 my-auto">

            {/* 1 ▸ BADGES */}
            <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="flex flex-wrap md:flex-nowrap items-center gap-x-3 gap-y-1.5 md:gap-x-0 mb-2.5">
              {[
                { Icon: Gem, label: 'Premium Quality' },
                { Icon: Star, label: 'Advanced Technology' },
                { Icon: Lightbulb, label: 'Creative Design' },
                { Icon: Headphones, label: 'Reliable Support' },
              ].map(({ Icon, label }, i, arr) => (
                <div key={i} className="flex items-center">
                  <span
                    style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}
                    className="flex items-center gap-[6px] text-[11px] sm:text-[12.5px] text-black whitespace-nowrap">
                    <Icon size={13} strokeWidth={2.0} className="text-[#B8860B] shrink-0" />
                    {label}
                  </span>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block h-3.5 w-[1px] bg-[#B8860B]/25 mx-5" />
                  )}
                </div>
              ))}
            </motion.div>

            {/* 2 ▸ HEADING */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }} className="mt-2.5 mb-4.5">
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, lineHeight: 1.06 }}
                className="text-[2.4rem] sm:text-[2.8rem] md:text-[3.2rem] lg:text-[4rem] text-[#1A1A1A] tracking-tight whitespace-nowrap">
                We Create Moments<br />You Remember
              </h1>
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 700,
                fontStyle: 'italic',
                lineHeight: 1.1,
                background: 'linear-gradient(to bottom, #C69C6D 0%, #5C3A21 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
                className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[3rem] mt-0.5">
                Forever
              </p>
              <div className="w-10 h-[3px] rounded-full bg-[#B8860B] mt-3" />
            </motion.div>

            {/* 3 ▸ DESCRIPTION */}
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2 }} className="mb-2">
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
                className="text-gray-800 text-[14px] leading-[1.5] max-w-[460px]">
                Professional LED, Audio &amp; Visual solutions for weddings,<br />
                corporate events, conferences, product launches,<br />
                live shows and every celebration.
              </p>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
                className="text-[#9C6A20] font-semibold text-[13.5px] mt-1.5">
                Bringing your vision to life with perfection.
              </p>
            </motion.div>

          </div>

          {/* 4 ▸ SERVICE CARDS - individual glass cards */}
          <div className="w-full max-w-[690px] grid grid-cols-3 gap-2 sm:gap-4 mt-2.5 mb-2.5">
            {[
              { Icon: Monitor, title: 'LED Wall & Screens', desc: ['High resolution displays', 'for stunning visuals'] },
              { Icon: Volume2, title: 'Audio Excellence', desc: ['Crystal clear sound', 'that connects'] },
              { Icon: Lightbulb, title: 'Lighting Design', desc: ['Dynamic lighting', 'for every atmosphere'] },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 + i * 0.1 }}
                whileHover={{ y: -3, boxShadow: '0 14px 30px -4px rgba(0,0,0,0.08), 0 6px 16px -2px rgba(184,134,11,0.04)' }}
                className="bg-gradient-to-br from-[#FAF6F0]/40 to-white/10 backdrop-blur-md border border-[#B8860B]/35 rounded-2xl md:rounded-3xl py-3 px-2 sm:py-4.5 sm:px-3 md:py-4.5 md:px-3.5 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(184,134,11,0.03)] cursor-default transition-all duration-300"
              >
                <div className="w-9 h-9 sm:w-[50px] sm:h-[50px] rounded-full bg-[#FAF6F0]/40 flex items-center justify-center shadow-sm shrink-0 border border-white/80">
                  <Icon className="w-5 h-5 sm:w-[26px] sm:h-[26px] text-[#8B5A2B]" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }} className="text-[8px] sm:text-[10px] md:text-[11px] text-[#1A1A1A] leading-tight whitespace-nowrap">{title}</p>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }} className="hidden md:block text-[9.5px] md:text-[10px] text-gray-700 mt-1 leading-snug">
                    {desc[0]}<br />{desc[1]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 5 ▸ STATS - combined single wide glass card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="w-full max-w-[760px] bg-gradient-to-r from-[#FAF6F0]/40 via-[#FAF6F0]/20 to-white/10 backdrop-blur-md border border-[#B8860B]/12 rounded-2xl md:rounded-3xl py-4 px-3 md:py-4.5 md:px-4 grid grid-cols-2 gap-y-3.5 gap-x-2 sm:flex sm:flex-row sm:items-stretch sm:justify-between sm:gap-0 mt-auto mb-1"
          >
            {[
              { Icon: LaurelWreathStar, num: '15+', label: 'Years Experience', size: 38 },
              { Icon: CustomCalendar, num: '1000+', label: 'Events Completed', size: 30 },
              { Icon: CustomUsers, num: '500+', label: 'Happy Clients', size: 35 },
              { Icon: CustomSupport, num: '24/7', label: 'Support', size: 30 },
            ].map(({ Icon, num, label, size }, i, arr) => (
              <div key={i} className="flex flex-1 items-center justify-center">
                <div className="flex items-center gap-2 md:gap-2.5 px-2.5 md:px-3.5">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#FAF6F0]/40 flex items-center justify-center shadow-sm shrink-0 border border-white/80">
                    <Icon className="text-[#8B5A2B]" size={size} />
                  </div>
                  <div className="flex flex-col">
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }} className="text-[1.2rem] md:text-[1.3rem] text-[#1A1A1A] leading-none">{num}</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }} className="text-[9.5px] md:text-[10px] text-gray-700 mt-1 whitespace-nowrap leading-none">{label}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden sm:block h-12 w-[1px] bg-[#B8860B]/18 self-center ml-auto" />
                )}
              </div>
            ))}
          </motion.div>

        </div>

        {/* Mobile Content panel (Visible under lg) */}
        <div className="relative z-10 flex lg:hidden flex-col justify-between px-4 sm:px-6 pt-20 pb-3 md:pb-6 min-h-[100svh] md:min-h-screen w-full">
          {/* Top text block */}
          <div className="w-full flex flex-col items-center text-center mt-2">
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 800, lineHeight: 1.1 }}
              className="text-[10.5vw] min-[375px]:text-[2.45rem] sm:text-[2.85rem] md:text-[3.25rem] text-[#1A1A1A] tracking-tight">
              We Create Moments<br />You Remember
            </h1>
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.1,
              background: 'linear-gradient(to bottom, #8B5A2B 0%, #4A2E1B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
              className="text-[8.5vw] min-[375px]:text-[2.0rem] sm:text-[2.4rem] md:text-[2.7rem] mt-1">
              Forever
            </p>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              textShadow: '0 0 8px #FAF6F0, 0 0 15px #FAF6F0, 0 0 25px #FAF6F0'
            }}
              className="text-gray-900 text-[3.1vw] min-[375px]:text-[12px] sm:text-[14.5px] md:text-[16px] leading-[1.45] max-w-[360px] sm:max-w-[420px] md:max-w-[520px] mt-2.5">
              Professional LED, Audio &amp; Visual solutions for weddings,<br />
              conferences and every celebration.
            </p>
          </div>

          {/* Bottom Group (Cards + Stats + Button) - pushed to bottom using mt-auto */}
          <div className="w-full flex flex-col items-center mt-auto gap-2">
            {/* Service Cards (Stacked Vertically on mobile, horizontal grid on tablet) */}
            <div className="w-full max-w-[250px] md:max-w-[620px] flex flex-col md:grid md:grid-cols-3 gap-1 md:gap-3.5">
              {[
                { Icon: Monitor, title: 'LED Wall & Screens' },
                { Icon: Volume2, title: 'Audio Excellence' },
                { Icon: Lightbulb, title: 'Lighting Design' },
              ].map(({ Icon, title }, i) => (
                <div
                  key={i}
                  className="bg-[#FFFDF9] border border-[#B8860B]/30 rounded-xl md:rounded-2xl py-1.5 md:py-2.5 px-3.5 md:px-4.5 flex items-center justify-between shadow-[0_4px_12px_rgba(184,134,11,0.07),0_2px_4px_rgba(0,0,0,0.02)] cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-2 md:gap-3.5">
                    <div className="w-7 h-7 md:w-8 h-8 rounded-full bg-[#FAF6F0] flex items-center justify-center border border-[#B8860B]/18 shrink-0">
                      <Icon className="w-3.5 h-3.5 md:w-4 h-4 text-[#8B5A2B]" strokeWidth={1.8} />
                    </div>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }} className="text-[11.5px] md:text-[12.5px] text-[#1A1A1A] tracking-tight">
                      {title}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 md:w-4 h-4 text-[#8B5A2B]" strokeWidth={2.0} />
                </div>
              ))}
            </div>

            {/* Stats + Button Container */}
            <div className="w-full max-w-[390px] md:max-w-[680px] flex flex-col items-center">
              {/* Stats row */}
              <div className="w-full grid grid-cols-4 items-start mb-3.5 md:mb-5 relative">
                {[
                  { Icon: LaurelWreathStar, num: '15+', label: 'Years Experience', size: 23, tabSize: 26 },
                  { Icon: CustomCalendar, num: '1000+', label: 'Events', size: 19, tabSize: 22 },
                  { Icon: CustomUsers, num: '500+', label: 'Clients', size: 21, tabSize: 24 },
                  { Icon: CustomSupport, num: '24/7', label: 'Support', size: 19, tabSize: 22 },
                ].map(({ Icon, num, label, size, tabSize }, i, arr) => (
                  <div key={i} className="flex flex-col items-center text-center relative px-0.5 md:px-2">
                    {/* Circular icon container */}
                    <div className="w-[36px] md:w-[42px] h-[36px] md:h-[42px] rounded-full bg-[#FAF6F0]/80 flex items-center justify-center border border-[#B8860B]/15 shadow-sm mb-1.5">
                      <Icon className="text-[#8B5A2B] block md:hidden" size={size} />
                      <Icon className="text-[#8B5A2B] hidden md:block" size={tabSize} />
                    </div>
                    {/* Number */}
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }} className="text-[15px] md:text-[18px] text-[#1A1A1A] leading-none">
                      {num}
                    </span>
                    {/* Label */}
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }} className="text-[9.5px] md:text-[11px] text-gray-600 mt-1 uppercase tracking-tight leading-tight">
                      {label}
                    </span>
                    {/* Divider line */}
                    {i < arr.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 md:h-12 w-[1px] bg-[#B8860B]/40" />
                    )}
                  </div>
                ))}
              </div>
            </div>
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
