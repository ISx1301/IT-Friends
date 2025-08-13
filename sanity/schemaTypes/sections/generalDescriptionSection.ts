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

export const generalDescriptionSection = defineType({
  name: 'generalDescriptionSection',
  title: 'Секція з списком карток',
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
      description: 'Опціонально',
    }),

    defineField({
      name: 'cards',
      title: 'Картки',
      description: 'Всі поля опціонально',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'card',
          title: 'Картка',
          fields: [
            defineField({
              name: 'image',
              title: 'Картинка',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt текст',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Заголовок (H3)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Опис',
              description: 'Enter = новий абзац',
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
                        fields: [
                          { name: 'href', title: 'URL', type: 'url' },
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Без назви',
                media,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'buttonText',
      title: 'Текст кнопки',
      type: 'string',
      description: 'Опціонально',
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      cards: 'cards',
    },
    prepare({ title, cards }) {
      const count = Array.isArray(cards) ? cards.length : 0
      return {
        title: 'Секція з списком карток',
        subtitle: `Карток: ${count}`,
      }
    },
  },
})