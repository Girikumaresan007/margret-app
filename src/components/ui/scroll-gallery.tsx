import { useEffect, useRef, useCallback, useState } from 'react';
import { Shuffle, Maximize2 } from 'lucide-react';

// Fisher-Yates shuffle helper
const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const SLIDES = [
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.00.12 PM (1).jpeg',
    label: 'KFest Annual Day',
    sub: '27th Annual Day Celebration — Full LED backdrop with dynamic lighting rig',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.00.12 PM (2).jpeg',
    label: 'BNI Awards Night',
    sub: 'Keerthi Awards — Curved LED wall with twin side screens & moving-head stage',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.00.13 PM.jpeg',
    label: 'School Annual Day',
    sub: 'Jegan Matha Matric — Multi-panel LED stage setup with floral decoration',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.00.13 PM (2).jpeg',
    label: 'SBI Seminar',
    sub: 'Digital NRI Account Launch — Wide LED screen with projection-ready stage',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.00.13 PM (3).jpeg',
    label: 'Concert Stage Setup',
    sub: 'Reality Lyrics Live — Immersive LED wall with orange flame beam lighting',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.01 PM.jpeg',
    label: 'Rotary Conference',
    sub: 'Rotary "Udayam" Core Team Intro — Grand ballroom LED wall & full PA system',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.01 PM (1).jpeg',
    label: 'St. James Academy',
    sub: '9th Annual Day Celebration — Outdoor night stage with LED screen & pro-audio',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.02 PM.jpeg',
    label: 'HP Product Launch',
    sub: 'AI-Powered Laptop Reveal — Corporate AV setup with dual display screens',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.02 PM (2).jpeg',
    label: 'Mi 5G Launch',
    sub: 'Xiaomi 2025 5G Smartphone — Cinematic LED reveal with ambient UV lighting',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.02 PM (3).jpeg',
    label: 'Pepsi Distributors Meet',
    sub: 'PepsiCo 2025 — Branded LED stage at Courtyard by Marriott, Tiruchirappalli',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.03 PM.jpeg',
    label: 'Wedding Stage Setup',
    sub: 'RS Wedding — LED arched backdrop with floral decor & professional lighting',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.03 PM (1).jpeg',
    label: 'Wedding LED Décor',
    sub: 'Royal Palace Theme — Multi-panel LED columns with floral arch & soft lighting',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.03 PM (2).jpeg',
    label: 'Silver Jubilee',
    sub: 'Montfort Brothers — 25th Silver Jubilee stage with LED wall & PA at CUBA',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-06 at 4.05.03 PM (3).jpeg',
    label: 'SZ Vengai Dealers Meet',
    sub: 'HP Dealers Meet, Trichy 2024 — LED main screen with portrait side panels',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-07 at 11.09.01 AM.jpeg',
    label: 'Live Concert Stage',
    sub: 'Immersive sound reinforcement and dynamic wash lighting for live band performance',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-07 at 11.10.23 AM.jpeg',
    label: 'Corporate Summit',
    sub: 'State-of-the-art presentation setup with dual-screen configurations and custom stage',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-07 at 11.11.08 AM.jpeg',
    label: 'Outdoor Festival',
    sub: 'Large scale open-air LED screen and line-array sound system installation',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-07 at 11.12.23 AM.jpeg',
    label: 'Award Ceremony Stage',
    sub: 'High-brightness backdrop LED walls with golden uplighting and custom trusses',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-07 at 11.13.32 AM.jpeg',
    label: 'Cultural Fest',
    sub: 'Dynamic stage backdrop and professional audio management for high-energy events',
  },
  {
    src: '/gallery/WhatsApp Image 2026-07-07 at 11.14.19 AM.jpeg',
    label: 'Grand Wedding Reception',
    sub: 'Elegant scenic design combining high-resolution LED screens with romantic lighting',
  },
];

const N = SLIDES.length;
const INTERVAL    = 5500;
const TRANSITION  = 650;
const Z_DEPTH     = 50;
const SCALE_DROP  = 0.10;
const BLUR_MAX    = 3;    // reduced — lighter GPU load
const BRIGHT_MIN  = 0.55;
const GAP         = 36;

const mod   = (i: number, m: number) => ((i % m) + m) % m;
const ease3 = (x: number) => 1 - Math.pow(1 - x, 3);

