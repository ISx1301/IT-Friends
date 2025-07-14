import { defineType, defineField } from 'sanity';

export const directionsSection = defineType({
  name: 'directionsSection',
  title: 'Секція "Напрямки"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок секції', type: 'string' }),
    defineField({
      name: 'directions',
      title: 'Напрямки',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Назва напрямку', type: 'string' },
          { name: 'description', title: 'Опис напрямку', type: 'text' },
          { name: 'icon', title: 'Іконка (Зображення)', type: 'image' },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'description',
            media: 'icon',
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
        subtitle: 'Секція "Напрямки"',
      };
    },
  },
});