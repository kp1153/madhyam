import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getAuthorBySlug(slug) {
  const query = `*[_type == "classicAuthor" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    "photoUrl": photo.asset->url,
    birthYear,
    deathYear,
    birthPlace,
    bio,
    works[] {
      title,
      type,
      content,
      "imageUrl": image.asset->url
    }
  }`;

  return await client.fetch(query, { slug });
}

const workTypeMap = {
  poem: "कविता",
  story: "कहानी",
  novel: "उपन्यास",
  essay: "निबंध",
  drama: "नाटक",
  criticism: "आलोचना",
};

export default async function AuthorDetailPage({ params }) {
  const resolvedParams = await params;
  const author = await getAuthorBySlug(resolvedParams.slug);

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/authors"
          className="inline-block mb-8 text-orange-600 hover:text-orange-700 font-semibold"
        >
          ← सभी लेखक
        </Link>

        {/* Author Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Photo */}
            <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
              {author.photoUrl ? (
                <Image
                  src={author.photoUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-8xl">
                  👤
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {author.name}
              </h1>

              <div className="space-y-2 mb-6">
                {author.birthYear && (
                  <p className="text-xl text-gray-700">
                    जन्म: {author.birthYear}
                    {author.deathYear && ` — निधन: ${author.deathYear}`}
                  </p>
                )}

                {author.birthPlace && (
                  <p className="text-gray-600">📍 {author.birthPlace}</p>
                )}
              </div>

              {author.bio && (
                <div className="prose prose-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    परिचय:
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {author.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Works Section */}
        {author.works && author.works.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              रचनाएँ
            </h2>

            <div className="space-y-8">
              {author.works.map((work, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow"
                >
                  {/* Work Header */}
                  <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {work.title}
                      </h3>
                      {work.type && (
                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {workTypeMap[work.type] || work.type}
                        </span>
                      )}
                    </div>

                    {work.imageUrl && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden hidden md:block">
                        <Image
                          src={work.imageUrl}
                          alt={work.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Work Content */}
                  {work.content && (
                    <div className="prose prose-lg max-w-none text-gray-700">
                      <PortableText value={work.content} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(!author.works || author.works.length === 0) && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-xl">
              इस लेखक की रचनाएँ जल्द ही उपलब्ध होंगी
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
