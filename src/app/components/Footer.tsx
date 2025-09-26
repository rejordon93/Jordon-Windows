"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="container mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Jordon Windows</h2>
          <p className="text-gray-400">
            Professional window cleaning, pressure washing, and gutter cleaning
            services in the Greater Seattle Area. Trusted, insured, and
            reliable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-500 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-500 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact</h3>
          <p className="text-gray-400">Email: info@jordonswindows.com</p>
          <p className="text-gray-400">Phone: (555) 123-4567</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Jordon Windows. All rights reserved.
      </div>
    </footer>
  );
}