export function ScrollGallery() {
  const [slides, setSlides] = useState(() => shuffleArray(SLIDES));
  const [isShuffling, setIsShuffling] = useState(false);
  const rootRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef  = useRef<HTMLDivElement>(null);
  const barRef   = useRef<HTMLSpanElement>(null);

  const st = useRef({
    index: 0, pos: 0,
    slideW: 0, gap: GAP,
    dragging: false, pointerId: null as number | null,
    x0: 0, y0: 0, v: 0, t0: 0,
    animating: false, hovering: false,
    startTime: 0, pausedAt: 0,
    cycleRaf: 0,
    isScrolling: false,
    hasCapture: false,
    lightboxActive: false,
  });

  // 3-D card tilt state — matches the rotateToMouse snippet
  const card3d = useRef({ active: false, rotX: 0, rotY: 0, angle: 0, glowX: 0, glowY: 0 });

  const [lightbox, setLightbox] = useState<{ src: string; label: string; sub: string } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Pause/resume auto-scroll when lightbox is toggled
  useEffect(() => {
    const s = st.current;
    if (lightbox) {
      s.lightboxActive = true;
      s.pausedAt = performance.now();
      setImageLoaded(false);
    } else {
      s.lightboxActive = false;
      setImageLoaded(false);
      if (s.pausedAt) {
        s.startTime += performance.now() - s.pausedAt;
        s.pausedAt = 0;
      }
    }
  }, [lightbox]);

  /* ── helpers ─────────────────────────────────────────────── */
  const getSlides = () =>
    Array.from(trackRef.current?.querySelectorAll<HTMLElement>('.eg-slide') ?? []);
  const getDots   = () =>
    Array.from(dotsRef.current?.querySelectorAll<HTMLButtonElement>('.eg-dot') ?? []);

  const renderProgress = (p: number) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
  };

  const nearest = (from: number, target: number) => {
    let d = target - Math.round(from);
    if (d >  N / 2) d -= N;
    if (d < -N / 2) d += N;
    return Math.round(from) + d;
  };

  /* ── render frame ────────────────────────────────────────── */
  const render = useCallback((markActive = false) => {
    const s = st.current;
    const span = s.slideW + s.gap;
    const tiltY = parseFloat(rootRef.current?.style.getPropertyValue('--egTiltY') || '0');
    const tiltX = parseFloat(rootRef.current?.style.getPropertyValue('--egTiltX') || '0');

    getSlides().forEach((el, i) => {
      let d = i - s.pos;
      if (d >  N / 2) d -= N;
      if (d < -N / 2) d += N;

      const absD  = Math.abs(d);
      const tx    = d * span - s.slideW / 2;  // d=0 → perfectly centered
      const depth = -absD * Z_DEPTH;
      const scale = 1 - Math.min(absD * SCALE_DROP, 0.42);
      const blur  = Math.min(absD * BLUR_MAX, BLUR_MAX);
      const brightness = Math.max(BRIGHT_MIN, 1 - absD * (1 - BRIGHT_MIN));

      let transform = `translate3d(${tx}px,-50%,${depth}px) scale(${scale})`;
      // Apply 3D card tilt on top of carousel position when hovering active slide
      if (absD < 0.5 && card3d.current.active) {
        const c = card3d.current;
        transform += ` scale3d(1.06,1.06,1.06) rotate3d(${c.rotX.toFixed(3)},${c.rotY.toFixed(3)},0,${c.angle.toFixed(2)}deg)`;
      }
      el.style.transform = transform;
      // Always write filter — never toggle between '' and a value.
      // Toggling creates/destroys a stacking context which causes the visual 'click'.
      el.style.filter = `blur(${blur.toFixed(2)}px) brightness(${brightness.toFixed(2)})`;
      el.style.zIndex = String(Math.round(1000 - absD * 10));
      el.dataset.active = absD < 0.5 ? '1' : '0';

      // parallax — only near center
      if (absD < 1.5) {
        const parBase = Math.max(-1, Math.min(1, -d));
        const img = el.querySelector<HTMLElement>('.eg-img');
        if (img) {
          img.style.transform =
            `scale(1.18) translate3d(${(parBase * -40 + tiltY * -1.5).toFixed(1)}px,${(tiltX * 0.8).toFixed(1)}px,0)`;
        }
        const txt = el.querySelector<HTMLElement>('.eg-label');
        if (txt) {
          txt.style.transform = `translate3d(${(parBase * 14).toFixed(1)}px,0,0)`;
        }
      }
    });

    const active = mod(Math.round(s.pos), N);
    getDots().forEach((dot, i) =>
      dot.setAttribute('aria-selected', i === active ? 'true' : 'false'));
  }, []);

  /* ── goTo ────────────────────────────────────────────────── */
  const goTo = useCallback((i: number, animate = true) => {
    const s = st.current;
    const start = s.pos;
    const end   = nearest(start, i);
    const dur   = animate ? TRANSITION : 0;
    const t0    = performance.now();
    s.animating = true;

    const step = (now: number) => {
      const t = Math.min(1, dur ? (now - t0) / dur : 1);
      s.pos = start + (end - start) * ease3(t);
      render();
      if (t < 1) { requestAnimationFrame(step); return; }
      s.index     = mod(Math.round(s.pos), N);
      s.pos       = s.index;
      s.animating = false;
      s.startTime = performance.now();  // reset autoplay timer for new slide
      render(true);
      renderProgress(0);
    };
    requestAnimationFrame(step);
  }, [render]);

  const prev = useCallback(() => goTo(mod(st.current.index - 1, N)), [goTo]);
  const next = useCallback(() => goTo(mod(st.current.index + 1, N)), [goTo]);

  const shuffle = useCallback(() => {
    if (isShuffling) return;
    setIsShuffling(true);
    const shuffled = shuffleArray(slides);
    
    // Reset index & pos to 0
    st.current.index = 0;
    st.current.pos = 0;
    st.current.startTime = performance.now();
    
    setSlides(shuffled);
    
    setTimeout(() => {
      setIsShuffling(false);
    }, 650);
  }, [slides, isShuffling]);

  useEffect(() => {
    render(true);
  }, [slides, render]);

  /* ── measure ─────────────────────────────────────────────── */
  const measure = useCallback(() => {
    // Use window.innerWidth so slideW matches CSS `min(960px, 78vw)` exactly
    st.current.slideW = Math.min(960, window.innerWidth * 0.78);
    st.current.gap    = GAP;
  }, []);

  /* ── mount ────────────────────────────────────────────────── */
  useEffect(() => {
    measure();
    // Synchronous initial render — no rAF delay, no flash
    const s = st.current;
    s.pos = 0; s.index = 0;
    s.startTime = performance.now();
    render(true);

    // Auto-advance loop — fires every INTERVAL ms, skips during drag/animation/lightbox
    const loop = (now: number) => {
      const s = st.current;
      if (!s.dragging && !s.animating && !s.lightboxActive) {
        const elapsed = now - s.startTime;
        renderProgress(Math.min(1, elapsed / INTERVAL));
        if (elapsed >= INTERVAL) next();
      }
      s.cycleRaf = requestAnimationFrame(loop);
    };
    st.current.cycleRaf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => { measure(); render(); });
    if (rootRef.current) ro.observe(rootRef.current);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { prev(); st.current.startTime = performance.now(); }
      if (e.key === 'ArrowRight') { next(); st.current.startTime = performance.now(); }
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(st.current.cycleRaf);
      ro.disconnect();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  /* ── pointer handlers ────────────────────────────────────── */
  const onPD = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const s = st.current;
    s.dragging = true;
    s.isScrolling = false;
    s.hasCapture = false;
    s.pointerId = e.pointerId;
    s.x0 = e.clientX;
    s.y0 = e.clientY;
    s.t0 = performance.now();
    s.v = 0;
    s.pausedAt = performance.now(); // pause timer while dragging
    if (e.pointerType === 'mouse') {
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        s.hasCapture = true;
      } catch {}
    }
  };
  const onPM = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging || e.pointerId !== s.pointerId) return;
    if (s.isScrolling) return;

    const dx = e.clientX - s.x0;
    const dy = e.clientY - s.y0;

    // For touch devices, check if we're scrolling vertically or dragging horizontally
    if (e.pointerType === 'touch' && !s.isScrolling && !s.hasCapture) {
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (absY > absX && absY > 8) {
        // It's a vertical scroll! Cancel drag and let browser scroll.
        s.isScrolling = true;
        s.dragging = false;
        if (s.pausedAt) { s.startTime += performance.now() - s.pausedAt; s.pausedAt = 0; }
        return;
      } else if (absX > absY && absX > 8) {
        // It's a horizontal swipe! Capture the pointer and handle it.
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          s.hasCapture = true;
        } catch {}
      } else {
        // Still below threshold, do nothing yet
        return;
      }
    }

    s.v   = dx / Math.max(16, performance.now() - s.t0);
    // drag offset uses full span so dragging feels proportional
    s.pos = mod(s.index - dx / (s.slideW + s.gap), N);
    render();
    // tilt from mouse
    const r = rootRef.current?.getBoundingClientRect();
    if (r) {
      const mx = (e.clientX - r.left) / r.width  - 0.5;
      const my = (e.clientY - r.top)  / r.height - 0.5;
      rootRef.current!.style.setProperty('--egTiltX', (my * -5).toFixed(3));
      rootRef.current!.style.setProperty('--egTiltY', (mx *  5).toFixed(3));
    }
  };
  const onPU = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging || e.pointerId !== s.pointerId) return;
    if (s.isScrolling) return;

    const threshold = e.pointerType === 'touch' ? 12 : 6;
    const wasDrag = Math.abs(e.clientX - s.x0) > threshold;
    s.dragging = false;
    if (s.hasCapture) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      s.hasCapture = false;
    }
    s.pointerId = null;
    // Resume timer — add back the paused duration so progress continues smoothly
    if (s.pausedAt) { s.startTime += performance.now() - s.pausedAt; s.pausedAt = 0; }
    const target  = Math.round(s.pos - Math.sign(s.v) * (Math.abs(s.v) > 0.18 ? 0.5 : 0));
    const snapped = mod(target, N);
    if (!wasDrag && snapped === s.index) {
      setLightbox(slides[s.index]);
      return;
    }
    goTo(snapped);
  };
  const onMM = (e: React.MouseEvent) => {
    if (st.current.dragging) return;
    const r = rootRef.current?.getBoundingClientRect();
    if (!r) return;
    const mx = (e.clientX - r.left) / r.width  - 0.5;
    const my = (e.clientY - r.top)  / r.height - 0.5;
    rootRef.current!.style.setProperty('--egTiltX', (my * -5).toFixed(3));
    rootRef.current!.style.setProperty('--egTiltY', (mx *  5).toFixed(3));

    // 3-D card effect on active (center) slide
    const s = st.current;
    const activeSlide = getSlides()[s.index];
    if (activeSlide) {
      const b = activeSlide.getBoundingClientRect();
      const leftX  = e.clientX - b.left;
      const topY   = e.clientY - b.top;
      const centerX = leftX - b.width  / 2;
      const centerY = topY  - b.height / 2;
      const inside = leftX >= 0 && leftX <= b.width && topY >= 0 && topY <= b.height;
      if (inside) {
        const distance = Math.sqrt(centerX ** 2 + centerY ** 2);
        card3d.current = {
          active: true,
          rotX:  centerY / 100,
          rotY: -centerX / 100,
          angle: Math.log(distance + 1) * 2,
          glowX: centerX * 2 + b.width  / 2,
          glowY: centerY * 2 + b.height / 2,
        };
      } else {
        card3d.current.active = false;
      }
    }
    render();
  };
  const onLeave = () => {
    card3d.current.active = false;
    rootRef.current?.style.setProperty('--egTiltX', '0');
    rootRef.current?.style.setProperty('--egTiltY', '0');
    render();
  };

  /* ── JSX ─────────────────────────────────────────────────── */
  return (
    <div id="portfolio" className="relative bg-ink overflow-hidden select-none" style={{ touchAction: 'pan-y' }}>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex flex-col items-center justify-center max-w-[92vw] max-h-[78vh] min-h-[300px] min-w-[300px]"
            onClick={e => e.stopPropagation()}
          >
            {/* Elegant Loader (shows while image is loading) */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
                <span className="text-white/40 text-xs tracking-wider uppercase">Loading Image...</span>
              </div>
            )}
            <img
              src={lightbox.src}
              alt={lightbox.label}
              onLoad={() => setImageLoaded(true)}
              className="max-w-[92vw] max-h-[78vh] object-contain rounded-2xl shadow-2xl transition-all duration-700 ease-out"
              style={{
                boxShadow: '0 0 80px rgba(218,165,32,0.15)',
                opacity: imageLoaded ? 1 : 0,
                transform: imageLoaded ? 'scale(1)' : 'scale(0.97)',
              }}
              draggable={false}
            />
          </div>
          
          <div 
            className="mt-6 text-center px-6 max-w-2xl transition-opacity duration-500 ease-out"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-[#DAA520] font-bold tracking-[0.2em] uppercase text-sm md:text-base">
              {lightbox.label}
            </p>
            <p className="text-white/70 text-xs md:text-sm mt-2 font-light">
              {lightbox.sub}
            </p>
          </div>

          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white text-3xl transition-all duration-300 hover:bg-white/10 active:scale-90"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)' }}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Ambient glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-ink to-ink pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Heading */}
      <div className="relative z-10 text-center pt-16 pb-6 px-6 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="text-white">Event </span>
          <span className="text-gold">Gallery</span>
        </h2>
        <div className="h-[2px] w-[60px] mx-auto mt-3 mb-3 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="text-white/50 text-sm tracking-widest uppercase mb-1">
          Drag · Swipe · Tap to expand
        </p>
        <button
          onClick={shuffle}
          disabled={isShuffling}
          className="mt-2.5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-gold/15 border border-white/10 hover:border-gold/30 text-white/80 hover:text-gold transition-all duration-300 text-xs font-bold uppercase tracking-wider group shadow-md"
        >
          <Shuffle size={14} className={`group-hover:rotate-180 transition-transform duration-500 ${isShuffling ? 'animate-spin' : ''}`} />
          Shuffle Gallery
        </button>
      </div>

      {/* Carousel area */}
      <div
        ref={rootRef}
        className="relative z-10"
        style={{ height: 'clamp(380px, 66vh, 620px)' }}
        onMouseLeave={onLeave}
        onMouseMove={onMM}
      >
        {/* 3-D track */}
        <div
          ref={trackRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          onPointerDown={onPD}
          onPointerMove={onPM}
          onPointerUp={onPU}
          onPointerCancel={onPU}
        >
          {slides.map((sl, i) => (
            <div
              key={sl.src}
              className={`eg-slide absolute left-1/2 ${isShuffling ? 'shuffling-active' : ''}`}
              data-active="0"
              style={{
                top: '50%',
                width: 'min(960px,78vw)',
                height: 'clamp(320px,56vh,560px)',
                borderRadius: '20px',
                overflow: 'hidden',
                willChange: 'transform, filter',  // GPU-promote both
                boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
            >
              {/* Image */}
              <img
                className="eg-img absolute inset-[-4%] w-[108%] h-[108%] object-cover"
                src={sl.src}
                alt={sl.label}
                draggable={false}
                style={{
                  transition: 'transform 600ms cubic-bezier(0.25,0.8,0.25,1)',
                  filter: 'contrast(1.05) saturate(1.12)',
                  transformOrigin: 'center',
                  willChange: 'transform',
                }}
              />

              {/* Expand Button in Corner */}
              <button
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox(sl);
                }}
                className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full flex items-center justify-center bg-black/45 hover:bg-gold text-white hover:text-black border border-white/10 hover:border-gold transition-all duration-300 backdrop-blur-md active:scale-90 shadow-lg cursor-pointer"
                title="Expand image"
              >
                <Maximize2 size={18} />
              </button>

              {/* Bottom gradient */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 38%, transparent 62%)' }} />

              {/* Label */}
              <div
                className="eg-label absolute bottom-0 left-0 right-0 z-10 px-5 py-4"
                style={{ willChange: 'transform', transition: 'transform 400ms cubic-bezier(0.25,0.8,0.25,1)' }}
              >
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase mb-1"
                  style={{ color: '#DAA520' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DAA520] inline-block" />
                  {sl.label}
                </span>
                <p className="text-white/85 text-sm leading-snug font-light" style={{ textShadow: '0 1px 8px rgba(0,0,0,1)' }}>
                  {sl.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3 z-20">
          {[prev, next].map((fn, idx) => (
            <button
              key={idx}
              onClick={fn}
              aria-label={idx === 0 ? 'Previous' : 'Next'}
              className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center text-white text-xl cursor-pointer transition-all hover:bg-white/20 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {idx === 0 ? '‹' : '›'}
            </button>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div ref={dotsRef} className="relative z-10 flex justify-center gap-2 pt-5 pb-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className="eg-dot w-2 h-2 rounded-full border-0 cursor-pointer transition-all duration-200"
            aria-selected={i === 0 ? 'true' : 'false'}
            onClick={() => goTo(i)}
            style={{ background: 'rgba(255,255,255,0.22)' }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="relative z-10 text-center pb-10">
        <span className="text-white/30 text-xs tracking-widest font-mono">
          01 — {String(N).padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar — shows autoplay countdown */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] z-20 overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}>
        <span
          ref={barRef}
          className="block h-full w-full origin-left"
          style={{ transform: 'scaleX(0)', background: 'linear-gradient(90deg,#B8860B,#DAA520)', willChange: 'transform' }}
        />
      </div>

      {/* Dot active + active slide styles */}
      <style>{`
        .eg-dot[aria-selected="true"] {
          background: linear-gradient(180deg, #DAA520, #B8860B) !important;
          transform: scale(1.5);
        }
        .eg-slide[data-active="1"] {
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 2px rgba(218,165,32,0.5) inset !important;
        }
        .eg-slide[data-active="0"] {
          box-shadow: 0 16px 40px rgba(0,0,0,0.4) !important;
        }
        .shuffling-active {
          transition: transform 650ms cubic-bezier(0.25, 1, 0.25, 1), filter 650ms ease, opacity 650ms ease !important;
        }
      `}</style>
    </div>
  );
}
