// sanity/schemaTypes/sections/fourImagesSection.ts
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const newSchoolMainSection = defineType({
  name: 'newSchoolMainSection',
  title: 'Секція «Нова школа»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Зображення (4 шт.)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt текст',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      options: { sortable: true, layout: 'grid' },
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(4)
          .error('Потрібно рівно 4 зображення'),
    }),
  ],

  preview: {
    select: { title: 'heading', images: 'images' },
    prepare({ title, images }) {
      const count = Array.isArray(images) ? images.length : 0
      return {
        title: 'Секція «Нова школа»',
        subtitle: `Зображень: ${count}/4`,
        media: images?.[0],
      }
    },
  },
})