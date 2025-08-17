// ./schemaTypes/settings/globalSettings.ts
import { defineType, defineField, defineArrayMember  } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Налаштування Header & Footer (для всіх сторінок)',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Хедер',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Логотип',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt текст',
              type: 'string',
              validation: (Rule) =>
                Rule.required().error('Alt текст обовʼязковий'),
            }),
          ],
        }),
        // defineField({
        //   name: 'logoLink',
        //   title: 'Куди веде клік на логотип',
        //   type: 'reference',
        //   to: [{ type: 'page' }],
        //   validation: (Rule) =>
        //     Rule.required().error('Потрібно вибрати сторінку'),
        // }),

        defineField({
          name: 'socials',
          title: 'Соціальні мережі',
          type: 'array',
          of: [
            defineField({
              name: 'socialItem',
              title: 'Пункт соцмережі',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Іконка',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule) =>
                    Rule.required().error('Іконка обовʼязкова'),
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt текст',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Alt текст обовʼязковий'),
                }),
                defineField({
                  name: 'link',
                  title: 'Посилання на соцмережу',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({ scheme: ['http', 'https'] })
                      .required()
                      .error('Вкажіть коректне URL'),
                }),
              ],
            }),
          ],
        }),

        defineField({
          name: 'navigation',
          title: 'Меню навігації',
          type: 'array',
          of: [
            defineField({
              name: 'navItem',
              title: 'Пункт меню',
              type: 'object',
              fields: [

                defineField({
                  name: 'text',
                  title: 'Текст пункту',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Вкажіть текст'),
                }),

                defineField({
                  name: 'submenu',
                  title: 'Підпункти (необовʼязково)',
                  type: 'array',
                  of: [
                    defineField({
                      name: 'subNavItem',
                      title: 'Підпункт меню',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'text',
                          title: 'Текст підпункту',
                          type: 'string',
                          validation: (Rule) =>
                            Rule.required().error('Вкажіть текст'),
                        }),
                        defineField({
                          name: 'linkType',
                          title: 'Куди веде',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Сторінка', value: 'page' },
                              { title: 'Якір на цій сторінці', value: 'anchor' },
                            ],
                            layout: 'radio',
                          },
                          initialValue: 'page',
                          validation: (Rule) => Rule.required(),
                          hidden: ({ parent }) =>
                            Array.isArray((parent as any).submenu) &&
                            (parent as any).submenu.length > 0,
                        }),
                        defineField({
                          name: 'page',
                          title: 'Сторінка',
                          type: 'reference',
                          to: [{ type: 'page' }],
                          hidden: ({ parent }) =>
                            (parent as any).linkType !== 'page' ||
                            ((parent as any).submenu?.length ?? 0) > 0,
                          validation: (Rule) =>
                            Rule.custom((value, context) => {
                              const p = context.parent as any
                              if (
                                Array.isArray(p.submenu) &&
                                p.submenu.length > 0
                              )
                                return true
                              if (p.linkType !== 'page') return true
                              return value ? true : 'Оберіть сторінку'
                            }),
                        }),
                        defineField({
                          name: 'anchor',
                          title: 'Якір (починається з "#")',
                          type: 'string',
                          hidden: ({ parent }) =>
                            (parent as any).linkType !== 'anchor' ||
                            ((parent as any).submenu?.length ?? 0) > 0,
                          validation: (Rule) =>
                            Rule.custom((value, context) => {
                              const p = context.parent as any
                              if (
                                Array.isArray(p.submenu) &&
                                p.submenu.length > 0
                              )
                                return true
                              if (p.linkType !== 'anchor') return true
                              if (!value) return 'Вкажіть якiр'
                              return  true
                              // return value.startsWith('#')
                              //   ? true
                              //   : 'Якір повинен починатися з #'
                            }),
                        }),
                      ],
                    }),
                  ],
                }),

                defineField({
                  name: 'linkType',
                  title: 'Тип посилання',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Сторінка', value: 'page' },
                      { title: 'Якір на цій сторінці', value: 'anchor' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'page',
                  hidden: ({ parent }) =>
                    Array.isArray((parent as any).submenu) &&
                    (parent as any).submenu.length > 0,
                  validation: (Rule) =>
                    Rule.custom((_, context) => {
                      const p = (context.parent as any)
                      if (Array.isArray(p.submenu) && p.submenu.length > 0)
                        return true
                      return p.linkType ? true : 'Вкажіть тип посилання'
                    }),
                }),

                defineField({
                  name: 'page',
                  title: 'Сторінка',
                  type: 'reference',
                  to: [{ type: 'page' }],
                  hidden: ({ parent }) => {
                    const p = parent as any
                    return (
                      p.linkType !== 'page' ||
                      (Array.isArray(p.submenu) && p.submenu.length > 0)
                    )
                  },
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const p = context.parent as any
                      if (
                        Array.isArray(p.submenu) &&
                        p.submenu.length > 0
                      )
                        return true
                      if (p.linkType !== 'page') return true
                      return value ? true : 'Оберіть сторінку'
                    }),
                }),

                defineField({
                  name: 'anchor',
                  title: 'Якір (починається з "#")',
                  type: 'string',
                  hidden: ({ parent }) => {
                    const p = parent as any
                    return (
                      p.linkType !== 'anchor' ||
                      (Array.isArray(p.submenu) && p.submenu.length > 0)
                    )
                  },
                  validation: (Rule) =>
                    Rule.custom((value, context) => {
                      const p = context.parent as any
                      if (
                        Array.isArray(p.submenu) &&
                        p.submenu.length > 0
                      )
                        return true
                      if (p.linkType !== 'anchor') return true
                      if (!value) return 'Вкажіть якір'
                      return true
                      // return value.startsWith('#')
                      //   ? true
                      //   : 'Якір повинен починатися з #'
                    }),
                }),

              ],
            }),
          ],
        }),

        defineField({
          name: 'buttonText',
          title: 'Текст кнопки',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Футер',
      type: 'object',
      fields: [

        defineField({
          name: 'logo',
          title: 'Логотип футера',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt текст',
              type: 'string',
              validation: (Rule) =>
                Rule.required().error('Alt текст обовʼязковий'),
            }),
          ],
        }),
        // defineField({
        //   name: 'logoLink',
        //   title: 'Куди веде клік на логотип футера',
        //   type: 'reference',
        //   to: [{ type: 'page' }],
        //   validation: (Rule) =>
        //     Rule.required().error('Потрібно вибрати сторінку'),
        // }),

        defineField({
          name: 'description',
          title: 'Текст опис в футері',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'text',
              rows: 3,
              validation: (Rule) =>
                Rule.required().min(1).error('Абзац не може бути порожнім'),
            }),
          ],
          validation: (Rule) =>
            Rule.custom((val) =>
              val === undefined || (Array.isArray(val) && val.length >= 1)
                ? true
                : 'Додайте хоча б один абзац'
            ),
        }),

        ...[1, 2, 3].map((i) =>
          defineField({
            name: `navColumn${i}`,
            title: `Навігаційний блок ${i}`,
            type: 'array',
            of: [
              defineArrayMember({
                name: `navColItem${i}`,
                title: 'Пункт меню',
                type: 'object',
                fields: [
                  defineField({
                    name: 'text',
                    title: 'Текст',
                    type: 'string',
                    validation: (Rule) => Rule.required().error('Вкажіть текст'),
                  }),

                  defineField({
                    name: 'linkType',
                    title: 'Тип посилання',
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

                  // СТОРІНКА (reference)
                  defineField({
                    name: 'page',
                    title: 'Сторінка',
                    type: 'reference',
                    to: [{ type: 'page' }],
                    hidden: ({ parent }) => (parent as any)?.linkType !== 'page',
                    validation: (Rule) =>
                      Rule.custom((value, ctx) => {
                        const lt = (ctx.parent as any)?.linkType
                        if (lt !== 'page') return true
                        return value ? true : 'Оберіть сторінку'
                      }),
                  }),

                  // ЯКІР
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

                  // ЗОВНІШНІЙ URL
                  defineField({
                    name: 'externalUrl',
                    title: 'Зовнішній URL',
                    type: 'url',
                    hidden: ({ parent }) => (parent as any)?.linkType !== 'external',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https'] })
                        .error('Вкажіть коректний URL'),
                  }),
                ],
              }),
            ],
          })
        ),

        defineField({
          name: 'buttonText',
          title: 'Текст кнопки футера',
          type: 'string',
        }),

        defineField({
          name: 'socials',
          title: 'Соціальні мережі футера',
          type: 'array',
          of: [
            defineField({
              name: 'socialItemFooter',
              title: 'Пункт соцмережі',
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Іконка',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'alt',
                  title: 'Alt текст',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'link',
                  title: 'Посилання на соцмережу',
                  type: 'url',
                  validation: (Rule) =>
                    Rule.uri({ scheme: ['http', 'https'] }).required(),
                }),
              ],
            }),
          ],
        }),

        defineField({
          name: 'copyright',
          title: 'Текст копірайта',
          type: 'string',
        }),
      ],
    }),
  ],
})
