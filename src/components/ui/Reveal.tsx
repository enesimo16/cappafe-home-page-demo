"use client";

import { motion } from "framer-motion";
import { useRevealTransition } from "@/hooks/useReveal";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const anim = useRevealTransition(delay);
  return (
    <motion.div className={className} {...anim}>
      {children}
    </motion.div>
  );
}
