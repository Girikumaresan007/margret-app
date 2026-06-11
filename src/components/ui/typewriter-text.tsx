import { useEffect, useState } from "react";

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
  startDelay?: number; // Initial delay in milliseconds before typing starts
  started?: boolean;    // Dynamic control to start the typing effect
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
  startDelay = 0,
  started: startedProp,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
  const [started, setStarted] = useState(startedProp !== undefined ? startedProp : startDelay === 0);

  // Sync with startedProp if provided
  useEffect(() => {
    if (startedProp !== undefined) {
      setStarted(startedProp);
    }
  }, [startedProp]);

  // Handle start delay if startedProp is not defined
  useEffect(() => {
    if (startedProp === undefined && startDelay > 0) {
      const timer = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(timer);
    }
  }, [startDelay, startedProp]);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText || !started) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
    started,
  ]);

  return (
    <span className={className}>
      {displayText}
      {started && <span className="animate-pulse">{cursor}</span>}
    </span>
  );
}
