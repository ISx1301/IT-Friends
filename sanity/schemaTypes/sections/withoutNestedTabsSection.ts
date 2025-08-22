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

function sectionCardsKindForPanel(document: any, panelParent: any): 'clickable' | 'regular' | undefined {
  if (!document || !panelParent?._key) return undefined
  const sections = Array.isArray(document.sections) ? document.sections : []
  const host = sections.find((s: any) => Array.isArray(s?.panels) && s.panels.some((p: any) => p?._key === panelParent._key))
  return host?.cardsKind
}

const classValidation = (Rule: any) =>
  Rule.custom((val: string) => {
    if (!val) return true
    return /^[A-Za-z0-9:_\-\s]+$/.test(val)
      ? true
      : 'Дозволені: літери, цифри, дефіс, підкреслення, двокрапка та пробіли'
  })

export const withoutNestedTabsSection = defineType({
  name: 'withoutNestedTabsSection',
  title: 'Секція «Таби (only tabs)»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: [...backgroundColors], layout: 'dropdown' },
      description: 'Опціонально',
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      description: 'Опціонально',
    }),

    defineField({
      name: 'tabsColorKey',
      title: 'Колір табів',
      type: 'string',
      options: {
        list: [
          { title: 'Сірий', value: 'gray' },
          { title: 'Піщаний', value: 'sand' },
        ],
        layout: 'radio',
      },
      initialValue: 'gray',
      description: 'Колір інтерфейсу табів (кнопки/розділювач).',
    }),

    defineField({
      name: 'cardsKind',
      title: 'Тип карток у секції',
      type: 'string',
      options: {
        list: [
          { title: 'Клікабельні (посилання)', value: 'clickable' },
          { title: 'Звичайні (блоки)', value: 'regular' },
        ],
        layout: 'radio',
      },
      initialValue: 'regular',
      description: 'Застосовується до всіх панелей і карток нижче',
    }),

    defineField({
      name: 'tabs',
      title: 'Таби',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'tab',
          title: 'Таб',
          fields: [
            defineField({ name: 'label', title: 'Назва таба', type: 'string' }),
            defineField({
              name: 'icon',
              title: 'Іконка (картинка)',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
            }),
            defineField({
              name: 'text',
              title: 'Текст біля іконки',
              type: 'string',
              description: 'Опціонально',
            }),
          ],
          preview: {
            select: { title: 'label', media: 'icon' },
            prepare: ({ title, media }) => ({ title: title || 'Таб без назви', media }),
          },
        }),
      ],
      description: 'Порядок табів = порядок панелей нижче (опціонально)',
    }),

    defineField({
      name: 'panels',
      title: 'Панелі табів (контент)',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'panel',
          title: 'Панель таба',
          fields: [
            defineField({
              name: 'panelDescription',
              title: 'Опис контенту',
              description: 'Enter = новий абзац (опціонально)',
              type: 'array',
              hidden: ({ document, parent }) => sectionCardsKindForPanel(document, parent) !== 'clickable',
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

            defineField({
              name: 'clickableCards',
              title: 'Картки (клікабельні)',
              type: 'array',
              hidden: ({ document, parent }) => sectionCardsKindForPanel(document, parent) !== 'clickable',
              of: [
                defineField({
                  type: 'object',
                  name: 'clickableCard',
                  title: 'Карта (посилання)',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Картинка',
                      type: 'image',
                      options: { hotspot: true },
                      fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
                    }),
                    defineField({ name: 'title', title: 'Підзаголовок (H3)', type: 'string' }),
                    defineField({ name: 'plainDescription', title: 'Опис (простий текст)', type: 'text', rows: 3 }),
                    defineField({ name: 'phone', title: 'Номер телефону', type: 'string', description: 'Опціонально' }),
                    defineField({
                      name: 'href',
                      title: 'Посилання (href)',
                      type: 'url',
                      description: 'Опціонально: якщо хочеш робити всю картку <a>',
                      validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                    }),
                  ],
                  preview: {
                    select: { title: 'title', media: 'image', href: 'href' },
                    prepare: ({ title, media, href }) => ({
                      title: title || 'Клікабельна картка',
                      subtitle: href ? String(href) : 'без посилання',
                      media,
                    }),
                  },
                }),
              ],
            }),

            defineField({
              name: 'regularCards',
              title: 'Картки (звичайні блоки)',
              type: 'array',
              hidden: ({ document, parent }) => sectionCardsKindForPanel(document, parent) !== 'regular',
              of: [
                defineField({
                  type: 'object',
                  name: 'regularCard',
                  title: 'Картка (блок)',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Картинка',
                      type: 'image',
                      options: { hotspot: true },
                      fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
                    }),
                    defineField({
                      name: 'title',
                      title: 'Підзаголовок (H3)',
                      type: 'string',
                      description: 'Опціонально',
                    }),
                    defineField({
                      name: 'ptDescription',
                      title: 'Опис (Portable Text)',
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
                    defineField({ name: 'buttonText', title: 'Текст кнопки', type: 'string' }),

                    defineField({
                      name: 'buttonClass',
                      title: 'CSS-клас (для розробника)',
                      type: 'string',
                      description: 'Опціонально.',
                      validation: classValidation,
                    }),
                  ],
                  preview: {
                    select: { title: 'title', media: 'image' },
                    prepare: ({ title, media }) => ({ title: title || 'Картка (блок)', media }),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { cards1: 'clickableCards', cards2: 'regularCards' },
            prepare: ({ cards1, cards2 }) => {
              const c1 = Array.isArray(cards1) ? cards1.length : 0
              const c2 = Array.isArray(cards2) ? cards2.length : 0
              const total = c1 + c2
              return { title: 'Панель таба', subtitle: `Карток: ${total}` }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((panels, ctx) => {
          const tabs = (ctx?.parent as any)?.tabs
          if (!Array.isArray(tabs) || !Array.isArray(panels)) return true
          return tabs.length === panels.length || 'Кількість панелей має дорівнювати кількості табів'
        }),
      description: 'Кількість панелей має відповідати кількості табів',
    }),

    defineField({
      name: 'showMoreText',
      title: 'Текст кнопки «Дивитися більше»',
      type: 'string',
      description: 'Опціонально. Використовується для звичайних карток',
    }),

    defineField({
      name: 'buttonText',
      title: 'Текст кнопки в секції, де використовуються клікабельні картки',
      type: 'string',
      description: 'Опціонально. Використовується для клікабельних карток',
    }),
  ],

  preview: {
    select: { title: 'heading', tabs: 'tabs', kind: 'cardsKind', tabsColorKey: 'tabsColorKey' },
    prepare({ title, tabs, kind, tabsColorKey }) {
      const tabsCount = Array.isArray(tabs) ? tabs.length : 0
      const firstLabels = (Array.isArray(tabs) ? tabs : [])
        .map((t: any) => t?.label)
        .filter(Boolean)
        .slice(0, 3)
        .join(' • ')
      return {
        title: 'Секція «Таби (only tabs)»',
        subtitle: `${kind === 'clickable' ? 'Клікабельні' : 'Звичайні'} | Таби: ${tabsCount}${firstLabels ? ' | ' + firstLabels : ''} | color: ${tabsColorKey || 'gray'}`,
      }
    },
  },
})
