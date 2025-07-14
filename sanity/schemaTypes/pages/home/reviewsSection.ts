import { defineType, defineField } from 'sanity';

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Секція "Відгуки"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок секції', type: 'string' }),
    defineField({
      name: 'reviews',
      title: 'Список відгуків',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'reviewerName', title: 'Ім\'я автора', type: 'string' },
          { name: 'reviewerTitle', title: 'Посада/Опис автора', type: 'string' },
          { name: 'reviewText', title: 'Текст відгуку', type: 'text' },
          { name: 'reviewerImage', title: 'Фото автора', type: 'image' },
        ],
        preview: {
          select: {
            title: 'reviewerName',
            subtitle: 'reviewerTitle',
            media: 'reviewerImage',
          },
        },
      }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Без заголовка',
        subtitle: 'Секція "Відгуки"',
      };
    },
  },
});