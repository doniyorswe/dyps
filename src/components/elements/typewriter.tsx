"use client"
import React, { JSX, useEffect, useRef, useState } from "react";

type TypewriterProps = {
  items: string[];
};

export default function Typewriter({ items }: TypewriterProps): JSX.Element {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!items.length) return;

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    const currentWord = items[index % items.length];

    if (!deleting && subIndex <= currentWord.length) {
      setText(currentWord.slice(0, subIndex));
      timeoutRef.current = window.setTimeout(
        () => setSubIndex((prev) => prev + 1),
        100
      );
    } else if (deleting && subIndex >= 0) {
      setText(currentWord.slice(0, subIndex));
      timeoutRef.current = window.setTimeout(
        () => setSubIndex((prev) => prev - 1),
        50
      );
    } else if (!deleting && subIndex > currentWord.length) {
      timeoutRef.current = window.setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && subIndex < 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % items.length);
      setSubIndex(0);
    }
  }, [subIndex, deleting, index, items]);

  return (
    <span className="inline-flex items-baseline">
      <span>{text}</span>
      <span className="ml-1 w-[0.1em] bg-current animate-[blink_1s_steps(2,start)_infinite]" />
    </span>
  );
}

