import { defineField } from 'sanity';

export const head = defineField({
  name: 'head',
  title: 'SEO та мета-дані',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок сторінки (Title)',
      type: 'string',
      description: 'Заголовок, який відображається у вкладці браузера та в пошуковій видачі. 5-60 символів.',
      validation: Rule => Rule.required().min(5).max(60),
    }),
    defineField({
      name: 'description',
      title: 'Опис сторінки (Description)',
      type: 'text',
      rows: 3,
      description: 'Короткий опис для пошукових систем та соцмереж. 50-160 символів.',
      validation: Rule => Rule.required().min(50).max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Зображення для соцмереж',
      type: 'image',
      description: 'Зображення, яке відображається при поширенні посилання (Open Graph та Twitter).',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'ogImage',
    },
    prepare({ title, description, media }) {
      return {
        title: `SEO: ${title || 'Без заголовка'}`,
        subtitle: description ? `${description.substring(0, 70)}...` : 'Без опису',
        media: media,
      };
    },
  },
});