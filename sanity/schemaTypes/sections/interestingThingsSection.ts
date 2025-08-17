import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

export type BgColor = typeof backgroundColors[number]['value']

export const interestingThingsSection = defineType({
  name: 'interestingThingsSection',
  title: 'Секція «Що може зацікавити»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: [...backgroundColors], layout: 'dropdown' },
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'Картки',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'item',
          title: 'Картка',
          fields: [
            defineField({
              name: 'image',
              title: 'Картинка',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Заголовок (H3)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ptDescription',
              title: 'Короткий опис',
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
              description: 'Невеликий абзац під заголовком',
            }),
            defineField({
              name: 'buttonText',
              title: 'Текст кнопки',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare: ({ title, media }) => ({
              title: title || 'Картка',
              media,
            }),
          },
        }),
      ],
    }),
  ],

  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      return {
        title: 'Секція «Що може зацікавити»',
        subtitle: `Карток: ${Array.isArray(items) ? items.length : 0}`,
      }
    },
  },
})
