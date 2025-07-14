import { defineType, defineField } from 'sanity';

export const faqSection = defineType({
  name: 'faqSection',
  title: 'Секція "Питання та відповіді (FAQ)"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок секції', type: 'string' }),
    defineField({
      name: 'faqs',
      title: 'Питання',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Питання', type: 'string' },
          { name: 'answer', title: 'Відповідь', type: 'array', of: [{ type: 'block' }] },
        ],
        preview: {
          select: {
            title: 'question',
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
        subtitle: 'Секція FAQ',
      };
    },
  },
});