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

const paddingValidation = (Rule: any) =>
  Rule.required().custom((val: string) => {
    if (typeof val !== 'string' || !val.trim()) return 'Заповніть відступи секції (Tailwind класи)'
    const ok = val.trim().split(/\s+/).every((t) =>
      /^(?:[a-z]+:)?p[bt]-(?:px|0|[1-9]\d*)$/.test(t)
    )
    return ok ? true : 'Використовуйте лише pt-*/pb-* (напр.: "pt-16 pb-16 lg:pt-32 lg:pb-32")'
  })

export const heroZoomImageSection = defineType({
  name: 'heroZoomImageSection',
  title: 'Секція з Zoom картинкою',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Відображається лише у списку секцій у Studio.',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'paddingClass',
      title: 'Відступи секції (Tailwind класи)',
      type: 'string',
      description: 'Наприклад: pt-20 pb-20 lg:pt-32 lg:pb-32. Перелік значень та інструкції — у розділі «Інфо».',
      initialValue: 'pt-16 pb-16 lg:pt-28 lg:pb-28',
      validation: paddingValidation,
    }),

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

    defineField({ name: 'badgeText', title: 'Текст бейджа', type: 'string' }),
    defineField({ name: 'heading', title: 'Заголовок (H1)', type: 'string' }),

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

    defineField({ name: 'buttonText', title: 'Текст кнопки (опціонально).', type: 'string' }),

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
    select: { adminTitle: 'adminTitle', title: 'heading', order: 'order', media: 'mainImage' },
    prepare({ adminTitle, title, order, media }) {
      const seq = Array.isArray(order)
        ? order.map((o: any) => o?.kind).filter(Boolean).join(' → ')
        : ''
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція з Zoom картинкою',
        subtitle: seq || (title || 'Без заголовку'),
        media,
      }
    },
  },
})
