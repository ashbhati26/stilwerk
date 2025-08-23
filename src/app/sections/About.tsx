import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const text = `Design with purpose
  We craft animated, responsive, conversion-focused websites
  From concept to launch — and beyond`;

  const aboutText = `We’re a design-led web studio building premium, interactive experiences that move people and metrics. 
  From strategy and UX to pixel-perfect UI and motion, we ship sites that are fast, accessible, and effortless to use.
  Expect thoughtful storytelling, smooth micro-interactions, and performance that scores — without sacrificing brand.`;

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      } as ScrollTrigger.Vars,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Design with purpose, built to perform"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;
