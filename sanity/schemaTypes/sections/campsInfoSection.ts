import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const campsInfoSection = defineType({
  name: 'campsInfoSection',
  title: 'Секція з інформацією про табір',
  type: 'object',
  icon: ImagesIcon,

  fields: [
    defineField({
      name: 'images',
      title: 'Зображення',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          title: 'Зображення',
          type: 'image',
          fields: [defineField({ name: 'alt', title: 'Alt текст', type: 'string' })]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'Секція з інформацією про табір',
    },
    prepare({ title }) {
      return { 
        title: `Секція з інформацією про табір`
      }
    }
  }
})
