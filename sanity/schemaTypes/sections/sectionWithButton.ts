import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { buttonClassField } from '../shared/buttonClassField'

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

export const sectionWithButton = defineType({
  name: 'sectionWithButton',
  title: 'Секція з кнопкою',
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
      name: 'buttonText',
      title: 'Текст кнопки',
      type: 'string',
      initialValue: 'Записатися',
      validation: (Rule) => Rule.required().error('Нужно ввести текст кнопки'),
    }),

    
    buttonClassField,
  ],

  preview: {
    select: { adminTitle: 'adminTitle', title: 'heading', order: 'order', media: 'mainImage' },
    prepare({ adminTitle }) {
      return {
        title: (adminTitle && adminTitle.trim()) || 'Секція з Zoom картинкою',
      }
    },
  },
})
