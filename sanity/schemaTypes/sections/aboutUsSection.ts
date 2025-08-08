import { defineType, defineField } from 'sanity'

export const aboutUsSection = defineType({
  name: 'aboutUsSection',
  title: 'Секція "Про нас"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок', type: 'string' }),
    defineField({ name: 'content', title: 'Текст', type: 'text' })
  ]
})
