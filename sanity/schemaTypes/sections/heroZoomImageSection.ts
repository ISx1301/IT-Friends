import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

export type BgColor = typeof backgroundColors[number]['value']

export const heroZoomImageSection = defineType({
  name: 'heroZoomImageSection',
  title: 'Секція з Zoom картинкою',
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
      name: 'logo',
      title: 'Логотип',
      description: 'Картинка (опціонально).',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt текст',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt текст обовʼязковий'),
        }),
      ],
    }),

    defineField({
      name: 'badgeText',
      title: 'Текст бейджа',
      type: 'string',
      description: 'Короткий лейбл/спан (опціонально).',
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H1)',
      type: 'string',
      description: 'Основний заголовок секції (опціонально).',
    }),

    defineField({
      name: 'description',
      title: 'Опис',
      description: 'Enter = новий абзац (опціонально).',
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
      name: 'buttonText',
      title: 'Текст кнопки (опціонально).',
      type: 'string',
    }),

    defineField({
      name: 'mainImage',
      title: 'Головне зображення (опціонально).',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt текст',
          type: 'string',
          validation: (Rule) => Rule.required().error('Alt текст обовʼязковий'),
        }),
      ],
    }),

    defineField({
      name: 'order',
      title: 'Порядок елементів',
      description: 'Перетягніть елементи, щоб змінити порядок рендерингу.',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'orderItem',
          fields: [
            defineField({
              name: 'kind',
              title: 'Елемент',
              type: 'string',
              options: {
                list: [
                  { title: 'Логотип', value: 'logo' },
                  { title: 'Бейдж', value: 'badge' },
                  { title: 'Заголовок', value: 'heading' },
                  { title: 'Опис', value: 'description' },
                  { title: 'Кнопка', value: 'button' },
                  { title: 'Зображення', value: 'image' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { kind: 'kind' },
            prepare: ({ kind }) => ({
              title:
                kind === 'logo' ? 'Логотип' :
                kind === 'badge' ? 'Бейдж' :
                kind === 'heading' ? 'Заголовок' :
                kind === 'description' ? 'Опис' :
                kind === 'button' ? 'Кнопка' :
                kind === 'image' ? 'Зображення' : 'Елемент',
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((arr) => {
          if (!Array.isArray(arr)) return true
          const kinds = arr.map((i: any) => i?.kind).filter(Boolean)
          const uniq = new Set(kinds)
          return uniq.size === kinds.length || 'Елементи не повинні повторюватись'
        }),
      initialValue: [
        { kind: 'logo' },
        { kind: 'badge' },
        { kind: 'heading' },
        { kind: 'description' },
        { kind: 'button' },
        { kind: 'image' },
      ],
    }),
  ],

  preview: {
    select: { title: 'heading', order: 'order', media: 'mainImage' },
    prepare({ title, order, media }) {
      const seq = Array.isArray(order)
        ? order.map((o: any) => o?.kind).filter(Boolean).join(' → ')
        : ''
      return {
        title: 'Секція з Zoom картинкою',
        subtitle: seq || (title || 'Без заголовку'),
        media,
      }
    },
  },
})
