"use client";
import { useState } from "react";
import certificates from "../../constants/certificates.json";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { motion, AnimatePresence } from "framer-motion";

type Certificate = {
  certificateNo: string;
  name: string;
  course: string;
  duration: string;
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

export default function VerifyCertificate() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState("");

  const handleVerify = () => {
    const found = (certificates as Certificate[]).find(
      (c) => c.certificateNo.toLowerCase() === input.toLowerCase()
    );

    if (found) {
      setResult(found);
      setError("");
    } else {
      setResult(null);
      setError("Certificate not found");
    }
  };

  const text = `Verify your certificate instantly.
Just enter your certificate ID below.`;

  return (
    <section className="flex flex-col min-h-screen">
      {/* Header like Works page */}
      <div className="works-header">
        <AnimatedHeaderSection
          subTitle={"Authenticity, Instantly"}
          title={"Certifications"}
          text={text}
          textColor={"text-black"}
          withScrollTrigger={true}
        />
      </div>

      {/* Main Content */}
      <div className="flex justify-center h-screen py-24 px-6 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={result ? "result" : "form"}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-xl border border-black rounded-2xl p-8"
          >
            {/* Input */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Certificate Number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border border-black px-4 py-3 text-lg outline-none focus:ring-0"
              />

              <button
                onClick={handleVerify}
                className="bg-black text-white py-3 text-lg transition-all hover:tracking-wider"
              >
                Verify
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-center mt-4 font-medium text-red-600">
                {error}
              </p>
            )}

            {/* Result */}
            {result && (
              <div className="mt-8 border-t border-black pt-6 space-y-3 text-lg">
                <p>
                  <span className="font-medium">Certificate ID:</span>{" "}
                  {result.certificateNo}
                </p>
                <p>
                  <span className="font-medium">Name:</span> {result.name}
                </p>
                <p>
                  <span className="font-medium">Role:</span> {result.course}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {result.duration}
                </p>
                <p className="font-semibold text-green-600 mt-4">
                  ✓ Certificate Verified
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
