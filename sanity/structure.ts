// structure.ts
import { StructureBuilder } from 'sanity/structure'
import { AddIcon, CogIcon, DocumentIcon, EarthGlobeIcon } from '@sanity/icons'

import { SUPPORTED_LANGS } from './constants'


export const appStructure = async (
  S: StructureBuilder,
  _opts: { getClient: (opts: { apiVersion: string }) => any }
) => {
  return S.list()
    .title('Контент')
    .items([
      S.listItem()
        .id('global-settings')
        .title('Налаштування Header & Footer')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Виберіть мову')
            .items(
              SUPPORTED_LANGS.map((lang) =>
                S.listItem()
                  .id(`gs-${lang.id}`)
                  .title(lang.title)
                  .icon(EarthGlobeIcon)
                  .child(
                    S.editor()
                      .schemaType('globalSettings')
                      .documentId(`globalSettings-${lang.id}`)
                      .title(`Налаштування (${lang.title})`)
                      .initialValueTemplate(`globalSettings-${lang.id}-base`)
                  )
              )
            )
        ),

      S.divider(),
      S.listItem()
        .title('Створити нову сторінку')
        .icon(AddIcon)
        .child(
          S.list()
            .title('Виберіть мову')
            .items(
              SUPPORTED_LANGS.map((lang) =>
                S.listItem()
                  .title(lang.title)
                  .icon(EarthGlobeIcon)
                  .child(
                    S.documentTypeList('page')
                      .title(`Сторінки (${lang.title})`)
                      .filter('_type == "page" && language == $lang')
                      .params({ lang: lang.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem(`page-${lang.id}-base`),
                      ])
                  )
              )
            )
        ),

      S.divider(),

      S.documentTypeListItem('page')
        .title('Сторінки')
        .icon(DocumentIcon),
    ])
}