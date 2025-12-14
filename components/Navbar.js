"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: "होम", href: "/" },
    { title: "वर्तमान अंक", href: "/current-issue" },
    { title: "पुराने अंक", href: "/archives" },
    { title: "आयोजन", href: "/events" },
    { title: "हमारे लेखक", href: "/authors" },
    {
      title: "हिंदी साहित्य सम्मेलन",
      href: "/hindi-sahitya-sammelan",
    },
    { title: "माध्यम पत्रिका", href: "/about" },
  ];

  return (
    <header
      className="w-full border-b-2 border-orange-600 shadow-xl"
      style={{ background: "rgba(243, 162, 45, 1)" }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-900 hover:text-gray-700 transition-colors z-50 lg:hidden"
          aria-label="Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* पत्रिका का नाम - Center */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold tracking-widest text-gray-900 hover:scale-105 transition-transform duration-300"
        >
          माध्यम
        </Link>
      </nav>

      {/* Desktop Menu - Hidden on Mobile */}
      <div
        className="hidden lg:block border-t border-orange-700 backdrop-blur-sm"
        style={{ background: "rgba(243, 162, 45, 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-gray-900 hover:text-gray-700 hover:bg-orange-300 rounded-md font-medium transition-all duration-200 text-sm"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          className="lg:hidden border-t-2 border-orange-600 shadow-2xl"
          style={{ background: "rgba(243, 162, 45, 1)" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-900 hover:text-gray-700 hover:bg-orange-300 font-semibold py-3 px-4 rounded-lg transition-all duration-200 border border-transparent hover:border-orange-600"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
