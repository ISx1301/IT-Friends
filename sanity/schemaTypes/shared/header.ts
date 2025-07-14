import { defineField } from 'sanity';

export const header = defineField({ 
  name: 'header',
  title: 'Заголовок сайту (Header)',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt текст для логотипу',
      type: 'string',
      description: 'Короткий опис зображення для доступності та SEO',
    }),
    defineField({
      name: 'navItems',
      title: 'Пункти меню',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Назва пункту',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'slug', 
              title: 'Посилання (Slug)',
              type: 'slug',
              options: {
                source: 'title', 
                maxLength: 96,
              },
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'slug.current',
            },
          },
        },
      ],
    }),
    defineField({
        name: 'phoneNumber',
        title: 'Номер телефону',
        type: 'string',
        description: 'Номер телефону для відображення в шапці',
    }),
  ],
});