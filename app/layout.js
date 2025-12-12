import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata
export const metadata = {
  title: "माध्यम — हिन्दी साहित्यिक एवं शोध पत्रिका",
  description:
    "माध्यम — हिन्दी साहित्य सम्मेलन, प्रयाग की प्रतिष्ठित साहित्यिक एवं शोध पत्रिका। कविता, कहानी, आलोचना, उपन्यास, वैचारिकी और साहित्यिक गतिविधियों का प्रामाणिक संग्रह।",
  keywords: [
    "माध्यम पत्रिका",
    "हिन्दी साहित्य सम्मेलन प्रयाग",
    "हिन्दी साहित्यिक पत्रिका",
    "आलोचना",
    "कविता",
    "उपन्यास",
    "वैचारिकी",
    "शोध पत्रिका",
  ],
  authors: [{ name: "Hindi Sahitya Sammelan, Prayag" }],
  creator: "Hindi Sahitya Sammelan, Prayag",
  publisher: "Hindi Sahitya Sammelan, Prayag",
  metadataBase: new URL("https://www.web-developer-kp.com/"),
  openGraph: {
    title: "माध्यम — हिन्दी साहित्यिक पत्रिका",
    description:
      "कविता, कहानी, आलोचना, वैचारिकी, उपन्यास और साहित्यिक शोध का विश्वसनीय मंच।",
    type: "website",
    url: "https://www.web-developer-kp.com/",
    locale: "hi_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
