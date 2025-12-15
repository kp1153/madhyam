import { client } from "@/sanity/lib/client";
import Image from "next/image";

async function getAllIssues() {
  const query = `*[_type == "issue"] | order(publishedAt desc) {
    _id,
    issueNumber,
    year,
    month,
    "coverImageUrl": coverImage.asset->url,
    "pdfUrl": pdfFile.asset->url,
    description,
    publishedAt,
    isCurrent
  }`;

  return await client.fetch(query);
}

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

export default async function ArchivesPage() {
  const issues = await getAllIssues();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">पुराने अंक</h1>
          <p className="text-gray-600">
            माध्यम पत्रिका के सभी अंक यहाँ उपलब्ध हैं
          </p>
        </div>

        {/* Issues Grid */}
        {issues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Cover Image */}
                <div className="relative h-80 bg-gray-100">
                  {issue.coverImageUrl ? (
                    <Image
                      src={issue.coverImageUrl}
                      alt={`अंक ${issue.issueNumber}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      📄
                    </div>
                  )}
                  {issue.isCurrent && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      नवीनतम
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    अंक {issue.issueNumber}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {monthMap[issue.month]} {issue.year}
                  </p>

                  {issue.description && (
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {issue.description}
                    </p>
                  )}

                  {/* Download Button */}
                  <a
                    href={issue.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    📥 डाउनलोड करें
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">कोई अंक उपलब्ध नहीं है</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-orange-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            माध्यम पत्रिका
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            हिन्दी साहित्य सम्मेलन, प्रयाग द्वारा प्रकाशित शोध एवं साहित्यिक
            पत्रिका। सभी अंक निःशुल्क डाउनलोड के लिए उपलब्ध हैं।
          </p>
        </div>
      </div>
    </div>
  );
}