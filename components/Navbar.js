"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-amber-200 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-900 hover:text-orange-600"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* पत्रिका का नाम - Center */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold tracking-wide text-gray-900 hover:text-orange-700 transition-colors"
        >
          माध्यम
        </Link>

        {/* सदस्यता - Right */}
        <Link
          href="/subscribe"
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium transition-colors text-sm"
        >
          सदस्यता
        </Link>
      </nav>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-amber-200 bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/latest"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              ताज़ा अंक
            </Link>
            <Link
              href="/issues"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              अंक
            </Link>
            <Link
              href="/stories"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              कहानी
            </Link>
            <Link
              href="/poems"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              कविता
            </Link>
            <Link
              href="/novel"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              उपन्यास
            </Link>
            <Link
              href="/criticism"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              आलोचना
            </Link>
            <Link
              href="/essays"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              निबंध
            </Link>
            <Link
              href="/interviews"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              साक्षात्कार
            </Link>
            <Link
              href="/reviews"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              पुस्तक समीक्षा
            </Link>
            <Link
              href="/events"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              आयोजन
            </Link>
            <Link
              href="/authors"
              className="text-gray-900 hover:text-orange-600 font-medium py-2"
            >
              लेखक
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
