import { defineField, defineType } from "sanity";
import CloudinaryImageInput from "./CloudinaryImageInput";

export default defineType({
  name: "issue",
  title: "अंक",
  type: "document",
  fields: [
    defineField({
      name: "issueNumber",
      title: "अंक संख्या",
      type: "number",
      validation: (Rule) => Rule.required().error("अंक संख्या आवश्यक है"),
    }),
    defineField({
      name: "year",
      title: "वर्ष",
      type: "number",
      validation: (Rule) => Rule.required().error("वर्ष आवश्यक है"),
    }),
    defineField({
      name: "frequency",
      title: "प्रकाशन आवृत्ति",
      type: "string",
      options: {
        list: [
          { title: "मासिक", value: "monthly" },
          { title: "छमाही", value: "biannual" },
        ],
      },
      initialValue: "biannual",
      validation: (Rule) => Rule.required().error("आवृत्ति आवश्यक है"),
    }),
    defineField({
      name: "period",
      title: "अवधि",
      type: "string",
      options: {
        list: [
          { title: "जनवरी", value: "january" },
          { title: "फरवरी", value: "february" },
          { title: "मार्च", value: "march" },
          { title: "अप्रैल", value: "april" },
          { title: "मई", value: "may" },
          { title: "जून", value: "june" },
          { title: "जुलाई", value: "july" },
          { title: "अगस्त", value: "august" },
          { title: "सितंबर", value: "september" },
          { title: "अक्टूबर", value: "october" },
          { title: "नवंबर", value: "november" },
          { title: "दिसंबर", value: "december" },
          { title: "जनवरी-जून (छमाही)", value: "jan-june" },
          { title: "जुलाई-दिसंबर (छमाही)", value: "july-dec" },
        ],
      },
      validation: (Rule) => Rule.required().error("अवधि आवश्यक है"),
      hidden: ({ parent }) => !parent?.frequency,
    }),
    defineField({
      name: "isSpecialIssue",
      title: "विशेष अंक है?",
      type: "boolean",
      initialValue: false,
      description: "संयुक्तांक, विशेषांक आदि के लिए",
    }),
    defineField({
      name: "specialIssueType",
      title: "विशेष अंक का प्रकार",
      type: "string",
      options: {
        list: [
          { title: "संयुक्तांक", value: "combined" },
          { title: "विशेषांक", value: "special" },
          { title: "सहस्त्राब्दि अंक", value: "millennium" },
        ],
      },
      hidden: ({ parent }) => !parent?.isSpecialIssue,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => `issue-${doc.issueNumber}-${doc.year}`,
      },
      validation: (Rule) => Rule.required().error("Slug आवश्यक है"),
    }),
    defineField({
      name: "coverImage",
      title: "कवर इमेज",
      type: "string",
      components: {
        input: CloudinaryImageInput,
      },
      validation: (Rule) => Rule.required().error("कवर इमेज आवश्यक है"),
    }),
    defineField({
      name: "pdfUrl",
      title: "PDF URL (Vercel Blob)",
      type: "url",
      description: "Vercel Blob से PDF का URL paste करें",
      validation: (Rule) =>
        Rule.required()
          .error("PDF URL आवश्यक है")
          .uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "description",
      title: "विवरण",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isCurrent",
      title: "वर्तमान अंक है?",
      type: "boolean",
      initialValue: false,
      description: "केवल एक अंक को वर्तमान के रूप में चिह्नित करें",
    }),
    defineField({
      name: "publishedAt",
      title: "प्रकाशन तिथि",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("प्रकाशन तिथि आवश्यक है"),
    }),
    defineField({
      name: "order",
      title: "क्रम संख्या",
      type: "number",
      description: "अंकों को क्रम में दिखाने के लिए (नया = छोटी संख्या)",
    }),
  ],
  orderings: [
    {
      title: "नवीनतम पहले",
      name: "newestFirst",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "अंक संख्या",
      name: "issueNumber",
      by: [{ field: "issueNumber", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      issueNumber: "issueNumber",
      year: "year",
      period: "period",
      frequency: "frequency",
      isSpecialIssue: "isSpecialIssue",
      specialIssueType: "specialIssueType",
      isCurrent: "isCurrent",
      coverImage: "coverImage",
    },
    prepare(selection) {
      const {
        issueNumber,
        year,
        period,
        frequency,
        isSpecialIssue,
        specialIssueType,
        isCurrent,
        coverImage,
      } = selection;

      const periodMap = {
        january: "जनवरी",
        february: "फरवरी",
        march: "मार्च",
        april: "अप्रैल",
        may: "मई",
        june: "जून",
        july: "जुलाई",
        august: "अगस्त",
        september: "सितंबर",
        october: "अक्टूबर",
        november: "नवंबर",
        december: "दिसंबर",
        "jan-june": "जनवरी-जून",
        "july-dec": "जुलाई-दिसंबर",
      };

      const specialTypeMap = {
        combined: "संयुक्तांक",
        special: "विशेषांक",
        millennium: "सहस्त्राब्दि अंक",
      };

      const frequencyText = frequency === "biannual" ? "छमाही" : "मासिक";
      const periodText = periodMap[period] || period;
      const specialText = isSpecialIssue
        ? ` (${specialTypeMap[specialIssueType]})`
        : "";

      return {
        title: `अंक ${issueNumber} - ${periodText} ${year}${specialText}`,
        subtitle: `${frequencyText}${isCurrent ? " • ✓ वर्तमान अंक" : ""}`,
        media: coverImage ? (
          <img
            src={coverImage}
            alt="Cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : undefined,
      };
    },
  },
});
