import React, { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { servicesData } from "@/constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type ServiceItem = { title: string };
type Service = {
  title: string;
  description: string;
  items: ServiceItem[];
};

const Services: React.FC = () => {
  const text = `We build secure, high-performance apps with smooth 
  UX—driving growth, not headaches.`;

  // refs for sticky containers
  const serviceRefs = useRef<Array<HTMLDivElement | null>>([]);

  const isDesktop = useMediaQuery({ minWidth: 768 });

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      // IMPORTANT: animate INNER element, NOT sticky container
      const inner = el.querySelector(".service-inner");

      if (!inner) return;

      gsap.from(inner, {
        y: 200,
        opacity: 0,
        clearProps: "transform",
        duration: 1,
        ease: "circ.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <section
      id="services"
      className="bg-black min-h-[200vh] rounded-t-4xl"
    >
      <AnimatedHeaderSection
        subTitle="Behind the scene, Beyond the screen"
        title="Service"
        text={text}
        textColor="text-white"
        withScrollTrigger
      />

      <div className="relative">
        {(servicesData as Service[]).map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              serviceRefs.current[index] = el;
            }}
            className="sticky z-10 px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
            style={{
              top: isDesktop ? "10vh" : "0px",
            }}
          >
            {/* INNER WRAPPER FOR GSAP */}
            <div className="service-inner">
              <div className="flex items-center justify-between gap-4 font-light">
                <div className="flex flex-col gap-6">
                  <h2 className="text-4xl lg:text-5xl">
                    {service.title}
                  </h2>

                  <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-white/60">
                    {service.description}
                  </p>

                  <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-white/80">
                    {service.items.map((item, itemIndex) => (
                      <div key={`item-${index}-${itemIndex}`}>
                        <h3 className="flex">
                          <span className="mr-12 text-lg text-white/30">
                            0{itemIndex + 1}
                          </span>
                          {item.title}
                        </h3>

                        {itemIndex < service.items.length - 1 && (
                          <div className="w-full h-px my-2 bg-white/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
