import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise'},
] as const

const portableTextBlocks = [
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
] as const

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Секція з відгуками',
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
      name: 'paragraphs',
      title: 'Опис',
      description: 'Enter = новий абзац',
      type: 'array',
      of: [...portableTextBlocks],
      options: { sortable: true },
    }),

    defineField({
      name: 'buttonText',
      title: 'Текст кнопки',
      type: 'string',
    }),

    defineField({
      name: 'reviews',
      title: 'Відгуки',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'reviewItem',
          title: 'Відгук',
          fields: [
            defineField({
              name: 'avatar',
              title: 'Фото користувача',
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
            }),
            defineField({
              name: 'name',
              title: "Ім'я",
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            
            defineField({
              name: 'text',
              title: 'Текст відгуку',
              type: 'array',
              of: [...portableTextBlocks],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: 'name', media: 'avatar' },
            prepare({ title, media }) {
              return {
                title: title || 'Відгук',
                subtitle: 'Rich text',
                media,
              }
            },
          },
        },
      ],
      options: { sortable: true },
    }),
  ],

  preview: {
    select: { reviews: 'reviews' },
    prepare({ reviews }) {
      const count = Array.isArray(reviews) ? reviews.length : 0
      return {
        title: 'Секція з відгуками',
        subtitle: `Відгуків: ${count}`,
      }
    },
  },
})
