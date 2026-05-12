import { defineField } from 'sanity'

export const BUTTON_CLASS_OPTIONS = [
  { title: 'IT заняття (за замовчуванням)', value: 'free-lesson-open' },
  { title: 'Табори TOUR FRIENDS',           value: 'camp-form-open' },
  { title: 'Англійська',                    value: 'english-lesson-form-open' },
  { title: 'Заняття Онлайн',               value: 'online-lesson-form-open' },
] as const

export const buttonClassField = defineField({
  name: 'buttonClass',
  title: 'Дія кнопки',
  type: 'string',
  description: 'Яку форму відкриває кнопка. Якщо не вказано — IT заняття.',
  options: {
    list: [...BUTTON_CLASS_OPTIONS],
    layout: 'dropdown',
  },
})
