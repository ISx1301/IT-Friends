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
      : 'Використовуйте лише pt-*/pb-* (напр.: "pt-20 pb-20 lg:pt-32 lg:pb-32")'
  })

export const offlineAddressesEnglishSection = defineType({
  name: 'offlineAddressesEnglishSection',
  title: 'Секція «Офлайн адреси»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Тільки для списку секцій у Studio.',
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
            defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
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
    select: { adminTitle: 'adminTitle', heading: 'heading', items: 'items' },
    prepare({ adminTitle, heading, items }) {
      const n = Array.isArray(items) ? items.length : 0
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція «Офлайн адреси»',
        subtitle: heading ? `“${heading}” • Карток: ${n}` : `Карток: ${n}`,
      }
    },
  },
})
