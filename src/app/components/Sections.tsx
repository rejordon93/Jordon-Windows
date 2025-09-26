"use client";
import React from "react";
import Image from "next/image";
import home from "@/images/home.jpg"; // your local background image
import { motion } from "framer-motion";

export default function Sections() {
  return (
    <div className="space-y-20">
      {/* Guarantee Badge / CTA Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0">
          <Image
            src={home}
            alt="Background - Window Cleaning"
            fill
            priority
            className="object-cover brightness-75"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl px-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Guarantee Badge <br />
            Welcome to Seattle&apos;s best Window & Pressure Washing Company
          </h2>
          <strong className="block text-lg md:text-xl">
            where we guarantee 100% customer satisfaction!
          </strong>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg font-semibold transition">
            Get an Instant Quote Now!
          </button>
        </motion.div>
      </section>
    </div>
  );
}
