import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aiTool',
  title: 'AI Tool',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site Url',
      type: 'string',
      validation: (Rule) => [Rule.required(), Rule.regex(/^(http|https):\/\/[^ "]+$/)],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricingModel',
      title: 'Pricing Model',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stars',
      title: 'Stars',
      type: 'number',
      validation: (Rule) => [Rule.required(), Rule.min(0), Rule.max(5)],
    }),
    defineField({
      name: 'verified',
      title: 'Verified',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ytVideoUrl',
      title: 'Youtube Video URL',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [{type: 'reference', to: {type: 'aiToolCategory'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `Created by ${author}`}
    },
  },
})
