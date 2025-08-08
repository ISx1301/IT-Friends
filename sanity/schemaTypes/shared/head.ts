import { defineType, defineField } from 'sanity'

export const head = defineType({
  name: 'head',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок сторінки (Title)',
      type: 'string',
      description:
        'Заголовок, який відображається у вкладці браузера та в пошуковій видачі. 5-60 символів.',
      validation: (Rule) => Rule.required().min(5).max(60),
    }),
  ],
})
