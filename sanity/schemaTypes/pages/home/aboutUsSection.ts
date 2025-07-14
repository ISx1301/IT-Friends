import { defineType, defineField } from 'sanity';

export const aboutUsSection = defineType({ 
  name: 'aboutUsSection', 
  title: 'Секція "Про нас"',
  type: 'object', 
  fields: [
    defineField({
      name: 'heading',
      title: 'Заголовок секції',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Основний текст',
      type: 'array',
      of: [{ type: 'block' }], 
    }),
    defineField({
      name: 'image',
      title: 'Зображення',
      type: 'image',
      options: { hotspot: true },
    }),
    
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Без заголовка',
        subtitle: 'Секція "Про нас"',
      };
    },
  },
});