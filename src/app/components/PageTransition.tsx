"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
};

export default function PageTransition({
  children,
  className = "w-full h-full",
  duration = 0.45,
}: PageTransitionProps) {
  const pathname = usePathname();

  /* Content ONLY lifts up — never down */
  const contentVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Black flash / curtain */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + "-curtain"}
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "-100%"] }}
          transition={{
            duration: 0.9,
            ease: [0.77, 0, 0.175, 1], // smooth premium curve
          }}
          className="fixed inset-0 bg-black z-[9999] pointer-events-none"
        />
      </AnimatePresence>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname ?? "__fallback__"}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration,
            ease: "easeOut",
          }}
          className={className}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
