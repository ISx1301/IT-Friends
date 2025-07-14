import { defineType, defineField } from 'sanity';

export const newSchoolSection = defineType({
  name: 'newSchoolSection',
  title: 'Секція "Нова школа"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок секції', type: 'string' }),
    defineField({ name: 'description', title: 'Опис', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'image', title: 'Зображення', type: 'image', options: { hotspot: true } }),
    defineField({
        name: 'ctaButton',
        title: 'Кнопка заклику до дії',
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
        subtitle: 'Секція "Нова школа"',
      };
    },
  },
});