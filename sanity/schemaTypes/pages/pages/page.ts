import { defineType, defineField } from 'sanity'
import { PrefixedSlugInput } from '../../../components/PrefixedSlugInput'

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
      options: { 
        source: 'title', 
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      components: {
        input: PrefixedSlugInput
      }
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'head' }),
    defineField({
      name: 'sections',
      title: 'Секції',
      type: 'array',
      of: [
        { type: 'heroSectionMainSection' },
        { type: 'areasOfStudyMainSection' },
        { type: 'aboutSection' },
        { type: 'peculiaritiesSection' },
        { type: 'reviewsSection' },
        { type: 'newSchoolMainSection' },
        { type: 'teamSection' },
        { type: 'accordionSection' },
        { type: 'heroZoomImageSection' },
        { type: 'generalDescriptionSection' },
        { type: 'withoutNestedTabsSection' },
        { type: 'withNestedTabsCampsSection' },
        { type: 'interestingThingsSection'},
        { type: 'offlineAddressesEnglishSection'},
        { type: 'videoCampsSection' },
        { type: 'heroBlogSection' },
        { type: 'postListSection' },
        { type: 'campsInfoSection' },
      ],
    }),
  ],
  // ? Predefine values
  initialValue: {
    title: 'Нова сторінка',
    slug: { current: '/' }, 
    sections: [],
  },
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
    prepare({ title, subtitle }) {
      return { title: title || 'Без назви', subtitle: subtitle ? `/${subtitle}` : '' }
    },
  },
})