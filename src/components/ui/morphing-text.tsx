import { cn } from "../../lib/utils";
import { useState, useEffect, useRef, useCallback } from "react";

interface MorphingTextProps {
  words: string[];
  className?: string;
  interval?: number;  // Pause between words in ms
  duration?: number;  // Morph transition duration in ms
}

export const MorphingText = ({
  words,
  className,
  interval = 3000,
  duration = 600,
}: MorphingTextProps) => {
  const [displayText, setDisplayText] = useState(words[0] || "");
  
  // All mutable state lives in refs — zero closure-staleness, zero lag
  const indexRef = useRef(0);
  const morphTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordsRef = useRef(words);
  wordsRef.current = words;

  const clearMorphTimer = useCallback(() => {
    if (morphTimerRef.current) {
      clearInterval(morphTimerRef.current);
      morphTimerRef.current = null;
    }
  }, []);

  const clearCycleTimer = useCallback(() => {
    if (cycleTimerRef.current) {
      clearTimeout(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  }, []);

  const startMorph = useCallback((fromWord: string, toWord: string, onDone: () => void) => {
    clearMorphTimer();
    const steps = 20;
    const stepMs = duration / steps;
    let step = 0;

    morphTimerRef.current = setInterval(() => {
      step++;
      const progress = step / steps;

      if (progress < 0.5) {
        const charCount = Math.floor(fromWord.length * (1 - progress * 2));
        setDisplayText(fromWord.slice(0, charCount));
      } else {
        const charCount = Math.ceil(toWord.length * ((progress - 0.5) * 2));
        setDisplayText(toWord.slice(0, Math.min(charCount, toWord.length)));
      }

      if (step >= steps) {
        clearMorphTimer();
        setDisplayText(toWord);
        onDone();
      }
    }, stepMs);
  }, [duration, clearMorphTimer]);

  const scheduleNext = useCallback(() => {
    clearCycleTimer();
    cycleTimerRef.current = setTimeout(() => {
      const list = wordsRef.current;
      const fromIdx = indexRef.current;
      const toIdx = (fromIdx + 1) % list.length;
      indexRef.current = toIdx;

      startMorph(list[fromIdx], list[toIdx], () => {
        scheduleNext();
      });
    }, interval);
  }, [interval, startMorph, clearCycleTimer]);

  useEffect(() => {
    // Start the first cycle
    scheduleNext();
    return () => {
      clearMorphTimer();
      clearCycleTimer();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative inline-block text-left", className)}>
      <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] via-[#FFF5D0] to-[#DAA520]">
        {displayText}
        <span className="inline-block w-0.5 h-[0.85em] bg-gradient-to-b from-[#DAA520] to-[#FFF5D0] animate-pulse ml-1 align-middle" />
      </span>
    </div>
  );
};
