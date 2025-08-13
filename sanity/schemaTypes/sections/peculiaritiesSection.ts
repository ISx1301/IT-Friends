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

export const peculiaritiesSection = defineType({
  name: 'peculiaritiesSection',
  title: 'Секція «Особливості»',
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
    select: { title: 'heading' },
    prepare() {
      return { title: 'Секція «Особливості»' }
    },
  },
})
