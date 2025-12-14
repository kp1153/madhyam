import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full border-t-2 border-orange-600 mt-16"
      style={{ background: "rgba(243, 162, 45, 1)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-10 text-center text-gray-900">
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
            className="underline hover:text-gray-700"
          >
            www.web-developer-kp.com
          </Link>
        </p>

        {/* कॉपीराइट */}
        <p className="mt-4 text-xs text-gray-800">
          © {new Date().getFullYear()} हिन्दी साहित्य सम्मेलन, प्रयाग —
          सर्वाधिकार सुरक्षित
        </p>
      </div>
    </footer>
  );
}
