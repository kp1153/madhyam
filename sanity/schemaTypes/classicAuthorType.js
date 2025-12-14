import { defineField, defineType } from "sanity";

export default defineType({
  name: "classicAuthor",
  title: "क्लासिक लेखक",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "नाम",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "फोटो",
      type: "image",
      options: {
        hotspot: true,
      },
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
            },
            {
              name: "image",
              title: "रचना से संबंधित चित्र",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "type",
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "क्रम संख्या",
      type: "number",
      description: "लेखकों को क्रम में दिखाने के लिए",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "birthYear",
      media: "photo",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle ? `जन्म: ${subtitle}` : "",
        media: selection.media,
      };
    },
  },
});
