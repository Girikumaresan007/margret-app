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

const STAGGER = 0.024; // seconds between letters
const LINE_GAP = 0.12;  // brief pause between lines

type CharItem = { char: string; gold: boolean; delay: number; isFirst: boolean };
type WordItem = { chars: CharItem[] };

function buildLinesToWords(): [WordItem[], WordItem[]] {
  let d = 0;

  const parseSegs = (segs: typeof LINE1_SEGS, isLine2 = false) => {
    const words: WordItem[] = [];
    let currentWord: CharItem[] = [];

    for (const seg of segs) {
      for (let i = 0; i < seg.text.length; i++) {
        const char = seg.text[i];

        if (char === ' ') {
          if (currentWord.length > 0) {
            words.push({ chars: currentWord });
            currentWord = [];
          }
        } else {
          currentWord.push({
            char,
            gold: seg.gold,
            delay: d,
            isFirst: !isLine2 && d === 0
          });
          d += STAGGER;
        }
      }
    }

    if (currentWord.length > 0) {
      words.push({ chars: currentWord });
    }

    return words;
  };

  const l1 = parseSegs(LINE1_SEGS, false);
  d += LINE_GAP;
  const l2 = parseSegs(LINE2_SEGS, true);

  return [l1, l2];
}

const [LINE1_WORDS, LINE2_WORDS] = buildLinesToWords();

// Calculate morph delay
const lastWord = LINE2_WORDS[LINE2_WORDS.length - 1];
const lastChar = lastWord ? lastWord.chars[lastWord.chars.length - 1] : null;
const MORPH_DELAY = lastChar ? lastChar.delay + 0.15 : 1.1;

function Char({ item, running }: { item: CharItem; running: boolean }) {
  const shadow = '0 2px 10px rgba(0,0,0,0.7)';

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
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.3] px-2 select-none text-center max-w-full mx-auto"
      style={{ perspective: '700px' }}
    >
      {/* Line 1 — Professional LED & Audio Visual */}
      <span className="block text-center flex flex-wrap justify-center items-center gap-y-1">
        <span className="whitespace-nowrap inline-block">
          {LINE1_WORDS.slice(0, 1).map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.chars.map((charItem, charIdx) => (
                <Char key={charIdx} item={charItem} running={running} />
              ))}
              <span className="inline-block" style={{ width: '0.28em' }}>&nbsp;</span>
            </span>
          ))}
        </span>
        <span className="whitespace-nowrap inline-block">
          {LINE1_WORDS.slice(1).map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.chars.map((charItem, charIdx) => (
                <Char key={charIdx} item={charItem} running={running} />
              ))}
              {wordIdx < LINE1_WORDS.slice(1).length - 1 && (
                <span className="inline-block" style={{ width: '0.28em' }}>&nbsp;</span>
              )}
            </span>
          ))}
        </span>
      </span>

      {/* Line 2 — Solution for Every [Morphing Word] */}
      <span className="block text-center mt-1 sm:mt-2 flex flex-wrap justify-center items-center sm:translate-x-4 md:translate-x-5 lg:translate-x-6">
        <span className="whitespace-nowrap inline-block">
          {LINE2_WORDS.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.chars.map((charItem, charIdx) => (
                <Char key={charIdx} item={charItem} running={running} />
              ))}
              <span className="inline-block" style={{ width: '0.28em' }}>&nbsp;</span>
            </span>
          ))}
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
            className="inline-flex text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold select-none py-0 px-1 w-[10ch] justify-center sm:justify-start text-center sm:text-left"
          />
        </motion.span>
      </span>
    </h1>
  );
}
