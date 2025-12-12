import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";

const categoryNames = {
  stories: "कहानी",
  poems: "कविता",
  novel: "उपन्यास",
  criticism: "आलोचना",
  essays: "निबंध",
  interviews: "साक्षात्कार",
  reviews: "पुस्तक समीक्षा",
  events: "आयोजन",
};

export default async function ListingPage({ params }) {
  const { category } = params;

  const query = `*[_type == "article" && category->slug.current == "${category}"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "image": coverImage.asset->url,
    excerpt,
    "author": author->name,
    publishedAt
  }`;

  const articles = await client.fetch(query);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-12 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-serif text-gray-900">
          {categoryNames[category]}
        </h1>
      </header>

      <div className="space-y-12">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="grid md:grid-cols-3 gap-8 pb-12 border-b border-gray-100"
          >
            {article.image && (
              <Image
                src={article.image}
                alt={article.title}
                width={400}
                height={300}
                className="w-full aspect-[4/3] object-cover rounded"
              />
            )}

            <div className="md:col-span-2 space-y-3">
              <Link href={`/${category}/${article.slug}`} className="group">
                <h2 className="text-2xl font-serif text-gray-900 group-hover:text-orange-700 leading-snug">
                  {article.title}
                </h2>
              </Link>

              {article.excerpt && (
                <p className="text-gray-700 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-600">
                {article.author && <span>{article.author}</span>}
                {article.publishedAt && (
                  <>
                    <span>•</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "hi-IN"
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
