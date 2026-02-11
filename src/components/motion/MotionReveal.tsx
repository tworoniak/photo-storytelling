import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  /** use smaller values for subtle movement */
  y?: number;
  /** delay in seconds (ex: 0.05, 0.1) */
  delay?: number;
};

export default function MotionReveal({ children, y = 16, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
