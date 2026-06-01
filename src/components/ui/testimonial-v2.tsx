import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Sun, Moon } from 'lucide-react';
import { Star } from "lucide-react";

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Margret AV completely elevated our annual corporate gala. The P3.9 LED walls were breathtakingly sharp and their technical team executed flawlessly.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Director of Events",
  },
  {
    text: "The high-end audio setups and custom light mapping made our global product launch look incredibly premium. The visual clarity was spectacular.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "Production Lead",
  },
  {
    text: "Their technical engineers are exceptional, guiding us through pre-production and handling on-site coordination with total professionalism.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Technical Coordinator",
  },
  {
    text: "Our outdoor music festival was transformed by their massive LED panel rigging. Pristine sound coverage and zero latency.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "Festival Organizer",
  },
  {
    text: "Flawless live stage delivery, high-quality audio equipment, and unparalleled technical expertise. Easily the finest AV agency around.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Executive Producer",
  },
  {
    text: "The stage lighting mapping and crystal-clear digital screens exceeded our expectations. Our guest speakers were blown away by the look.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Gala Chairperson",
  },
  {
    text: "From massive modular LED background setups to intimate sound projection, they provide consistent, world-class production value.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a visual production masterpiece that completely matched our vision. Safe rigging, high contrast ratio screens, and great service.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Agency Manager",
  },
  {
    text: "The modular screen segments are incredibly vibrant and bright even in daylight. Outstanding service and prompt technical troubleshooting.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Creative Director",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  columnIndex: number;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}) => {
  return (
    <div className={props.className}>
      <ul
        style={{
          animation: `scroll-vertical ${props.duration || 10}s linear infinite`,
          animationPlayState: props.activeId ? "paused" : "running",
          willChange: "transform",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => {
                const cardId = `col-${props.columnIndex}-copy-${index}-item-${i}`;
                const isSelected = props.activeId === cardId;
                const isOtherSelected = props.activeId !== null && !isSelected;

                return (
                  <motion.li 
                    key={cardId}
                    aria-hidden={index === 1 ? "true" : "false"}
                    tabIndex={index === 1 ? -1 : 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      props.setActiveId(isSelected ? null : cardId);
                    }}
                    animate={{
                      scale: isSelected ? 1.08 : isOtherSelected ? 0.95 : 1,
                      opacity: isOtherSelected ? 0.4 : 1,
                      zIndex: isSelected ? 50 : 1,
                    }}
                    whileHover={!props.activeId ? { 
                      scale: 1.03,
                      y: -8,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12)",
                    } : {}}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`p-6 rounded-2xl border border-black/5 max-w-xs w-full bg-white relative cursor-pointer md:cursor-pointer touch-manipulation shadow-sm transition-shadow duration-300 ${isSelected ? "shadow-2xl ring-2 ring-gold border-transparent" : ""}`}
                  >
                    <blockquote className="m-0 p-0 pointer-events-none">
                      <p className="text-gray-500 text-lg leading-relaxed font-medium m-0">
                        <span className="text-gold text-2xl font-bold mr-1">“</span>
                        {text}
                        <span className="text-gold text-2xl font-bold ml-1">”</span>
                      </p>
                      <footer className="flex items-start gap-4 mt-6">
                        <img
                          width={48}
                          height={48}
                          src={image}
                          alt={`Avatar of ${name}`}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/20 shrink-0"
                        />
                        <div className="flex flex-col pt-1">
                          <cite className="font-bold not-italic tracking-tight text-ink text-base">
                            {name}
                          </cite>
                          <span className="text-sm tracking-tight text-ink/70 mt-0.5">
                            {role}
                          </span>
                          <div className="flex gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, stIndex) => (
                              <Star key={stIndex} size={14} className="text-gold fill-gold" />
                            ))}
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </motion.li>
                );
              })}
            </React.Fragment>
          )),
        ]}
      </ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-[#F2EDE2] py-24 relative overflow-hidden"
      onClick={() => setActiveId(null)}
    >
      <style>{`
        @keyframes scroll-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>

      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto relative"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16 relative z-30 pointer-events-none">
          <h2 className="text-4xl md:text-5xl font-bold text-ink">
            Client <span className="text-gold">Stories</span>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "60px", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[2px] mx-auto my-3 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#B8860B] to-[#F5F2ED]"
          />
          <p className="text-gray-600 mt-4 text-center">
            Discover how thousands of teams streamline their operations with our platform.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} columnIndex={1} activeId={activeId} setActiveId={setActiveId} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} columnIndex={2} activeId={activeId} setActiveId={setActiveId} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} columnIndex={3} activeId={activeId} setActiveId={setActiveId} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="w-screen min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300 flex flex-col justify-center relative selection:bg-primary selection:text-white">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 shadow-xl hover:scale-110 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <TestimonialsSection />
    </div>
  );
}
