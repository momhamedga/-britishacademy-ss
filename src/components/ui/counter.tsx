
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
export default function Counter({ value, direction = "up" }: { value: string, direction?: "up" | "down" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[,+]/g, ""), 10);
  const motionValue = useMotionValue(direction === "down" ? numericValue : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [motionValue, isInView, numericValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.floor(latest));
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
}