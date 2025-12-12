export default {
  name: "author",
  title: "लेखक",
  type: "document",
  fields: [
    {
      name: "name",
      title: "नाम",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "photo",
      title: "फोटो",
      type: "image",
    },
    {
      name: "bio",
      title: "परिचय",
      type: "text",
    },
  ],
};
