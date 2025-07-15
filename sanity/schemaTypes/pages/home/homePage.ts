import { defineType, defineField } from 'sanity'
import { head } from '../../shared/head'
import { header } from '../../shared/header';
import { footer } from '../../shared/footer'
import { LOCALE } from '../../../constants';

// uk_UA
// en_GB
// de_DE
// de_AU
// locale_Region
export default defineType({
  name: 'homePage',
  title: 'Головна сторінка',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Мова',
      type: 'string',
      options: {
        list: [
          { title: 'Українська', value: LOCALE.Uk },
          { title: 'English', value: LOCALE.En }
        ],
        layout: 'radio',
      },
      initialValue: LOCALE.Uk,
      validation: Rule => Rule.required(),
    }),
    defineField(head),
    defineField(header), // move to Global settings 
    defineField(footer), // move to Global settings 
    defineField({
      name: 'sections',
      title: 'Секції сторінки',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'directionsSection' },
        { type: 'aboutUsSection' },
        { type: 'featuresSection' },
        { type: 'reviewsSection' },
        { type: 'newSchoolSection' },
        { type: 'teamSection' },
        { type: 'faqSection' },
      ],
      options: {
        layout: 'grid',
      },
      validation: Rule => Rule.min(1).error('Повинна бути принаймні одна секція'),
    }),
  ],
  preview: {
    select: {
      title: 'language', 
      seoTitle: 'head.title', 
    },
    prepare({ title, seoTitle }) {
      const langMap: { [key: string]: string } = {
        'ua': 'Українська',
        'en': 'English'
      };
      const displayLang = langMap[title] || title; 
      return {
        title: `Головна сторінка (${displayLang})`,
        subtitle: seoTitle ? `SEO заголовок: "${seoTitle}"` : `Мова: ${displayLang}`, 
      };
    },
  },




  
})