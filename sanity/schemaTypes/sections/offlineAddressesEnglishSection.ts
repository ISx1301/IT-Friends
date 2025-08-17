// ./schemaTypes/sections/schoolAddressesSection.ts
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

export const offlineAddressesEnglishSection = defineType({
  name: 'offlineAddressesEnglishSection',
  title: 'Секція «Офлайн адреси»',
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
      title: 'Адреси (картки)',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'item',
          title: 'Картка адреси',
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
              title: 'Локація (H3)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'address',
              title: 'Адреса (рядок)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'phone',
              title: 'Телефон',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Посилання на мапу',
              type: 'url',
              validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image', address: 'address' },
            prepare: ({ title, media, address }) => ({
              title: title || 'Адреса',
              subtitle: address,
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
        title: 'Секція «Офлайн адреси»',
        subtitle: `Карток: ${Array.isArray(items) ? items.length : 0}`,
      }
    },
  },
})
