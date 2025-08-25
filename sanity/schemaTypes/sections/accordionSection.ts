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

export const accordionSection = defineType({
  name: 'accordionSection',
  title: 'Секція «FAQ»',
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

    defineField({ name: 'buttonText', title: 'Текст кнопки', type: 'string' }),

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
    select: { adminTitle: 'adminTitle', items: 'items' },
    prepare({ adminTitle, items }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція «FAQ»',
        subtitle: `Елементів: ${count}`,
      }
    },
  },
})
