"use client";

import Link from "next/link";
import { designPackages } from "@/constants/designs";
import { motion } from "framer-motion";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

export default function DesignsPage() {
  return (
    <section className="min-h-screen px-6 text-black">
      <AnimatedHeaderSection
        subTitle={"Crafted for Real Products, Not Dribbble Shots"}
        title={"Design Packs"}
        text={`High-quality UI kits and website designs built for speed, scale, and real-world use.`}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      {/* Pricing Cards */}
      <div className="grid gap-10 md:grid-cols-3 py-24 max-w-6xl mx-auto">
        {designPackages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: i * 0.12,
              ease: "easeOut",
            }}
            className={`relative rounded-3xl p-10 flex flex-col justify-between shadow-sm
        ${pkg.highlight ? "bg-[#ff758f] scale-[1.03]" : "border"}
      `}
          >
            {/* Badge */}
            <span className="inline-flex w-fit mb-6 rounded-full border px-4 py-1 text-xs font-medium tracking-wide">
              {pkg.title.toUpperCase()}
            </span>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-semibold">₹{pkg.price}</span>
                <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-black/80">
                  Save {pkg.discountPercent}%
                </span>
              </div>

              <div className="mt-2 text-sm text-black/60 line-through">
                ₹{pkg.originalPrice}
              </div>
            </div>

            {/* Subtitle */}
            <p className="mb-8 text-sm text-black/70">{pkg.description}</p>

            {/* CTA */}
            <Link href={`/designs/${pkg.id}`}>
              <button
                className="mt-auto w-full rounded-full bg-black py-3 text-sm font-medium text-white
          hover:bg-black/90 transition-all"
              >
                View Designs
              </button>
            </Link>

            {/* Features */}
            <ul className="mt-8 space-y-3 text-sm text-black/80">
              <li>✓ {pkg.includes.templates} Templates</li>
              <li>✓ {pkg.includes.bonus} Bonus Pack</li>
              <li>✓ Free Updates</li>
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.section
        className="max-w-4xl mx-auto mb-8 text-sm text-black/70 border rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h3 className="mb-6 text-xl font-medium text-black">
          Product Use Guidelines & Disclaimer
        </h3>

        <p className="mb-6">
          We hope you find these design packs valuable. Before using them in
          your projects, please read the following carefully.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-black mb-1">
              Boilerplate / Starter Kit Usage
            </h4>
            <p>
              All design packs are provided as starter kits. They are intended
              to give you a strong foundation, not a finished production-ready
              product. You are expected to customize layouts, components,
              typography, spacing, and interactions to create a unique final
              result.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-black mb-1">
              Design Inspiration & Copyright
            </h4>
            <p>
              These design packs are created for educational and reference
              purposes and may draw inspiration from high-quality websites
              featured on platforms such as Awwwards. Stilwerk does not claim
              ownership of any third-party designs. Using these designs as-is
              for commercial deployment is strongly discouraged.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-black mb-1">
              Fonts & Third-Party Assets
            </h4>
            <p>
              Font files and assets may be included for preview and development
              purposes only. Stilwerk does not own or sell font licenses. If you
              plan to use any fonts or assets in personal or commercial
              projects, you are responsible for purchasing the appropriate
              licenses from the original creators.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-black mb-1">
              Responsibility & Usage
            </h4>
            <p>
              By purchasing and using these design packs, you acknowledge that
              you are responsible for proper usage, customization, and legal
              compliance. Stilwerk is not liable for misuse or copyright
              violations.
            </p>
          </div>
        </div>

        <p className="mt-8 font-medium text-black">
          Happy building — <span className="font-normal">Stilwerk</span> 💎
        </p>
      </motion.section>
    </section>
  );
}
