import { defineField } from 'sanity';

export const footer = defineField({ 
  name: 'footer',
  title: 'Підвал сайту (Footer)',
  type: 'object',
  fields: [
    defineField({
      name: 'description',
      title: 'Короткий опис в підвалі',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactInfo',
      title: 'Контактна інформація',
      type: 'object',
      fields: [
        defineField({ name: 'address', title: 'Адреса', type: 'string' }),
        defineField({ name: 'phone', title: 'Телефон', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Посилання на соцмережі',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Платформа (напр. Facebook)', type: 'string', validation: Rule => Rule.required() }),
            defineField({ name: 'url', title: 'URL профілю', type: 'url', validation: Rule => Rule.required() }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
        name: 'copyright',
        title: 'Текст копірайту',
        type: 'string',
        initialValue: `© ${new Date().getFullYear()} IT-Friends. All rights reserved.`,
    }),
  ],
});