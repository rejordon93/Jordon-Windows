"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "@/images/window1.jpg";
import { motion } from "framer-motion";

export default function Header() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-20 py-16">
      {/* Left side (Text) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">
          Sit Back, Relax & Enjoy...
          <br />
          <span className="text-blue-600">
            We&apos;ve Got Your Cleaning Covered!
          </span>
        </h2>
        <h3 className="mt-6 text-lg md:text-xl text-gray-600">
          We provide professional residential window cleaning in the Greater
          Seattle Area.
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Get a Free Quote
        </motion.button>
      </motion.div>

      {/* Right side (Image with smooth load) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={loaded ? { opacity: 1, x: 0 } : {}} // only animate after load
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1"
      >
        <Image
          src={img}
          alt="Window cleaning"
          className="rounded-2xl shadow-lg object-cover w-full h-auto"
          onLoadingComplete={() => setLoaded(true)} // fade in after loaded
        />
      </motion.div>
    </section>
  );
}
