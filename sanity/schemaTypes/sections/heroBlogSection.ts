// ./schemaTypes/sections/simpleIntroSection.ts
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const heroBlogSection = defineType({
  name: 'heroBlogSection',
  title: 'Hero секція (сторінка блогу)',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'image',
      title: 'Картинка',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Опис (Portable Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [{ name: 'href', title: 'URL', type: 'url' }],
              },
            ],
          },
        },
      ],
      description: 'Короткий текст під заголовком',
    }),
  ],

  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({
      title: "Hero секція (сторінка блогу)",
      media,
    }),
  },
})
