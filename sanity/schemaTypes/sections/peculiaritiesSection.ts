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
      : 'Використовуйте лише pt-*/pb-* (наприклад: "pt-5 pb-5 lg:pt-10 lg:pb-12")'
  })

export const peculiaritiesSection = defineType({
  name: 'peculiaritiesSection',
  title: 'Секція «Особливості»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Використовується лише в списку секцій у Sanity.',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'paddingClass',
      title: 'Відступи секції (Tailwind класи)',
      type: 'string',
      description: 'Наприклад: pt-20 pb-20 lg:pt-32 lg:pb-32. Перелік значень та інструкції — у розділі «Інфо».',
      initialValue: 'pt-20 pb-20 lg:pt-32 lg:pb-32',
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
      name: 'mainImage',
      title: 'Головне зображення секції',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt текст',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt текст обовʼязковий'),
        }),
      ],
    }),

    defineField({
      name: 'row1',
      title: 'Ряд 1 (картки)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'simpleCard',
          title: 'Картка',
          fields: [
            defineField({
              name: 'image',
              title: 'Зображення',
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
              name: 'title',
              title: 'Підзаголовок (H3)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Опис',
              description: 'Enter = новий абзац',
              type: 'array',
              of: [...portableTextBlocks],
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare: ({ title, media }) => ({ title: title || 'Картка', media }),
          },
        },
      ],
      options: { sortable: true },
    }),

    defineField({
      name: 'row2',
      title: 'Ряд 2 (картки)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'simpleCard',
          title: 'Картка',
          fields: [
            defineField({
              name: 'image',
              title: 'Зображення',
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
              name: 'title',
              title: 'Підзаголовок (H3)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Опис',
              description: 'Enter = новий абзац',
              type: 'array',
              of: [...portableTextBlocks],
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare: ({ title, media }) => ({ title: title || 'Картка', media }),
          },
        },
      ],
      options: { sortable: true },
    }),
  ],

  preview: {
    select: { adminTitle: 'adminTitle', heading: 'heading' },
    prepare({ adminTitle, heading }) {
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція «Особливості»',
        subtitle: heading || undefined,
      }
    },
  },
})
