"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Services() {
  const serviceList = [
    {
      title: "Pressure Washing",
      text: "You deserve a service that won’t put your routine at a standstill. Our team delivers a full range of exterior cleaning solutions.",
      img: "https://seattlesqueegeepros.com/wp-content/uploads/2023/07/Untitled-2-1.png",
    },
    {
      title: "Window Cleaning",
      text: "Our professional window cleaners specialize in cleaning windows in the greater Seattle area with speed and care.",
      img: "https://seattlesqueegeepros.com/wp-content/uploads/2023/07/Untitled-1-1.png",
    },
    {
      title: "Gutter Cleaning",
      text: "Our professionals deliver a thorough service to protect your investment.",
      img: "https://seattlesqueegeepros.com/wp-content/uploads/2023/07/Untitled-3.png",
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Our Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {serviceList.map((service, idx) => (
          <motion.div
            key={service.title}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={service.img}
              alt={service.title}
              width={120}
              height={120}
              className="object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
