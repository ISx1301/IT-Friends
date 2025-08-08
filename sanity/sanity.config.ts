// sanity.config.ts
import { defineConfig, type Template } from 'sanity'
import { structureTool } from 'sanity/structure'
import { documentInternationalization } from '@sanity/document-internationalization'

import { appStructure } from './structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'IT Friends CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: 'production',

  plugins: [
    structureTool({ structure: appStructure }),
    documentInternationalization({
      supportedLanguages: [
        { id: 'uk', title: 'Українська' },
        { id: 'en', title: 'English' },
      ],
      schemaTypes: ['globalSettings', 'page'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  templates: (prev: Template[]): Template[] => [
    ...prev,
    {
      id: 'page-uk-base',
      title: 'Нова сторінка (UA)',
      schemaType: 'page',
      value: () => ({
        __i18n_lang: 'uk',
      }),
    },
    {
      id: 'page-en-base',
      title: 'Нова сторінка (EN)',
      schemaType: 'page',
      parameters: [{ name: 'baseId', type: 'string' }],
      value: ({ baseId }: { baseId: string }) => ({
        __i18n_lang: 'en',
        __i18n_base: { _type: 'reference', _ref: baseId },
      }),
    },
  ],
})