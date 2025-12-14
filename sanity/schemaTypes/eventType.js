export default {
  name: "event",
  title: "आयोजन",
  type: "document",
  fields: [
    {
      name: "title",
      title: "आयोजन का नाम",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "eventDate",
      title: "आयोजन तिथि",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "स्थान",
      type: "string",
    },
    {
      name: "description",
      title: "विवरण",
      type: "text",
      rows: 5,
    },
    {
      name: "fullDescription",
      title: "पूर्ण विवरण",
      type: "blockContent",
      description: "आयोजन का विस्तृत विवरण",
    },
    {
      name: "coverImage",
      title: "मुख्य चित्र",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "gallery",
      title: "फोटो गैलरी",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "विवरण",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "organizers",
      title: "आयोजक",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "guests",
      title: "विशेष अतिथि",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "isFeatured",
      title: "मुख्य आयोजन",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isUpcoming",
      title: "आगामी आयोजन है?",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "क्रम संख्या",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "नवीनतम पहले",
      name: "newestFirst",
      by: [{ field: "eventDate", direction: "desc" }],
    },
    {
      title: "पुराना पहले",
      name: "oldestFirst",
      by: [{ field: "eventDate", direction: "asc" }],
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
          isUpcoming ? "📅 आगामी" : ""
        }`,
        media: selection.media,
      };
    },
  },
};
