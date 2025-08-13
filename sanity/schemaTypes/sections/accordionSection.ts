import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

export const accordionSection = defineType({
  name: 'accordionSection',
  title: 'Секція «FAQ»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: [...backgroundColors], layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
                fields: [{ name: 'href', title: 'URL', type: 'url' }],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'buttonText',
      title: 'Текст кнопки',
      type: 'string',
    }),

    defineField({
      name: 'items',
      title: 'Питання та відповіді',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'Елемент акордеона',
          fields: [
            defineField({
              name: 'question',
              title: 'Питання',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            
            defineField({
              name: 'answer',
              title: 'Відповідь',
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
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: 'question' },
            prepare: ({ title }) => ({ title: title || 'Питання' }),
          },
        },
      ],
      options: { sortable: true },
    }),
  ],

  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: 'Секція «FAQ»', subtitle: `Елементів: ${count}` }
    },
  },
})
