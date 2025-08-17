import { defineType, defineField } from 'sanity';

export const postListSection = defineType({
  name: 'postListSection',
  title: 'Блог: список статей',
  type: 'object',
  fields: [
    defineField({
      name: 'buttonText',
      title: 'Текст кнопки «Завантажити ще»',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sort',
      title: 'Сортування',
      type: 'string',
      options: {
        list: [
          { title: 'Спочатку нові', value: 'newest' },
          { title: 'Спочатку старі', value: 'oldest' },
        ],
        layout: 'radio',
      },
      initialValue: 'newest',
    }),
  ],
});
