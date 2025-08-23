import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

const headingAlignOptions = [
  { title: 'Зліва', value: 'left' },
  { title: 'По центру', value: 'center' },
  { title: 'Справа', value: 'right' },
] as const

const layoutOptions = [
  { title: 'Зображення ліворуч', value: 'image-left' },
  { title: 'Зображення праворуч', value: 'image-right' },
] as const

const badgeBorderColors = [
  { title: 'Піщаний', value: 'sand' },
  { title: 'Зелений', value: 'mint' },
] as const

const contentBlocksOrderList = [
  { title: 'Підзаголовок H3', value: 'h3' },
  { title: 'Абзаци', value: 'paragraphs' },
  { title: 'Підзаголовок H4', value: 'h4' },
  { title: 'Бейджі (спани)', value: 'badges' },
] as const

// const classValidation = (Rule: any) =>
//   Rule.custom((val: string) => {
//     if (!val) return true
//     return /^[A-Za-z0-9\-\_: ]+$/.test(val)
//       ? true
//       : 'Дозволені: літери, цифри, дефіс, підкреслення, двокрапка та пробіли'
//   })

const paddingValidation = (Rule: any) =>
  Rule.required().custom((val: string) => {
    if (typeof val !== 'string' || !val.trim()) {
      return 'Заповніть відступи секції (Tailwind класи)'
    }
    const tokens = val.trim().split(/\s+/)
    const ok = tokens.every((t) => /^(?:[a-z]+:)?p[bt]-(?:px|0|[1-9]\d*)$/.test(t))
    return ok
      ? true
      : 'Використовуйте лише pt-*/pb-* (наприклад: "pt-5 pb-5 lg:pt-10 lg:pb-12")'
  })

export const aboutContentOrderItem = defineType({
  name: 'aboutContentOrderItem',
  title: 'Елемент контенту',
  type: 'object',
  fields: [
    defineField({
      name: 'kind',
      title: 'Тип',
      type: 'string',
      options: { list: [...contentBlocksOrderList], layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { kind: 'kind' },
    prepare({ kind }) {
      const map: Record<string, string> = {
        h3: 'Підзаголовок H3',
        paragraphs: 'Абзаци',
        h4: 'Підзаголовок H4',
        badges: 'Бейджі (спани)',
      }
      return { title: map[kind ?? ''] ?? kind }
    },
  },
})

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'Секція «Про нас»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'adminTitle',
      title: 'Назва секції',
      type: 'string',
      description: 'Необовʼязково. Використовується лише в списку секцій у Sanity.',
      validation: (Rule) => Rule.max(80),
    }),

    defineField({
      name: 'paddingClass',
      title: 'Відступи секції (Tailwind класи)',
      type: 'string',
      description:
        'Наприклад: pt-20 pb-20 lg:pt-32 lg:pb-32. Перелік значень та інструкції — у розділі «Інфо».',
      initialValue: 'pt-20 pb-20 lg:pt-32 lg:pb-32',
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
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'headingAlign',
      title: 'Вирівнювання заголовка',
      type: 'string',
      options: { list: [...headingAlignOptions], layout: 'dropdown' },
      initialValue: 'left',
    }),

    defineField({
      name: 'layout',
      title: 'Розташування блоків',
      type: 'string',
      options: { list: [...layoutOptions], layout: 'dropdown' },
      initialValue: 'image-left',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Зображення',
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
      name: 'content',
      title: 'Контент',
      type: 'object',
      fields: [
        defineField({ name: 'h3', title: 'Підзаголовок (H3)', type: 'string' }),

        defineField({
          name: 'paragraphs',
          title: 'Опис',
          description: 'Enter = новий абзац',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{ title: 'Звичайний', value: 'normal' }],
              lists: [],
              marks: {
                decorators: [
                  { title: 'Жирний', value: 'strong' },
                  { title: 'Курсив', value: 'em' },
                ],
                annotations: [
                  {
                    name: 'link',
                    title: 'Посилання',
                    type: 'object',
                    fields: [
                      {
                        name: 'href',
                        title: 'URL',
                        type: 'url',
                        validation: (Rule) =>
                          Rule.required().uri({ allowRelative: true }),
                      },
                      {
                        name: 'openInNewTab',
                        title: 'Відкрити в новій вкладці',
                        type: 'boolean',
                        initialValue: true,
                      },
                    ],
                  },
                ],
              },
            }),
          ],
        }),

        defineField({ name: 'h4', title: 'Підзаголовок (H4)', type: 'string' }),

        defineField({
          name: 'badges',
          title: 'Бейджі (спани)',
          type: 'object',
          fields: [
            defineField({
              name: 'borderColor',
              title: 'Колір рамки бейджів',
              type: 'string',
              options: { list: [...badgeBorderColors], layout: 'dropdown' },
              initialValue: 'mint',
            }),
            defineField({
              name: 'items',
              title: 'Тексти бейджів',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),

        defineField({
          name: 'order',
          title: 'Порядок елементів у контенті',
          description:
            'Перетягніть, щоб змінити порядок. Можна прибирати елементи, якщо вони не потрібні.',
          type: 'array',
          of: [{ type: 'aboutContentOrderItem' }],
          options: { sortable: true },
          initialValue: [
            { _type: 'aboutContentOrderItem', kind: 'h3' },
            { _type: 'aboutContentOrderItem', kind: 'paragraphs' },
            { _type: 'aboutContentOrderItem', kind: 'h4' },
            { _type: 'aboutContentOrderItem', kind: 'badges' },
          ],
          validation: (Rule) =>
            Rule.unique().error('Елементи не повинні повторюватися'),
        }),
      ],
    }),
  ],

  preview: {
    select: { adminTitle: 'adminTitle', heading: 'heading' },
    prepare({ adminTitle, heading }) {
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція «Про нас»',
        subtitle: heading || undefined,
      }
    },
  },
})
