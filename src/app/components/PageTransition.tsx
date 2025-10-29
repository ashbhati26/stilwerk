"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type PageTransitionProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offsetY?: number;
};

export default function PageTransition({
  children,
  className = "w-full h-full",
  duration = 0.45,
  offsetY = 20,
}: PageTransitionProps) {
  const pathname = usePathname();

  const contentVariants = {
    initial: { opacity: 0, y: offsetY, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -offsetY, scale: 0.995 },
  };

  const transition = { duration, ease: "easeInOut" } as const;

  return (
    <div className="relative overflow-hidden">
      {/* Black curtain animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname + "-curtain"}
          initial={{ y: "-100%" }}
          animate={{ y: ["-100%", "0%", "-100%"] }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="fixed top-0 left-0 w-full h-full bg-black z-[9999] pointer-events-none"
        />
      </AnimatePresence>

      {/* Page content transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname ?? "__fallback__"}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          transition={transition}
          className={className}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
