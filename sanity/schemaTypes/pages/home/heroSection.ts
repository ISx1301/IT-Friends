
import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Секція Hero (Перший екран)',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Головний заголовок', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'tagline', title: 'Підзаголовок', type: 'string' }),
    defineField({ name: 'backgroundImage', title: 'Фонове зображення', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'callToAction',
      title: 'Кнопка дії',
      type: 'object',
      fields: [
        { name: 'text', title: 'Текст кнопки', type: 'string' },
        { name: 'url', title: 'Посилання кнопки', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Без заголовка',
        subtitle: 'Секція Hero',
      };
    },
  },
});