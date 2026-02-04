"use client";

import { useParams } from "next/navigation";
import { designPackages } from "@/constants/designs";
import DesignAccordion from "../../components/DesignAccordion";
import AnimatedHeaderSection from "@/app/components/AnimatedHeaderSection";

export default function DesignPackagePage() {
  const { packageId } = useParams();
  const selectedPackage = designPackages.find((pkg) => pkg.id === packageId);

  if (!selectedPackage) {
    return <div className="p-10">Design package not found</div>;
  }

  return (
    <section className="min-h-screen px-6 text-black">
      <AnimatedHeaderSection
        subTitle="Affordable Excellence, No Compromises"
        title={selectedPackage.title}
        text={selectedPackage.description}
        textColor="text-black"
        withScrollTrigger
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 pb-32 md:grid-cols-3">
        {/* Templates */}
        <div className="md:col-span-2">
          <DesignAccordion templates={selectedPackage.templates} />
        </div>

        {/* Price Card */}
        <div className="sticky top-24 h-fit rounded-3xl bg-[#ff758f] p-8">
          <div className="mb-4 text-sm font-medium text-black/60">
            Package Price
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-semibold">
              ₹{selectedPackage.price}
            </span>
            <span className="text-lg line-through text-black/40">
              ₹{selectedPackage.originalPrice}
            </span>
          </div>

          <p className="mt-4 text-sm text-black/70">
            One-time payment. Includes free future updates.
          </p>

          <a
            href={selectedPackage.razorpayLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block w-full rounded-full bg-black py-3 text-center text-sm font-medium text-white hover:bg-black/90 transition"
          >
            Purchase Package
          </a>

          <ul className="mt-8 space-y-3 text-sm text-black/80">
            <li>✓ {selectedPackage.includes.templates} Templates</li>
            <li>✓ {selectedPackage.includes.bonus} Bonus Packs</li>
            <li>✓ Lifetime Access</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
