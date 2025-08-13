import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Секція «Наша команда»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: [...backgroundColors], layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
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
      name: 'members',
      title: 'Команда',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team mate',
          fields: [
            defineField({
              name: 'photo',
              title: 'Фото',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt текст',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: "Ім'я",
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subject',
              title: 'Що викладає',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'social',
              title: 'Соцмережа (іконка з посиланням)',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Іконка соціальної мережі',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt текст',
                      type: 'string',
                    }),
                  ],
                }),
                defineField({
                  name: 'url',
                  title: 'Посилання на соціальну мережу',
                  type: 'url',
                }),
              ],
              validation: (Rule) =>
                Rule.custom((val) => {
                  if (!val) return true
                  const hasIcon = !!val.icon
                  const hasUrl = !!val.url
                  return hasIcon === hasUrl
                    ? true
                    : 'Додайте і іконку, і посилання.'
                }),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'subject', media: 'photo', url: 'social.url' },
            prepare({ title, subtitle, media, url }) {
              return {
                title: title || 'Учасник',
                subtitle: subtitle || (url ? String(url) : ''),
                media,
              }
            },
          },
        },
      ],
      options: { sortable: true },
    }),
  ],

  preview: {
    select: { title: 'heading', count: 'members' },
    prepare({ count }) {
      const n = Array.isArray(count) ? count.length : 0
      return { title: 'Секція «Наша команда»', subtitle: `Учасників: ${n}` }
    },
  },
})
