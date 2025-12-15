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
  name: "classicAuthor",
  title: "क्लासिक लेखक",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "नाम",
      type: "string",
      validation: (Rule) => Rule.required().error("नाम आवश्यक है"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) => {
          const romanized = hindiToRoman(input);
          return romanized;
        },
      },
      validation: (Rule) => Rule.required().error("Slug आवश्यक है"),
    }),
    defineField({
      name: "photo",
      title: "फोटो (Cloudinary URL)",
      type: "string",
      description: "Cloudinary से लेखक की फोटो URL paste करें",
    }),
    defineField({
      name: "birthYear",
      title: "जन्म वर्ष",
      type: "number",
    }),
    defineField({
      name: "deathYear",
      title: "मृत्यु वर्ष",
      type: "number",
    }),
    defineField({
      name: "birthPlace",
      title: "जन्म स्थान",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "जीवनी/परिचय",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "works",
      title: "रचनाएं",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "रचना का नाम",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "type",
              title: "प्रकार",
              type: "string",
              options: {
                list: [
                  { title: "कविता", value: "poem" },
                  { title: "कहानी", value: "story" },
                  { title: "उपन्यास", value: "novel" },
                  { title: "निबंध", value: "essay" },
                  { title: "नाटक", value: "drama" },
                  { title: "आलोचना", value: "criticism" },
                ],
              },
            },
            {
              name: "content",
              title: "सामग्री",
              type: "blockContent",
              description:
                "रचना का पूर्ण text (gallery, images भी add कर सकते हैं)",
            },
            {
              name: "coverImage",
              title: "रचना से संबंधित चित्र (Cloudinary URL)",
              type: "string",
              description: "Cloudinary से image URL paste करें",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "type",
            },
            prepare(selection) {
              const { title, subtitle } = selection;
              const typeMap = {
                poem: "कविता",
                story: "कहानी",
                novel: "उपन्यास",
                essay: "निबंध",
                drama: "नाटक",
                criticism: "आलोचना",
              };
              return {
                title: title,
                subtitle: typeMap[subtitle] || subtitle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "क्रम संख्या",
      type: "number",
      description:
        "लेखकों को क्रम में दिखाने के लिए (छोटी संख्या = पहले दिखेगा)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      birthYear: "birthYear",
      deathYear: "deathYear",
      media: "photo",
    },
    prepare(selection) {
      const { title, birthYear, deathYear } = selection;
      let subtitle = "";
      if (birthYear && deathYear) {
        subtitle = `${birthYear} - ${deathYear}`;
      } else if (birthYear) {
        subtitle = `जन्म: ${birthYear}`;
      }
      return {
        title: title,
        subtitle: subtitle,
        media: selection.media,
      };
    },
  },
});
