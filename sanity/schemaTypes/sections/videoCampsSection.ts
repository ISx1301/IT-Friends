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

export const videoCampsSection = defineType({
  name: 'videoCampsSection',
  title: 'Секція «Відео»',
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
      name: 'image',
      title: 'Картинка (превʼю відео)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoHref',
      title: 'Посилання на відео',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({ scheme: ['http', 'https'] }),
      description: 'Посилання на відео',
    }),
  ],

  preview: {
    select: { media: 'image', href: 'videoHref' },
    prepare: ({ media, href }) => ({
      title: 'Секція «Відео»',
      subtitle: href || 'без посилання',
      media,
    }),
  },
})