import { defineType, defineField } from 'sanity'

export const directionsSection = defineType({
  name: 'directionsSection',
  title: 'Секція "Напрямки"',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Заголовок', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Елементи',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ]
})
