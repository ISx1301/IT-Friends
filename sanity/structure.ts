// structure.ts
import { StructureBuilder } from 'sanity/structure'
import { CogIcon, AddIcon, DocumentIcon, EarthGlobeIcon } from '@sanity/icons'

type PageRow = {
  _id: string
  title?: string
  enId?: string | null
}

type GlobalSettingsRow = {
  _id: string
  title?: string
  enId?: string | null
}

export const appStructure = async (
  S: StructureBuilder,
  { getClient }: { getClient: (opts: { apiVersion: string }) => any }
) => {
  const client = getClient({ apiVersion: '2023-10-01' })

  const pages: PageRow[] = await client.fetch(`
    *[
      _type == "page"
      && !defined(__i18n_base)
      && (!defined(__i18n_lang) || __i18n_lang == "uk")
    ] | order(title asc) {
      _id,
      title,
      "enId": *[
        _type == "page"
        && __i18n_lang == "en"
        && __i18n_base._ref == ^._id
      ][0]._id
    }
  `)


  const globalSettings: GlobalSettingsRow = await client.fetch(`
    *[
      _type == "globalSettings"
      && !defined(__i18n_base)
      && __i18n_lang == "uk"
      && !(_id in path("drafts.**"))
    ][0] {
      _id,
      title,
      "enId": *[
        _type == "globalSettings"
        && __i18n_lang == "en"
        && __i18n_base._ref == ^._id
      ][0]._id
    }
  `)

  return S.list()
    .title('Контент')
    .items([
      S.listItem()
        .id('globalSettings')
        .title('Налаштування Header & Footer')
        .icon(CogIcon)
        .child(
          S.list()
            .id('globalSettings-langs')
            .title(globalSettings?.title || 'Налаштування')
            .items([
              S.listItem()
                .id('globalSettings-uk')
                .title('Українська')
                .child(
                  S.editor()
                    .schemaType('globalSettings')
                    .documentId(globalSettings?._id || 'globalSettings-uk')
                    .title('Header & Footer (UA)')
                ),
              S.listItem()
                .id('globalSettings-en')
                .title('English')
                .child(
                  S.editor()
                    .schemaType('globalSettings')
                    .documentId(globalSettings?.enId || 'globalSettings-en')
                    .title('Header & Footer (EN)')
                ),
            ])
        ),


      S.divider(),


      S.listItem()
        .id('create-page')
        .title('Створити нову сторінку')
        .icon(AddIcon)
        .child(
          S.document()
            .schemaType('page')
            .initialValueTemplate('page-uk-base')
            .title('Нова сторінка (UA)')
        ),


      S.divider(),

      ...pages.map((page: PageRow) =>
        S.listItem()
          .id(`page-${page._id}`)
          .title(page.title || 'Без назви')
          .icon(DocumentIcon)
          .child(
            S.list()
              .id(`langs-${page._id}`)
              .title(page.title || 'Без назви')
              .items([
                S.listItem()
                  .id(`${page._id}-ua`)
                  .title('Українська')
                  .icon(null)
                  .child(
                    S.editor()
                      .id(page._id)
                      .schemaType('page')
                      .documentId(page._id)
                      .title(`${page.title || 'Без назви'} (UA)`)
                  ),
                S.listItem()
                  .id(`${page._id}-en`)
                  .title('English')
                  .icon(EarthGlobeIcon)
                  .child(
                    page.enId
                      ? S.editor()
                          .id(page.enId)
                          .schemaType('page')
                          .documentId(page.enId)
                          .title(`${page.title || 'Без назви'} (EN)`)
                      : S.document()
                          .schemaType('page')
                          .initialValueTemplate('page-en-base', { baseId: page._id })
                          .title(`${page.title || 'Без назви'} (EN)`)
                  ),
              ])
          )
      ),
    ])
}