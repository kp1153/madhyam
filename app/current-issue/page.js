import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/* Fetch current issue */
async function getCurrentIssue() {
  const query = `*[_type == "issue" && isCurrent == true][0]{
    _id,
    issueNumber,
    year,
    month,
    coverImage,
    pdfUrl,
    description,
    publishedAt
  }`;

  return client.fetch(query);
}

/* Month map */
const monthMap = {
  january: "जनवरी",
  february: "फरवरी",
  march: "मार्च",
  april: "अप्रैल",
  may: "मई",
  june: "जून",
  july: "जुलाई",
  august: "अगस्त",
  september: "सितंबर",
  october: "अक्टूबर",
  november: "नवंबर",
  december: "दिसंबर",
};

function getHindiMonth(month) {
  if (!month) return "";
  return monthMap[String(month).toLowerCase()] ?? month;
}

export default async function CurrentIssuePage() {
  const issue = await getCurrentIssue();

  if (!issue) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">वर्तमान अंक</h1>
          <p className="text-gray-600">
            अंक {issue.issueNumber} — {getHindiMonth(issue.month)} {issue.year}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Cover Image */}
            <div className="relative h-[500px] md:h-[600px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              {issue.coverImage ? (
                <Image
                  src={issue.coverImage} // 👈 direct Cloudinary URL
                  alt={`अंक ${issue.issueNumber}`}
                  fill
                  priority
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-6xl">
                  📄
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  अंक {issue.issueNumber}
                </h2>

                <p className="text-xl text-gray-700 mb-6">
                  {getHindiMonth(issue.month)} {issue.year}
                </p>

                {issue.description && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      इस अंक में
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {issue.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="space-y-4">
                {issue.pdfUrl && (
                  <a
                    href={issue.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-4 px-6 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                  >
                    PDF डाउनलोड करें
                  </a>
                )}

                <Link
                  href="/archives"
                  className="block w-full bg-gray-100 text-gray-800 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  पुराने अंक देखें
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Published Date */}
        {issue.publishedAt && (
          <div className="mt-8 text-center text-sm text-gray-500">
            प्रकाशन तिथि:{" "}
            {new Date(issue.publishedAt).toLocaleDateString("hi-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}
      </div>
    </div>
  );
}
