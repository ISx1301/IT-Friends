// sanity/schemaTypes/sections/aboutSectionMain.ts
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
              styles: [
                { title: 'Звичайний', value: 'normal' },
              ],
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
            'Перетягніть, щоб змінити порядок положення елемнтів. Можна прибирати елементи, якщо вони не потрібні.',
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
    select: { title: 'heading' },
    prepare() {
      return { title: 'Секція «Про нас»' }
    },
  },
})
