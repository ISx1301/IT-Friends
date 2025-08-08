// sanity.config.ts
import { defineConfig, type Template } from 'sanity'
import { structureTool } from 'sanity/structure'
import { documentInternationalization } from '@sanity/document-internationalization'

import { appStructure } from './structure'
import { schemaTypes } from './schemaTypes'
import { localizedSchemaTypes, SUPPORTED_LANGS } from './constants'
import { pageTemplates } from './templates/pageTemplates'
import { withLanguageField } from './utils/withLanguageField'
import { globalSettingsTemplates } from './templates/globalSettingsTemplates'

export default defineConfig({
  name: 'default',
  title: 'IT Friends CMS',
  subtitle: 'A site for a it school',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: 'production',

  plugins: [
    structureTool({ structure: appStructure }),
    documentInternationalization({
      supportedLanguages: SUPPORTED_LANGS,
      schemaTypes: localizedSchemaTypes,
    }),
  ],

  schema: {
    types: withLanguageField(schemaTypes, localizedSchemaTypes),
    templates: (prev: Template[]): Template[] => [
      ...prev.filter(t => !localizedSchemaTypes.includes(t.schemaType)), // only page type
      ...pageTemplates,
      ...globalSettingsTemplates
    ],
  },
})