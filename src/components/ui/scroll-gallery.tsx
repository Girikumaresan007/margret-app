import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1540039155733-d76e6d488311?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1533174000255-fa8ac34e6d7e?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1522158637959-30385a09e0aa?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1561489422-45de3d015e3e?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=1000"
];

export function ScrollGallery() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;

    const spacing = 0.1;
    const cards = gsap.utils.toArray(".card-item", container.current) as HTMLElement[];
    const seamlessLoop = buildSeamlessLoop(cards, spacing);
    
    const trigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=3000", // The scroll distance (3000px length)
      pin: true,
      animation: seamlessLoop,
      scrub: 1 // smooth scrubbing tied to scroll
    });

    function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
      const overlap = Math.ceil(1 / spacing);
      const startTime = items.length * spacing + 0.5;
      const loopTime = (items.length + overlap) * spacing + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true
        // repeat: -1 removed because we only want to scroll through once!
      });
      const l = items.length + overlap * 2;

      gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 }); 

      for (let i = 0; i < l; i++) {
        const index = i % items.length;
        const item = items[index];
        const time = i * spacing;
        rawSequence
          .fromTo(
            item,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false
            },
            time
          )
          .fromTo(
            item,
            { xPercent: 400 },
            { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
            time
          );
        if (i <= items.length) {
            seamlessLoop.add("label" + i, time);
        }
      }

      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none"
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none"
          }
        );
      return seamlessLoop;
    }

    return () => {
      trigger.kill();
    };
  }, { scope: container });

  return (
    <div id="portfolio" ref={container} className="relative w-full h-screen overflow-hidden bg-ink flex flex-col items-center justify-center z-10 py-10">
      {/* CTA Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-ink to-ink z-0 pointer-events-none" />
      
      {/* Optional decorative background elements */}
      <div className="absolute top-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none z-0" />
      
      {/* Fixed Layout to avoid overlap */}
      <div className="relative text-center z-50 w-full px-6 flex-shrink-0 mb-8 mt-4 md:mt-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
          <span className="text-white">Event</span> <span className="text-gold">Gallery</span>
        </h2>
        <div className="h-[2px] w-[60px] mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-4" />
        <p className="text-white tracking-widest text-sm uppercase">Scroll to explore our work</p>
      </div>

      <div className="relative flex-grow w-full flex items-center justify-center z-20 pb-16">
        <ul className="relative w-[18rem] h-[24rem] sm:w-[22rem] sm:h-[30rem] md:w-[24rem] md:h-[32rem] m-0 p-0">
          {images.map((imgUrl, i) => (
            <li
              key={i}
              className="card-item absolute left-0 top-0 w-full h-full list-none p-0 m-0 border-[4px] border-white/20 rounded-2xl bg-cover bg-center shadow-[0px_4px_30px_rgba(0,0,0,0.8)] hover:border-gold hover:shadow-[0px_8px_30px_rgba(218,165,32,0.4)] transition-colors duration-300"
              style={{ 
                  backgroundImage: `url(${imgUrl})`
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
