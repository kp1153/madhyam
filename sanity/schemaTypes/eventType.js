import { defineField, defineType } from "sanity";

function hindiToRoman(input) {
  if (!input) return "";

  const consonants = {
    क: "k",
    ख: "kh",
    ग: "g",
    घ: "gh",
    ङ: "ng",
    च: "ch",
    छ: "chh",
    ज: "j",
    झ: "jh",
    ञ: "ny",
    ट: "t",
    ठ: "th",
    ड: "d",
    ढ: "dh",
    ण: "n",
    त: "t",
    थ: "th",
    द: "d",
    ध: "dh",
    न: "n",
    प: "p",
    फ: "ph",
    ब: "b",
    भ: "bh",
    म: "m",
    य: "y",
    र: "r",
    ल: "l",
    व: "v",
    ळ: "l",
    श: "sh",
    ष: "sh",
    स: "s",
    ह: "h",
    क्ष: "ksh",
    त्र: "tr",
    ज्ञ: "gya",
  };

  const vowels = {
    अ: "a",
    आ: "aa",
    इ: "i",
    ई: "ee",
    उ: "u",
    ऊ: "oo",
    ऋ: "ri",
    ए: "e",
    ऐ: "ai",
    ओ: "o",
    औ: "au",
  };

  const matras = {
    "ा": "aa",
    "ि": "i",
    "ी": "ee",
    "ु": "u",
    "ू": "oo",
    "ृ": "ri",
    "े": "e",
    "ै": "ai",
    "ो": "o",
    "ौ": "au",
  };

  const specials = {
    "ं": "n",
    "ः": "h",
    "ँ": "n",
    "्": "",
  };

  const cleaned = input
    .trim()
    .replace(/[।!?,.]/g, "")
    .replace(/[\u0964\u0965]/g, "")
    .replace(/\s+/g, " ");

  const words = cleaned.split(" ");
  const transliteratedWords = [];

  for (let word of words) {
    word = word.trim();
    if (!word) continue;

    let result = "";
    let i = 0;

    while (i < word.length) {
      const char = word[i];
      const nextChar = word[i + 1];
      const twoChar = char + nextChar;

      if (consonants[twoChar]) {
        result += consonants[twoChar];
        i += 2;
        continue;
      }

      if (vowels[char]) {
        result += vowels[char];
        i++;
        continue;
      }

      if (consonants[char]) {
        result += consonants[char];

        if (matras[nextChar]) {
          result += matras[nextChar];
          i += 2;
          continue;
        } else if (nextChar === "्") {
          i += 2;
          continue;
        } else if (nextChar && !consonants[nextChar] && !vowels[nextChar]) {
          i++;
          continue;
        } else {
          result += "a";
          i++;
          continue;
        }
      }

      if (specials[char] !== undefined) {
        result += specials[char];
        i++;
        continue;
      }

      if (/[a-zA-Z0-9]/.test(char)) {
        result += char.toLowerCase();
        i++;
        continue;
      }

      i++;
    }

    if (result) {
      transliteratedWords.push(result);
    }
  }

  return transliteratedWords.join("-");
}

export default defineType({
  name: "event",
  title: "आयोजन",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "आयोजन का नाम",
      type: "string",
      validation: (Rule) => Rule.required().error("आयोजन का नाम आवश्यक है"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => {
          const romanized = hindiToRoman(input);
          const timePart = new Date()
            .toISOString()
            .replace(/[-:.TZ]/g, "")
            .slice(0, 14);
          return `${romanized}-${timePart}`;
        },
      },
      validation: (Rule) => Rule.required().error("Slug आवश्यक है"),
    }),
    defineField({
      name: "eventDate",
      title: "आयोजन तिथि",
      type: "datetime",
      validation: (Rule) => Rule.required().error("आयोजन तिथि आवश्यक है"),
    }),
    defineField({
      name: "location",
      title: "स्थान",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "संक्षिप्त विवरण",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200).warning("200 अक्षरों तक रखें"),
    }),
    defineField({
      name: "content",
      title: "पूर्ण विवरण/रिपोर्ट",
      type: "blockContent",
      description: "आयोजन का विस्तृत विवरण या रिपोर्ट",
    }),
    defineField({
      name: "coverImage",
      title: "मुख्य तस्वीर (Cloudinary URL)",
      type: "string",
      description: "Cloudinary से image URL paste करें",
    }),
    defineField({
      name: "coverImageCaption",
      title: "मुख्य तस्वीर कैप्शन",
      type: "string",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description: "आयोजन का YouTube video link",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "organizers",
      title: "आयोजक",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "guests",
      title: "विशेष अतिथि",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isUpcoming",
      title: "आगामी आयोजन है?",
      type: "boolean",
      initialValue: false,
      description:
        "यदि आयोजन आने वाला है तो चेक करें, रिपोर्ट के लिए uncheck रखें",
    }),
    defineField({
      name: "isFeatured",
      title: "मुख्य आयोजन",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "प्रकाशन तिथि",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("प्रकाशन तिथि आवश्यक है"),
    }),
  ],
  orderings: [
    {
      title: "नवीनतम पहले",
      name: "newestFirst",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "आयोजन तिथि (नया पहले)",
      name: "eventDateDesc",
      by: [{ field: "eventDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      eventDate: "eventDate",
      location: "location",
      media: "coverImage",
      isUpcoming: "isUpcoming",
    },
    prepare(selection) {
      const { title, eventDate, location, isUpcoming } = selection;
      const date = eventDate
        ? new Date(eventDate).toLocaleDateString("hi-IN")
        : "";
      return {
        title: title,
        subtitle: `${date} ${location ? "- " + location : ""} ${
          isUpcoming ? "📅 आगामी" : "✅ रिपोर्ट"
        }`,
        media: selection.media,
      };
    },
  },
});
