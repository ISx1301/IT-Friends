import { defineType, defineField, defineArrayMember } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

const backgroundColors = [
  { title: 'Білий', value: 'white' },
  { title: 'Сірий', value: 'gray' },
  { title: 'Піщаний градієнт', value: 'sand-gradient' },
  { title: 'М’ятний', value: 'mint' },
  { title: 'Прозорий', value: 'transparent' },
  { title: 'Бірюзовий', value: 'turquoise' },
]

const classValidation = (Rule: any) =>
  Rule.custom((val: string) => {
    if (!val) return true
    return /^[A-Za-z0-9\-\_: ]+$/.test(val)
      ? true
      : 'Дозволені: літери, цифри, дефіс, підкреслення, двокрапка та пробіли'
  })

const paddingValidation = (Rule: any) =>
  Rule.required().custom((val: string) => {
    if (typeof val !== 'string' || !val.trim()) {
      return 'Заповніть відступи секції (Tailwind класи)'
    }
    const tokens = val.trim().split(/\s+/)
    const ok = tokens.every((t) =>
      /^(?:[a-z]+:)?p[bt]-(?:px|0|[1-9]\d*)$/.test(t)
    )
    return ok
      ? true
      : 'Використовуйте лише pt-*/pb-* (наприклад: "pt-5 pb-5 lg:pt-10 lg:pb-12")'
  })

export const areasOfStudyMainSection = defineType({
  name: 'areasOfStudyMainSection',
  title: 'Секція «Напрямки»',
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
      description: 'Наприклад: pt-20 pb-20 lg:pt-32 lg:pb-32. Перелік значень та інструкції — у розділі «Інфо».',
      initialValue: 'pt-5 pb-5',
      validation: paddingValidation,
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Колір фону',
      type: 'string',
      options: { list: backgroundColors, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Заголовок (H2)',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: 'cards',
      title: 'Картки',
      type: 'array',
      validation: (Rule) => Rule.min(1).required(),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          title: 'Картка',
          fields: [
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Заголовок (H3)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ageText',
              title: 'Текст про вік',
              description: 'Наприклад: "Діти від 7–8 років"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'paragraphs',
              title: 'Опис',
              description: 'Enter = новий абзац',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{ title: 'Звичайний', value: 'normal' }],
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
              options: { sortable: true },
              validation: (Rule) => Rule.min(1).required(),
            }),
            defineField({
              name: 'primaryButtonText',
              title: 'Текст першої кнопки',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'secondaryButtonText',
              title: 'Текст другої кнопки',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'secondaryButtonClass',
              title: 'CSS-клас (для розробника)',
              type: 'string',
              description: 'Опціонально',
              validation: classValidation,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'ageText', media: 'image' },
          },
        }),
      ],
    }),

    defineField({
      name: 'sectionCtaText',
      title: 'Текст головної кнопки секції',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'sectionCtaClass',
      title: 'CSS-клас (для розробника)',
      type: 'string',
      description: 'Опціонально',
      validation: classValidation,
    }),
  ],

  preview: {
    select: {
      adminTitle: 'adminTitle',
      heading: 'heading',
      headingOverride: 'headingOverride',
    },
    prepare({ adminTitle, heading, headingOverride }: any) {
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція «Напрямки»',
        subtitle:
          (headingOverride && headingOverride.trim()) || heading || undefined,
      }
    },
  },
})