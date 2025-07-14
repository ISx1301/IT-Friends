import { defineType, defineField } from 'sanity';

export const featuresSection = defineType({
  name: 'featuresSection',
  title: 'Секція "Особливості/Переваги"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок секції', type: 'string' }),
    defineField({
      name: 'features',
      title: 'Особливості',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Назва особливості', type: 'string' },
          { name: 'description', title: 'Опис особливості', type: 'text' },
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
        subtitle: 'Секція "Особливості"',
      };
    },
  },
});