"use client";

import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.7, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function KineticText({ text, delayOffset = 0 }: { text: string; delayOffset?: number }) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span className="flex flex-wrap gap-x-[0.28em]">
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block pb-1">
          <motion.span
            custom={i + delayOffset}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
