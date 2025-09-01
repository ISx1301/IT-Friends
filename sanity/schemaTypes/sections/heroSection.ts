import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise'},
]

export const heroSectionMainSection = defineType({
  name: 'heroSectionMainSection',
  title: 'Hero секція (головна сторінка)',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: backgroundColors, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H1)',
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
      validation: (Rule) =>
        Rule.custom((val: any) => {
          if (!Array.isArray(val) || val.length === 0) return 'Заповніть заголовок'
          const hasText = val.some(
            (blk: any) =>
              blk?._type === 'block' &&
              Array.isArray(blk.children) &&
              blk.children.some(
                (ch: any) => ch?._type === 'span' && String(ch.text || '').trim().length > 0
              )
          )
          return hasText || 'Заголовок не може бути порожнім'
        }),
    }),

    defineField({
      name: 'description',
      title: 'Опис',
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'button',
      title: 'Кнопка',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'text',
          title: 'Текст кнопки',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'linkType',
          title: 'Куди веде',
          type: 'string',
          initialValue: 'page',
          options: {
            layout: 'radio',
            list: [
              { title: 'Сторінка', value: 'page' },
              { title: 'Якір', value: 'anchor' },
              { title: 'Зовнішній ресурс', value: 'external' },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'page',
          title: 'Сторінка',
          type: 'reference',
          to: [{ type: 'page' }],
          hidden: ({ parent }) => (parent as any)?.linkType !== 'page',
          validation: (Rule) =>
            Rule.custom((val, ctx) => {
              const lt = (ctx.parent as any)?.linkType
              if (lt !== 'page') return true
              return val ? true : 'Оберіть сторінку'
            }),
        }),
        defineField({
          name: 'anchor',
          title: 'Якір (починається з "#")',
          type: 'string',
          hidden: ({ parent }) => (parent as any)?.linkType !== 'anchor',
          validation: (Rule) =>
            Rule.custom<string>((val, ctx) => {
              const lt = (ctx.parent as any)?.linkType
              if (lt !== 'anchor') return true
              if (!val || !val.trim()) return 'Вкажіть якір'
              return val.startsWith('#') ? true : 'Якір має починатися з #'
            }),
        }),
        defineField({
          name: 'externalUrl',
          title: 'Зовнішній URL',
          type: 'url',
          hidden: ({ parent }) => (parent as any)?.linkType !== 'external',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'] }).error('Вкажіть коректний URL'),
        }),
      ],
      preview: {
        select: { title: 'text', subtitle: 'linkType' },
        prepare: ({ title, subtitle }) => ({ title: title || '—', subtitle }),
      },
    }),

    defineField({
      name: 'stats',
      title: 'Статистика',
      type: 'array',
      of: [
        defineField({
          name: 'statItem',
          title: 'Елемент статистики',
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Число (наприклад "20+")',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Опис (можна з <br/>)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),

    defineField({
      name: 'imageColumns',
      title: 'Колонки з картинками (ВІД 4-х)',
      type: 'array',
      of: [
        defineField({
          name: 'imageColumn',
          title: 'Колонка',
          type: 'object',
          fields: [
            defineField({
              name: 'images',
              title: 'Зображення',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt текст',
                      type: 'string',
                      validation: (Rule) => Rule.required().error('Alt обовʼязковий'),
                    }),
                  ],
                },
              ],
              validation: (Rule) => Rule.min(1),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],

  preview: { prepare() { return { title: 'Hero секція (головна сторінка)' } } },
})