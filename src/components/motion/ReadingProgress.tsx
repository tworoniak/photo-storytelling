import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsVisible(v > 0.02);
  });

  return (
    <motion.div
      className="bg-primary/80 fixed top-0 left-0 z-50 h-1 w-full origin-left"
      style={{ scaleX: scrollYProgress }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}
