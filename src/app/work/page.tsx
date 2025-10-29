"use client";
import React, { useRef, useState, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { projects as allProjects } from "@/constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type Framework = { id: string | number; name: string };
type Project = {
  id: string | number;
  name: string;
  bgImage: string;
  image: string;
  frameworks: Framework[];
  href: string;
  categories?: string[];
};

const FILTERS = ["All", "Design", "Development"] as const;
type Filter = typeof FILTERS[number];

const listVariants = {
  enter: {
    transition: {
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 16, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.995 },
};

const Works: React.FC = () => {
  const overlayRefs = useRef<Array<HTMLDivElement | null>>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter>("All");

  const text = `Featured projects that have been meticulously
    crafted with passion to drive
    results and impact.`;

  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const moveX = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const moveY = useRef<((value: number) => gsap.core.Tween) | null>(null);

  // Filtered list (memoized)
  const projects = useMemo(() => {
    if (selectedFilter === "All") return allProjects as Project[];
    return (allProjects as Project[]).filter((p) =>
      (p.categories ?? []).includes(selectedFilter)
    );
  }, [selectedFilter]);

  useGSAP(() => {
    if (previewRef.current) {
      moveX.current = gsap.quickTo(previewRef.current, "x", {
        duration: 1.2,
        ease: "power3.out",
      });
      moveY.current = gsap.quickTo(previewRef.current, "y", {
        duration: 1.6,
        ease: "power3.out",
      });
    }

    gsap.from(".works-header", {
      y: 80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".works-header",
        start: "top 90%",
      } as ScrollTrigger.Vars,
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el || !previewRef.current) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el || !previewRef.current) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current?.(mouse.current.x);
    moveY.current?.(mouse.current.y);
  };

  return (
    <section id="work" className="flex flex-col min-h-screen mb-8">
      <div className="works-header">
        <AnimatedHeaderSection
          subTitle={"Logic meets Aesthetics, Seamlessly"}
          title={"Works"}
          text={text}
          textColor={"text-black"}
          withScrollTrigger={true}
        />
      </div>

      <div className="px-6 md:px-8">
        {/* FILTERS */}
        <div className="flex gap-3 items-center mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === f
                  ? "bg-black text-white shadow-lg"
                  : "border border-black text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative flex flex-col font-light min-h-screen"
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            variants={listVariants}
            initial="exit"
            animate="enter"
            exit="exit"
            className="flex flex-col gap-4"
          >
            {(projects as Project[]).map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: index * 0.02,
                }}
                className="project-item relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <Link href={project.href} target="_blank" className="block w-full">
                  {/* overlay */}
                  <div
                    ref={(el) => {
                      overlayRefs.current[index] = el;
                    }}
                    className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
                  />

                  {/* title */}
                  <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-white">
                    <h2 className="lg:text-[32px] text-[26px] leading-none">
                      {project.name}
                    </h2>
                    <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
                  </div>

                  {/* divider */}
                  <div className="w-full h-0.5 bg-black/80" />

                  {/* framework */}
                  <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
                    {project.frameworks.map((framework) => (
                      <p
                        key={framework.id}
                        className="text-black transition-colors duration-500 md:group-hover:text-white"
                      >
                        {framework.name}
                      </p>
                    ))}
                  </div>

                  {/* mobile preview image */}
                  <div className="relative flex items-center justify-center px-10 md:hidden h-[400px]">
                    <img
                      src={project.bgImage}
                      alt={`${project.name}-bg-image`}
                      className="object-cover w-full h-full rounded-md brightness-50"
                    />
                    <img
                      src={project.image}
                      alt={`${project.name}-image`}
                      className="absolute bg-center px-14 rounded-xl"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* desktop Floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[960px] md:block hidden opacity-0"
        >
          {currentIndex !== null && projects[currentIndex] && (
            <img
              src={projects[currentIndex].image}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
