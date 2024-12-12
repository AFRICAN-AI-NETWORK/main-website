import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: {type: 'country'},
    }),
    defineField({
      name: 'linkToProject',
      title: 'Link to Project',
      type: 'string',
      validation: (Rule) => Rule.regex(/^(http|https):\/\/[^ "]+$/),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      author: 'author.name',
      media: 'country.image',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `Recorded by ${author}`}
    },
  },
})
