"use client";

import React from "react";
import { motion } from "framer-motion";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

export type Feature = {
  title: string;
};

export type Plan = {
  id: string;
  title: string;
  price: string;
  frequency?: string;
  highlights?: string[];
  features: Feature[];
  recommended?: boolean;
};

const plans: Plan[] = [
  {
    id: "basic",
    title: "Basic",
    price: "₹19,999",
    frequency: "one-time",
    highlights: ["Animated Frontend", "Admin Panel"],
    features: [
      { title: "Modern animated frontend website (responsive & interactive)" },
      { title: "Smooth UI/UX with motion effects" },
      { title: "SEO-friendly pages (Home, About, Services, Contact)" },
      { title: "Integrated Admin Panel (manage content easily)" },
      { title: "Free Hosting + Domain Setup Assistance" },
      { title: "Support for 1 Month" },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack",
    price: "₹39,999",
    frequency: "one-time",
    highlights: ["Auth System", "Database"],
    features: [
      { title: "Everything in Basic Plan" },
      { title: "Full-stack development with backend integration" },
      { title: "User authentication system (signup / login / sessions)" },
      { title: "Secure role-based access (Admin + Users)" },
      { title: "Database integration (MongoDB / PostgreSQL / Convex)" },
      { title: "Support for 3 Months" },
    ],
    recommended: true,
  },
  {
    id: "scalable",
    title: "Scalable",
    price: "₹59,999",
    frequency: "one-time",
    highlights: ["Payments", "Advanced Dashboard"],
    features: [
      { title: "Everything in Full Stack Plan" },
      { title: "Payment Gateway Integration (Stripe / Razorpay / PayPal)" },
      { title: "Subscription & Checkout Flow (one-time + recurring)" },
      {
        title: "Advanced Admin Dashboard (Analytics, User Management, Reports)",
      },
      { title: "Security best practices (rate-limiting, validation, HTTPS)" },
      { title: "Custom Feature Requests (based on business needs)" },
      { title: "Priority Support for 6 Months" },
    ],
  },
];

export default function Pricing() {
  const whatsappUrl = "https://wa.me/6398793554";

  return (
    <section className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Affordable Excellence, No Compromises"}
        title={"Pricing"}
        text={`Simple and transparent pricing for all businesses, with no hidden fees or surprises.`}
        textColor={"text-black"}
        withScrollTrigger={true}
      />

      <div className="px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              className={`relative flex flex-col justify-between rounded-2xl p-10 border shadow-sm hover:shadow-lg transition-all`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs">
                  Recommended
                </div>
              )}

              <header>
                <h3
                  id={`plan-${plan.id}`}
                  className="text-2xl font-light tracking-[0.2rem] uppercase"
                >
                  {plan.title}
                </h3>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  {plan.price}
                  {plan.frequency && (
                    <span className="text-sm uppercase tracking-[0.1rem] font-light ml-2">
                      {plan.frequency}
                    </span>
                  )}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {plan.highlights?.map((h) => (
                    <span
                      key={h}
                      className="text-sm px-4 py-1 bg-black text-white rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </header>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f.title}
                    className="flex items-center text-md text-gray-800 upper"
                  >
                    {f.title}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-2 py-4 text-sm md:text-lg uppercase tracking-[0.2rem] hover:shadow-2xl transition-all duration-200 rounded-full bg-black text-white hover:text-gray-100 font-medium focus:outline-none text-center"
                >
                  Book for Consultation
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
