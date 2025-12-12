import Image from "next/image";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export default async function DetailPage({ params }) {
  const { category, slug } = params;

  const query = `*[_type == "article" && slug.current == "${slug}"][0]{
    title,
    "image": coverImage.asset->url,
    content,
    "author": author->{name, bio, "photo": photo.asset->url},
    "categoryName": category->title,
    publishedAt
  }`;

  const article = await client.fetch(query);

  if (!article) return <div>लेख नहीं मिला</div>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-12 space-y-6">
        <p className="text-sm uppercase tracking-wide text-orange-600 font-medium">
          {article.categoryName}
        </p>

        <h1 className="text-5xl font-serif leading-tight text-gray-900">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-600">
          {article.author?.name && (
            <span className="font-medium">{article.author.name}</span>
          )}
          {article.publishedAt && (
            <>
              <span>•</span>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("hi-IN")}
              </span>
            </>
          )}
        </div>
      </header>

      {article.image && (
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={450}
          className="w-full aspect-video object-cover rounded mb-12"
        />
      )}

      <article className="prose prose-lg prose-gray max-w-none">
        {article.content && <PortableText value={article.content} />}
      </article>

      {article.author && (
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex gap-6">
            {article.author.photo && (
              <Image
                src={article.author.photo}
                alt={article.author.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {article.author.name}
              </h3>
              {article.author.bio && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {article.author.bio}
                </p>
              )}
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}
