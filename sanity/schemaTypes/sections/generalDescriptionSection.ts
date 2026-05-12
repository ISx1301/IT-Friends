import { defineType, defineField } from 'sanity'
import { buttonClassField } from '../shared/buttonClassField'
import { ImagesIcon } from '@sanity/icons'

export const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

const paddingValidation = (Rule: any) =>
  Rule.required().custom((val: string) => {
    if (typeof val !== 'string' || !val.trim()) {
      return 'Заповніть відступи секції (Tailwind класи)'
    }
    const ok = val.trim().split(/\s+/).every((t) =>
      /^(?:[a-z]+:)?p[bt]-(?:px|0|[1-9]\d*)$/.test(t)
    )
    return ok
      ? true
      : 'Використовуйте лише pt-*/pb-* (наприклад: "pt-16 pb-16 lg:pt-32 lg:pb-32")'
  })

export const generalDescriptionSection = defineType({
  name: 'generalDescriptionSection',
  title: 'Секція з списком карток',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Лише для списку секцій у Studio.',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'paddingClass',
      title: 'Відступи секції (Tailwind класи)',
      type: 'string',
      description: 'Наприклад: pt-20 pb-20 lg:pt-32 lg:pb-32. Перелік значень та інструкції — у розділі «Інфо».',
      initialValue: 'pt-16 pb-16 lg:pt-32 lg:pb-32',
      validation: paddingValidation,
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: [...backgroundColors], layout: 'dropdown' },
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      description: 'Опціонально',
    }),

    defineField({
      name: 'cards',
      title: 'Картки',
      description: 'Всі поля опціонально',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'card',
          title: 'Картка',
          fields: [
            defineField({
              name: 'image',
              title: 'Картинка',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt текст', type: 'string' }),
              ],
            }),
            defineField({ name: 'title', title: 'Заголовок (H3)', type: 'string' }),
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
                      { name: 'link', title: 'Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url' }] },
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
            prepare({ title, media }) {
              return { title: title || 'Без назви', media }
            },
          },
        }),
      ],
    }),

    defineField({ name: 'buttonText', title: 'Текст кнопки', type: 'string', description: 'Опціонально.' }),

    buttonClassField,
  ],

  preview: {
    select: { adminTitle: 'adminTitle', title: 'heading', cards: 'cards' },
    prepare({ adminTitle, title, cards }) {
      const count = Array.isArray(cards) ? cards.length : 0
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція з списком карток',
        subtitle: `${title ? `“${title}” • ` : ''}Карток: ${count}`,
      }
    },
  },
})
