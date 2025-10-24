import { defineType, defineField } from 'sanity';
import { SUPPORTED_LANGS } from '../../constants';
import { isUniquePerLanguage } from '../../utils/isUniquePerLanguage';

export const blog = defineType({
  name: 'blog',
  title: 'Стаття',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Назва статті',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniquePerLanguage, 
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Заголовок статті',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Картинка',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Опис',
      description: 'Enter = новий абзац',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [{ name: 'href', title: 'URL', type: 'url' }],
              },
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'showFormButton',
      title: 'Показувати кнопку форми',
      type: 'boolean',
      initialValue: false, // default: hidden
      description: 'Увімкніть, щоб показати кнопку на сторінці статті',
      options: { layout: 'checkbox' },
    }),
    defineField({
      name: 'formButtonText',
      title: 'Текст кнопки форми',
      type: 'string',
      hidden: ({ parent }) => parent?.showFormButton !== true,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const show = (ctx?.document as any)?.showFormButton;
          return show ? (!!val || 'Вкажіть текст кнопки') : true;
        }),
      placeholder: 'Записатися / Залишити заявку',
    }),


    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: { list: SUPPORTED_LANGS.map((l) => ({ title: l.title, value: l.id })) },
      hidden: true,
      readOnly: true,
    }),
  ],
  initialValue: {
    title: 'Нова стаття',
  },
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'image' },
    prepare({ title, subtitle }) {
      return { title: title || 'Без назви', subtitle: subtitle ? `/${subtitle}` : '' };
    },
  },
});
