import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const paddingValidation = (Rule: any) =>
  Rule.required().custom((val: string) => {
    if (typeof val !== 'string' || !val.trim()) {
      return 'Заповніть відступи секції (Tailwind класи)'
    }
    const ok = val.trim().split(/\s+/).every((t) =>
      /^(?:[a-z]+:)?p[bt]-(?:px|0|[1-9]\d*)$/.test(t)
    )
    return ok
      ? true
      : 'Використовуйте лише pt-*/pb-* (наприклад: "pt-16 pb-16 lg:pt-32 lg:pb-32")'
  })

export const newSchoolMainSection = defineType({
  name: 'newSchoolMainSection',
  title: 'Секція «Нова школа»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Використовується лише у списку секцій у Studio.',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'paddingClass',
      title: 'Відступи секції (Tailwind класи)',
      type: 'string',
      description: 'Наприклад: pt-20 pb-20 lg:pt-32 lg:pb-32. Перелік значень та інструкції — у розділі «Інфо».',
      initialValue: 'pt-16 pb-16 lg:pt-32 lg:pb-32',
      validation: paddingValidation,
    }),

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
        Rule.required().min(4).max(4).error('Потрібно рівно 4 зображення'),
    }),
  ],

  preview: {
    select: { adminTitle: 'adminTitle', heading: 'heading', images: 'images' },
    prepare({ adminTitle, heading, images }) {
      const count = Array.isArray(images) ? images.length : 0
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція «Нова школа»',
        subtitle: heading ? `${heading} • ${count}/4` : `Зображень: ${count}/4`,
        media: images?.[0],
      }
    },
  },
})
