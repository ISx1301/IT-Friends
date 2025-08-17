// ./schemaTypes/sections/nestedTabsSection.ts
import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

// ==== Загальні кольори фону (як і раніше)
export const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
] as const

export type BgColor = typeof backgroundColors[number]['value']

/**
 * Визначаємо тип карток для поточної панелі через пошук у document.sections.
 * Шукаємо секцію, в якій є pillGroups[].panels[] з _key панелі, що редагується.
 * Не прив’язуємося до конкретного імені _type секції — так надійніше.
 */
function sectionCardsKindForNestedPanel(
  document: any,
  panelParent: any
): 'clickable' | 'regular' | undefined {
  if (!document || !panelParent?._key) return undefined
  const sections = Array.isArray(document.sections) ? document.sections : []

  const host = sections.find((s: any) =>
    Array.isArray(s?.pillGroups) &&
    s.pillGroups.some((g: any) =>
      Array.isArray(g?.panels) && g.panels.some((p: any) => p?._key === panelParent._key)
    )
  )

  return host?.cardsKind
}

export const withNestedTabsCampsSection = defineType({
  name: 'withNestedTabsCampsSection',
  title: 'Секція «Таби (pills + tabs)»',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    // Колір фону
    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: [...backgroundColors], layout: 'dropdown' },
      description: 'Опціонально',
    }),

    // Заголовок H2
    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      description: 'Опціонально',
    }),

    // Короткий опис під заголовком (Portable Text)
    defineField({
      name: 'intro',
      title: 'Короткий опис під заголовком',
      description: 'Enter = новий абзац (опціонально)',
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

    // Колір внутрішніх табів
    defineField({
      name: 'innerTabsColorKey',
      title: 'Колір внутрішніх табів',
      type: 'string',
      options: {
        list: [
          { title: 'Сірий', value: 'gray' },
          { title: 'Піщаний', value: 'sand' },
        ],
        layout: 'radio',
      },
      initialValue: 'gray',
      description: 'Опціонально',
    }),

    // Тип карток для всієї секції
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
      description: 'Застосовується до всіх вкладених табів і карток',
    }),

    // Зовнішні PILLS-групи
    defineField({
      name: 'pillGroups',
      title: 'Pills-групи (зовнішні таби)',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'pillGroup',
          title: 'Група (Pill)',
          fields: [
            defineField({ name: 'label', title: 'Назва групи (pill)', type: 'string' }),
            defineField({
              name: 'icon',
              title: 'Іконка групи',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
            }),
            defineField({
              name: 'text',
              title: 'Текст біля іконки (опціонально)',
              type: 'string',
            }),

            // Внутрішні таби для цієї групи
            defineField({
              name: 'tabs',
              title: 'Внутрішні таби',
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
                      title: 'Іконка таба',
                      type: 'image',
                      options: { hotspot: true },
                      fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
                    }),
                    defineField({ name: 'text', title: 'Текст біля іконки', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'label', media: 'icon' },
                    prepare: ({ title, media }) => ({ title: title || 'Таб без назви', media }),
                  },
                }),
              ],
              description: 'Порядок табів відповідає порядку панелей нижче',
            }),

            // Панелі (контент) для внутрішніх табів
            defineField({
              name: 'panels',
              title: 'Панелі (контент внутрішніх табів)',
              type: 'array',
              of: [
                defineField({
                  type: 'object',
                  name: 'panel',
                  title: 'Панель таба',
                  fields: [
                    // Опис панелі (лише для клікабельних карток)
                    defineField({
                      name: 'panelDescription',
                      title: 'Опис контенту',
                      description: 'Enter = новий абзац (опціонально)',
                      type: 'array',
                      hidden: ({ document, parent }) =>
                        sectionCardsKindForNestedPanel(document, parent) !== 'clickable',
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

                    // Клікабельні картки
                    defineField({
                      name: 'clickableCards',
                      title: 'Картки (клікабельні)',
                      type: 'array',
                      hidden: ({ document, parent }) =>
                        sectionCardsKindForNestedPanel(document, parent) !== 'clickable',
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
                            defineField({ name: 'phone', title: 'Номер телефону', type: 'string' }),
                            defineField({
                              name: 'href',
                              title: 'Посилання (href)',
                              type: 'url',
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

                    // Звичайні картки (оновлений склад полів)
                    defineField({
                      name: 'regularCards',
                      title: 'Картки (звичайні блоки)',
                      type: 'array',
                      hidden: ({ document, parent }) =>
                        sectionCardsKindForNestedPanel(document, parent) !== 'regular',
                      of: [
                        defineField({
                          type: 'object',
                          name: 'regularCard',
                          title: 'Картка (блок)',
                          fields: [
                            // Картинка
                            defineField({
                              name: 'image',
                              title: 'Картинка',
                              type: 'image',
                              options: { hotspot: true },
                              fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
                            }),

                            // Заголовок
                            defineField({
                              name: 'title',
                              title: 'Підзаголовок (H3)',
                              type: 'string',
                              description: 'Опціонально',
                            }),

                            // Вік / вікова група (простий текст)
                            defineField({
                              name: 'ageText',
                              title: 'Вік / Вікова група',
                              type: 'string',
                              description: 'Опціонально, напр.: “7–8 років”',
                            }),

                            // Локація: іконка + заголовок
                            defineField({
                              name: 'location',
                              title: 'Локація',
                              type: 'object',
                              fields: [
                                defineField({
                                  name: 'icon',
                                  title: 'Іконка',
                                  type: 'image',
                                  options: { hotspot: true },
                                  fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })],
                                }),
                                defineField({
                                  name: 'title',
                                  title: 'Назва локації',
                                  type: 'string',
                                }),
                              ],
                            }),

                            // Опис (Portable Text)
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

                            // Текст кнопки
                            defineField({
                              name: 'buttonText',
                              title: 'Текст кнопки',
                              type: 'string',
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'title',
                              media: 'image',
                              age: 'ageText',
                              loc: 'location.title',
                            },
                            prepare: ({ title, media, age, loc }) => ({
                              title: title || 'Картка (блок)',
                              subtitle: [age, loc].filter(Boolean).join(' • ') || undefined,
                              media,
                            }),
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
                      return { title: 'Панель таба', subtitle: `Карток: ${c1 + c2}` }
                    },
                  },
                }),
              ],
              // tabs і panels всередині групи мають збігатися за кількістю
              validation: (Rule) =>
                Rule.custom((panels, ctx) => {
                  const group = ctx?.parent as any
                  const tabs = group?.tabs
                  if (!Array.isArray(tabs) || !Array.isArray(panels)) return true
                  return tabs.length === panels.length || 'Кількість панелей має дорівнювати кількості внутрішніх табів'
                }),
            }),
          ],
          preview: {
            select: { title: 'label', tabs: 'tabs' },
            prepare: ({ title, tabs }) => ({
              title: title || 'Pill-група',
              subtitle: `Внутрішніх табів: ${Array.isArray(tabs) ? tabs.length : 0}`,
            }),
          },
        }),
      ],
    }),

    // Тексти кнопок секції
    defineField({
      name: 'showMoreText',
      title: 'Текст кнопки «Дивитися більше»',
      type: 'string',
      description: 'Опціонально (для звичайних карток)',
    }),
    defineField({
      name: 'buttonText',
      title: 'Текст кнопки у «clickable»',
      type: 'string',
      description: 'Опціонально (CTA під сіткою клікабельних карток)',
    }),
  ],

  preview: {
    select: { title: 'heading', groups: 'pillGroups', kind: 'cardsKind' },
    prepare({ title, groups, kind }) {
      const count = Array.isArray(groups) ? groups.length : 0
      const first = (Array.isArray(groups) ? groups : [])
        .map((g: any) => g?.label)
        .filter(Boolean)
        .slice(0, 3)
        .join(' • ')
      return {
        title: `Секція «Таби (pills + tabs)» | ${title}`,
        subtitle: `${kind === 'clickable' ? 'Клікабельні' : 'Звичайні'} | Груп: ${count}${first ? ' | ' + first : ''}`,
      }
    },
  },
})