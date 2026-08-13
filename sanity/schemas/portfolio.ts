import { defineField, defineType } from "sanity";

export const portfolioSchema = defineType({
  name: "portfolioItem",
  title: "Portfolio Items",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (e.g. Reception Glam, Vadodara)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label / Tag (e.g. Portfolio 01)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Portfolio Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order Ascending",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
