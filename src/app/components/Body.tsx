"use client";
import React from "react";
import Image from "next/image";
import img from "@/images/gutters.jpg";
import img2 from "@/images/roofmoss.jpg";
import { motion } from "framer-motion";

export default function Body() {
  return (
    <section className="px-6 md:px-20 py-16 space-y-20">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
          Throughout the{" "}
          <span className="text-blue-600">Greater Seattle Area</span>,
          Professional Window Cleaning brightens up your home and business.
        </h2>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Our professional window cleaners specialize in cleaning windows with
          the speed and care they deserve. Once you have your windows cleaned,
          you’ll wonder why you waited so long.
        </p>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-blue-600">Jordon Windows</span>?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At our company, we specialize in providing top-notch residential
            window cleaning and pressure washing services. With a team of highly
            skilled professionals, we deliver results that leave homes sparkling
            and well-maintained.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Whether it&apos;s removing dirt, grime, or stubborn stains from your
            windows or revitalizing your home exterior with pressure washing, we
            exceed expectations. Our eco-friendly solutions, attention to
            detail, and 18+ years of experience make us Seattle&apos;s trusted
            choice.
          </p>

          {/* Guarantee badges */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Image
              src="https://seattlesqueegeepros.com/wp-content/uploads/2023/08/Untitled-1.png"
              alt="Satisfaction Guarantee"
              width={120}
              height={120}
              className="object-contain"
            />

            <Image
              src="https://seattlesqueegeepros.com/wp-content/uploads/2023/08/licensed-insured-dark-bg-small.png"
              alt="Licensed and Insured"
              width={120}
              height={120}
              className="object-contain"
            />
            <Image
              src="https://seattlesqueegeepros.com/wp-content/uploads/2023/08/Layer-2.png"
              alt="WCRA"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>
        </div>

        {/* Image grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          <Image
            src={img}
            alt="Gutter cleaning"
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
          <Image
            src={img2}
            alt="Roof moss cleaning"
            className="rounded-xl shadow-lg object-cover w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
