// ./schemas/objects/areasOfStudyMainSection.ts
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

export const areasOfStudyMainSection = defineType({
  name: 'areasOfStudyMainSection',
  title: 'Секція «Напрямки»',
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
              title: 'Текст першої кнопки (кнопку видно всюди)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'secondaryButtonText',
              title: 'Текст другої кнопки (кнопку видно тільки на мобільній версії)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'secondaryButtonClass',
              title: 'CSS-клас для другої кнопки',
              type: 'string',
              description: 'Опціонально.',
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
      title: 'CSS-клас головної кнопки',
      type: 'string',
      description: 'Опціонально.',
      validation: classValidation,
    }),
  ],

  preview: {
    select: { title: 'heading' },
    prepare() {
      return { title: 'Секція «Напрямки»' }
    },
  },
})
