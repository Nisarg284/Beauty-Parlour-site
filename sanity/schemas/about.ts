import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "Story / About Section",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text (e.g. The Atelier)",
      type: "string",
      initialValue: "The Atelier",
    }),
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      initialValue: "Makeup as a quiet form of storytelling.",
    }),
    defineField({
      name: "portrait",
      title: "Founder / Atelier Portrait",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "paragraphs",
      title: "Story Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "quoteText",
      title: "Highlighted Quote Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author Subtitle",
      type: "string",
      initialValue: "Founder, Amara Atelier",
    }),
  ],
});
