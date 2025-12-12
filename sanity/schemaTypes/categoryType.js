export default {
  name: "category",
  title: "श्रेणी",
  type: "document",
  fields: [
    {
      name: "title",
      title: "नाम",
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
  ],
};
