import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

async function getAllClassicAuthors() {
  const query = `*[_type == "classicAuthor"] | order(order asc, name asc) {
    _id,
    name,
    slug,
    "photoUrl": photo.asset->url,
    birthYear,
    deathYear,
    birthPlace,
    bio
  }`;

  return await client.fetch(query);
}

export default async function AuthorsPage() {
  const authors = await getAllClassicAuthors();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">हमारे लेखक</h1>
          <p className="text-gray-600">
            हिन्दी साहित्य के महान रचनाकारों से परिचय
          </p>
        </div>

        {/* Authors Grid */}
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link
                key={author._id}
                href={`/authors/${author.slug.current}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Photo */}
                <div className="relative h-80 bg-gray-100">
                  {author.photoUrl ? (
                    <Image
                      src={author.photoUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                      👤
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {author.name}
                  </h2>

                  {/* Birth-Death Years */}
                  <p className="text-gray-600 mb-4">
                    {author.birthYear && `${author.birthYear}`}
                    {author.deathYear && ` - ${author.deathYear}`}
                  </p>

                  {/* Birth Place */}
                  {author.birthPlace && (
                    <p className="text-sm text-gray-500 mb-4">
                      📍 {author.birthPlace}
                    </p>
                  )}

                  {/* Bio Preview */}
                  {author.bio && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {author.bio}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="text-orange-600 font-semibold hover:text-orange-700 transition-colors">
                    रचनाएँ पढ़ें →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">कोई लेखक उपलब्ध नहीं है</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-orange-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            हिन्दी साहित्य की धरोहर
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            इन महान लेखकों की रचनाएँ हिन्दी साहित्य की अमूल्य निधि हैं। उनके
            विचारों और कृतियों से परिचित होकर हम अपनी साहित्यिक विरासत को समृद्ध
            कर सकते हैं।
          </p>
        </div>
      </div>
    </div>
  );
}
