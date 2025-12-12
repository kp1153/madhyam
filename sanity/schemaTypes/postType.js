export default {
  name: "article",
  title: "लेख",
  type: "document",
  fields: [
    {
      name: "title",
      title: "शीर्षक",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "category",
      title: "श्रेणी",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "author",
      title: "लेखक",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "coverImage",
      title: "कवर इमेज",
      type: "image",
    },
    {
      name: "excerpt",
      title: "संक्षिप्त विवरण",
      type: "text",
    },
    {
      name: "content",
      title: "सामग्री",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "featured",
      title: "मुख्य लेख",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "प्रकाशन तिथि",
      type: "datetime",
    },
  ],
};
