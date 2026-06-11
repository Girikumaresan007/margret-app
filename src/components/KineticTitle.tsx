import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { MorphingText } from './ui/morphing-text';

const LINE1_SEGS = [
  { text: 'Professional ', gold: false },
  { text: 'LED & Audio Visual', gold: true },
];
const LINE2_SEGS = [
  { text: 'Solution for Every', gold: false },
];

const STAGGER = 0.024; // seconds between letters — fast, snappy
const LINE_GAP = 0.12;  // brief pause between the two lines

type CharItem = { char: string; gold: boolean; delay: number; isFirst: boolean };

function buildLines(): [CharItem[], CharItem[]] {
  let d = 0;
  const l1: CharItem[] = [];
  for (const seg of LINE1_SEGS) {
    for (const char of seg.text) {
      l1.push({ char, gold: seg.gold, delay: d, isFirst: d === 0 });
      d += STAGGER;
    }
  }
  d += LINE_GAP;
  const l2: CharItem[] = [];
  for (const seg of LINE2_SEGS) {
    for (const char of seg.text) {
      l2.push({ char, gold: seg.gold, delay: d, isFirst: false });
      d += STAGGER;
    }
  }
  return [l1, l2];
}

const [LINE1, LINE2] = buildLines();

// Calculate when the text morph should fade in
// LINE2 finishes stagger around: last delay (which is around 1.1s to 1.2s)
const MORPH_DELAY = LINE2.length > 0 ? LINE2[LINE2.length - 1].delay + 0.15 : 1.1;

function Char({ item, running }: { item: CharItem; running: boolean }) {
  const shadow = '0 2px 10px rgba(0,0,0,0.7)';

  if (item.char === ' ') {
    return <span className="inline-block" style={{ width: '0.28em' }} aria-hidden="true" />;
  }

  if (item.isFirst) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 2.4, filter: 'blur(14px)' }}
        animate={running ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.70, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block text-gray-50"
        style={{ transformOrigin: 'bottom center', textShadow: shadow }}
      >
        {item.char}
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 26, rotateX: -38, scale: 0.84 }}
      animate={running ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
      transition={{ duration: 0.38, delay: item.delay, ease: [0.34, 1.5, 0.64, 1] }}
      className={`inline-block ${item.gold ? 'text-[#DAA520] font-extrabold' : 'text-gray-50'}`}
      style={{
        transformOrigin: 'bottom center',
        textShadow: shadow
      }}
    >
      {item.char}
    </motion.span>
  );
}

export default function KineticTitle() {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const run = () => setRunning(true);

    if ((window as any).__splashPlayed) {
      setTimeout(run, 200);
      return;
    }

    const onDone = () => setTimeout(run, 130);
    window.addEventListener('splashComplete', onDone, { once: true });
    const fallback = setTimeout(() => {
      window.removeEventListener('splashComplete', onDone);
      run();
    }, 5000);

    return () => {
      window.removeEventListener('splashComplete', onDone);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <h1
      className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold leading-[1.2] px-2 select-none mx-auto w-fit text-left mr-8 sm:mr-14 md:mr-24"
      style={{ perspective: '700px' }}
    >
      {/* Line 1 — Professional LED & Audio Visual */}
      <span className="block text-left">
        {LINE1.map((item, i) => <Char key={i} item={item} running={running} />)}
      </span>

      {/* Line 2 — Solution for Every [Morphing Word] */}
      <span className="block text-left mt-1 sm:mt-2 pl-6 sm:pl-8 md:pl-16">
        <span className="inline-flex items-center justify-start flex-wrap">
          <span className="inline-block">
            {LINE2.map((item, i) => <Char key={i} item={item} running={running} />)}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={running ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: MORPH_DELAY, ease: "easeOut" }}
            className="inline-block"
          >
            <MorphingText
              words={["Events", "Functions", "Festivals"]}
              duration={500}
              className="inline-flex text-3xl sm:text-4xl md:text-6xl font-display font-extrabold select-none py-0 px-1 ml-1.5 sm:ml-2 md:ml-2.5 min-w-[200px] sm:min-w-[250px] md:min-w-[440px] text-left"
            />
          </motion.span>
        </span>
      </span>
    </h1>
  );
}
