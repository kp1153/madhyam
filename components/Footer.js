import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-[#f3e7d9] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-slate-800">
        {/* संस्था का नाम */}
        <h2 className="text-xl font-bold tracking-wide">
          हिन्दी साहित्य सम्मेलन, प्रयाग
        </h2>

        {/* पता */}
        <p className="mt-1 text-sm">१२१, सम्मेलन मार्ग, प्रयागराज – ३</p>

        {/* पत्रिका का नाम */}
        <p className="mt-4 text-lg font-semibold">
          माध्यम — शोध एवं साहित्यिक पत्रिका
        </p>

        {/* डेवलपर क्रेडिट */}
        <p className="mt-6 text-sm">
          Web Developer:{" "}
          <Link
            href="https://www.web-developer-kp.com/"
            target="_blank"
            className="underline"
          >
            www.web-developer-kp.com
          </Link>
        </p>

        {/* कॉपीराइट */}
        <p className="mt-4 text-xs text-slate-700">
          © {new Date().getFullYear()} हिन्दी साहित्य सम्मेलन, प्रयाग —
          सर्वाधिकार सुरक्षित
        </p>
      </div>
    </footer>
  );
}
