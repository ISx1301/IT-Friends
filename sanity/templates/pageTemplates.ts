import { type Template } from 'sanity'

import { SUPPORTED_LANGS } from '../constants'

export const pageTemplates: Template[] = SUPPORTED_LANGS.map((lang) => ({
  id: `page-${lang.id}-base`,
  title: `Нова сторінка (${lang.title})`,
  schemaType: 'page',
  value: () => ({
    language: lang.id,
  }),
}))