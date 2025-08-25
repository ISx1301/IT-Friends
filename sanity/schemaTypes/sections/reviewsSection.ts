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

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Секція з відгуками',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Відображається лише у списку секцій у Studio.',
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
              return { title: title || 'Відгук', subtitle: 'Rich text', media }
            },
          },
        },
      ],
      options: { sortable: true },
    }),
  ],

  preview: {
    select: { adminTitle: 'adminTitle', reviews: 'reviews' },
    prepare({ adminTitle, reviews }) {
      const count = Array.isArray(reviews) ? reviews.length : 0
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція з відгуками',
        subtitle: `Відгуків: ${count}`,
      }
    },
  },
})
