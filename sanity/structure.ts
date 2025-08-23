// structure.ts
import { StructureBuilder } from 'sanity/structure'
import EditorReadme from './components/EditorReadme'
import { AddIcon, CogIcon, DocumentIcon, EarthGlobeIcon, BlockContentIcon, BookIcon } from '@sanity/icons'

import { SUPPORTED_LANGS } from './constants'


export const appStructure = async (
  S: StructureBuilder,
  _opts: { getClient: (opts: { apiVersion: string }) => any }
) => {
  return S.list()
    .title('Контент')
    .items([

      S.listItem()
        .title('Інфо')
        .icon(BookIcon)
        .child(
          S.component()
            .id('editor-readme')        
            .title('Інфо')     
            .component(EditorReadme) 
        ),

      S.divider(),

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

      
      S.documentTypeListItem('page')
        .title('Сторінки')
        .icon(DocumentIcon),

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

      S.documentTypeListItem('blog')
        .title('Статті')
        .icon(DocumentIcon),

      S.listItem()
        .title('Нова стаття')
        .icon(BlockContentIcon)
        .child(
          S.list()
            .title('Виберіть мову')
            .items(
              SUPPORTED_LANGS.map((lang) =>
                S.listItem()
                  .title(lang.title)
                  .icon(EarthGlobeIcon)
                  .child(
                    S.documentTypeList('blog')
                      .title(`Статті (${lang.title})`)
                      .filter('_type == "blog" && language == $lang')
                      .params({ lang: lang.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem(`blog-${lang.id}-base`),
                      ])
                  )
              )
            )
        ),

    ])
}