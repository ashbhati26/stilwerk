import React, { useRef, useState } from "react";
import { socials } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<Array<HTMLDivElement | null>>([]);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const topLineRef = useRef<HTMLSpanElement | null>(null);
  const bottomLineRef = useRef<HTMLSpanElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const iconTl = useRef<gsap.core.Timeline | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useGSAP(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { xPercent: 100 });

    const fadeTargets = [...linksRef.current, contactRef.current].filter(
      Boolean
    ) as HTMLElement[];

    gsap.set(fadeTargets, { autoAlpha: 0, x: -20 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current.filter(Boolean) as HTMLElement[],
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current?.reverse();
      iconTl.current?.reverse();
    } else {
      tl.current?.play();
      iconTl.current?.play();
    }
    setIsOpen((v) => !v);
  };

  return (
    <>
      {/* Main Nav Menu */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-50 flex flex-col justify-between w-full h-screen px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2 overflow-y-scroll no-scrollbar"
      >
        <div className="flex flex-col text-5xl gap-y-2 md:text-6xl lg:text-8xl">
          {["home", "services", "about", "pricing", "work", "contact"].map(
            (section, index) => (
              <div
                key={index}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
              >
                {section === "pricing" ? (
                  <a
                    href="/pricing"
                    className="transition-all duration-300 cursor-pointer hover:text-white"
                  >
                    Pricing
                  </a>
                ) : section === "work" ? (
                  <a
                    href="/work"
                    className="transition-all duration-300 cursor-pointer hover:text-white"
                  >
                    Work
                  </a>
                ) : (
                  <Link
                    className="transition-all duration-300 cursor-pointer hover:text-white"
                    to={section}
                    smooth
                    offset={0}
                    duration={2000}
                  >
                    {section}
                  </Link>
                )}
              </div>
            )
          )}
        </div>

        {/* Contact & Socials */}
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-xl tracking-widest lowercase text-pretty">
              hello@stilwerk.in
            </p>
          </div>

          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Burger Button */}
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        />
      </div>
    </>
  );
};

export default Navbar;
