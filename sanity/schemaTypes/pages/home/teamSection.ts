import { defineType, defineField } from 'sanity';

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Секція "Наша команда"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок секції', type: 'string' }),
    defineField({
      name: 'members',
      title: 'Члени команди',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Ім\'я', type: 'string' },
          { name: 'position', title: 'Посада', type: 'string' },
          { name: 'image', title: 'Фото', type: 'image' },
          { name: 'bio', title: 'Біографія', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'position',
            media: 'image',
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
        subtitle: 'Секція "Наша команда"',
      };
    },
  },
});