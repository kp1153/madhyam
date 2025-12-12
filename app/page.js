import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";

const query = `{
  "featured": *[_type == "article" && featured == true][0]{
    title,
    "slug": slug.current,
    "image": coverImage.asset->url,
    excerpt,
    "category": category->slug.current
  },
  "sections": {
    "stories": *[_type == "article" && category->slug.current == "stories"] | order(publishedAt desc)[0...3]{
      title,
      "slug": slug.current,
      "image": coverImage.asset->url,
      "author": author->name
    },
    "poems": *[_type == "article" && category->slug.current == "poems"] | order(publishedAt desc)[0...3]{
      title,
      "slug": slug.current,
      "image": coverImage.asset->url,
      "author": author->name
    },
    "criticism": *[_type == "article" && category->slug.current == "criticism"] | order(publishedAt desc)[0...3]{
      title,
      "slug": slug.current,
      "image": coverImage.asset->url,
      "author": author->name
    },
    "essays": *[_type == "article" && category->slug.current == "essays"] | order(publishedAt desc)[0...3]{
      title,
      "slug": slug.current,
      "image": coverImage.asset->url,
      "author": author->name
    }
  }
}`;

export default async function HomePage() {
  const data = await client.fetch(query);
  const { featured, sections } = data;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {featured && (
        <section className="mb-20 border-b border-gray-200 pb-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-wide text-orange-600 font-medium">
                विशेष
              </p>
              <h1 className="text-5xl font-serif leading-tight text-gray-900">
                {featured.title}
              </h1>
              {featured.excerpt && (
                <p className="text-xl text-gray-700 leading-relaxed">
                  {featured.excerpt}
                </p>
              )}
              <Link
                href={`/${featured.category}/${featured.slug}`}
                className="inline-block text-orange-700 font-medium hover:underline"
              >
                पूरा लेख पढ़ें →
              </Link>
            </div>
            {featured.image && (
              <Image
                src={featured.image}
                alt={featured.title}
                width={600}
                height={450}
                className="w-full aspect-[4/3] object-cover rounded"
              />
            )}
          </div>
        </section>
      )}

      <Section title="कहानी" link="/stories" items={sections.stories} />
      <Section title="कविता" link="/poems" items={sections.poems} />
      <Section title="आलोचना" link="/criticism" items={sections.criticism} />
      <Section title="निबंध" link="/essays" items={sections.essays} />
    </main>
  );
}

function Section({ title, link, items }) {
  if (!items?.length) return null;

  return (
    <section className="mb-16 pb-12 border-b border-gray-100">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-2xl font-serif text-gray-900">{title}</h2>
        <Link href={link} className="text-sm text-orange-700 hover:underline">
          सभी देखें →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link key={item.slug} href={`${link}/${item.slug}`} className="group">
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={267}
                className="w-full aspect-[3/2] object-cover rounded mb-3"
              />
            )}
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-700 leading-snug">
              {item.title}
            </h3>
            {item.author && (
              <p className="text-sm text-gray-600 mt-1">{item.author}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
