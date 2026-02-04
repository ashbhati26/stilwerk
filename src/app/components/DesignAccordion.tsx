"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type DesignTemplate = {
  id: string;
  name: string;
  videoUrl: string;
};

export default function DesignAccordion({
  templates,
}: {
  templates: DesignTemplate[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {templates.map((tpl) => {
        const isOpen = openId === tpl.id;

        return (
          <div
            key={tpl.id}
            className="border-b p-4"
          >
            {/* Header */}
            <button
              onClick={() => setOpenId(isOpen ? null : tpl.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-lg font-medium">
                {tpl.name}
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-2xl leading-none text-black/60"
              >
                +
              </motion.span>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 12 }}
                    animate={{ y: 0 }}
                    exit={{ y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6"
                  >
                    <video
                      src={tpl.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full rounded-xl"
                    />

                    <button
                      disabled
                      className="mt-6 rounded-full border border-black/30 px-6 py-2 text-sm opacity-50 cursor-not-allowed"
                    >
                      Download Source Code
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
