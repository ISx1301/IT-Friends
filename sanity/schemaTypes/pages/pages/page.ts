// ./schemaTypes/pages/pages/page.ts
import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Сторінка',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Назва сторінки', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'head' }),
    defineField({
      name: 'sections',
      title: 'Секції',
      type: 'array',
       of: [{ type: 'aboutUsSection' }, { type: 'directionsSection' }],
    }),
  ],
  initialValue: {
    title: 'New page',
    slug: { current: 'new-page' },
    sections: [],
  },
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
       return { title: title || 'Без назви', subtitle: subtitle ? `/${subtitle}` : '' }
    },
  },
})