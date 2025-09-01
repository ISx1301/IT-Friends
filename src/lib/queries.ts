// === Pages + Settings 
/* groq */

export const PAGE_WITH_SETTINGS = `
{
  "page": *[
    _type == "page" &&
    lower(coalesce(language, __i18n_lang)) == lower($lang) &&
    (
      slug.current == $slug ||
      slug.current == ("/" + $slug) ||
      slug.current == ($lang + "/" + $slug) ||
      slug.current == ("/" + $lang + "/" + $slug) ||
      ($slug == "index" && slug.current in ["/","index", ("/" + $lang)])
    )
  ][0]{
    _id,
    title,
    seo{
      title,
      description,
      "image": image.asset->url
    },
    sections[]{
      _type,
      _key,
      ...,

      // hero helpers
      "heading": coalesce(
        heading[style == "normal"]{
          _type, _key, style,
          children[]{ _type, text, marks },
          markDefs[]{ _key, _type, href, openInNewTab }
        }, []
      ),

      "description": coalesce(description, []),

      "button": select(
        defined(button) => {
          "text": button.text,
          "linkType": button.linkType,
          "page": select(
            button.linkType == "page" => button.page->{
              "slug": slug.current,
              "lang": coalesce(language, __i18n_lang)
            }
          ),
          "anchor": select(button.linkType == "anchor" => button.anchor),
          "externalUrl": select(button.linkType == "external" => button.externalUrl),
          "href": select(
            button.linkType == "page" => select(
              string::startsWith(button.page->slug.current, "/")
                => button.page->slug.current,
              "/" + button.page->slug.current
            ),
            button.linkType == "anchor"   => button.anchor,
            button.linkType == "external" => button.externalUrl
          )
        }
      ),


      "imageColumns": select(
        _type == "heroSectionMainSection" => imageColumns[]{
          images[]{ alt, "asset": { "url": asset->url } }
        },
        imageColumns
      ),

      // areasOfStudyMainSection
      _type == "areasOfStudyMainSection" => {
        _type,
        _key,
        backgroundColor,
        heading,
        paddingClass,
        sectionCtaText,
        sectionCtaClass,
        "cards": coalesce(cards, [])[]{
          _key,
          title,
          ageText,
          "paragraphs": coalesce(paragraphs, []),
          primaryButtonText,
          "primaryButtonHref": select(
            defined(primaryButtonHref) && primaryButtonHref != "" => primaryButtonHref,
            null
          ),
          secondaryButtonText,
          secondaryButtonClass,
          "image": image{
            alt,
            "url": asset->url
          }
        }
      },




      // aboutSection
      _type == "aboutSection" => {
        _type, _key, backgroundColor, heading, headingAlign, layout, paddingClass,
        "image": image{alt, "url": asset->url},
        content{
          h3, "paragraphs": coalesce(paragraphs, []), h4,
          badges{ borderColor, "items": coalesce(items, []) },
          "order": coalesce(order[]{kind}, [])
        }
      },


      // peculiaritiesSection
      _type == "peculiaritiesSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "mainImage": mainImage{ alt, "url": asset->url },
        "row1": coalesce(row1[]{
          "image": image{ alt, "url": asset->url }, title,
          "description": coalesce(
            description[style == "normal"]{
              _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href }
            }, []
          )
        }, []),
        "row2": coalesce(row2[]{
          "image": image{ alt, "url": asset->url }, title,
          "description": coalesce(
            description[style == "normal"]{
              _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href }
            }, []
          )
        }, [])
      },


      // reviewsSection
      _type == "reviewsSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "paragraphs": coalesce(
          paragraphs[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
        ),
        buttonText,
        "reviews": coalesce(reviews[]{
          name,
          "text": coalesce(
            text[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
          ),
          "avatar": avatar{ alt, "url": asset->url }
        }, [])
      },


      // newSchoolMainSection
      _type == "newSchoolMainSection" => {
        _type, _key, heading, paddingClass,
        "images": images[]{ alt, "url": asset->url }
      },

      // teamSection
      _type == "teamSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "description": coalesce(
          description[style == "normal"]{
            _type, _key, style,
            children[]{ _type, text, marks },
            markDefs[]{ _key, _type, href }
          }, []
        ),
        "members": coalesce(members[]{
          name,
          subject,
          "photo": photo{
            alt,
            asset->{_id, _ref, url},
            crop,
            hotspot
          },
          "social": social{
            url,
            "icon": icon{
              alt,
              asset->{_id, _ref, url},
              crop,
              hotspot
            }
          }
        }, [])
      },


      // accordionSection
      _type == "accordionSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "description": coalesce(
          description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
        ),
        buttonText,
        "items": coalesce(items[]{
          question,
          "answer": coalesce(
            answer[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
          )
        }, [])
      },

      // heroZoomImageSection
      _type == "heroZoomImageSection" => {
        _type, _key, backgroundColor, paddingClass,
        "logo": logo{ alt, "url": asset->url },
        badgeText, heading,
        "description": coalesce(
          description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
        ),
        buttonText, "mainImage": mainImage{ alt, "url": asset->url },
        "order": coalesce(order[]{ kind }, [])
      },


      // generalDescriptionSection
      _type == "generalDescriptionSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "cards": coalesce(
          cards[]{
            "image": image{ alt, "url": asset->url }, title,
            "description": coalesce(
              description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
            )
          }, []
        ),
        buttonText
      },


      // withoutNestedTabsSection
      _type == "withoutNestedTabsSection" => {
        _type, _key, backgroundColor, heading, paddingClass, cardsKind, tabsColorKey,
        "tabs": coalesce(
          tabs[]{ label, text, "icon": icon{ alt, "url": asset->url } }, []
        ),
        "panels": coalesce(
          panels[]{
            "panelDescription": coalesce(
              panelDescription[style == "normal"]{
                _type, _key, style,
                children[]{ _type, text, marks },
                markDefs[]{ _key, _type, href }
              }, []
            ),
            "clickableCards": coalesce(
              clickableCards[]{
                "image": image{ alt, "url": asset->url },
                title, plainDescription, phone, href
              }, []
            ),
            "regularCards": coalesce(
              regularCards[]{
                "image": image{ alt, "url": asset->url },
                title,
                "ptDescription": select(
                  count(ptDescription) > 0 => ptDescription[style == "normal"]{
                    _type, _key, style,
                    children[]{ _type, text, marks },
                    markDefs[]{ _key, _type, href }
                  },
                  count(description) > 0 => description[style == "normal"]{
                    _type, _key, style,
                    children[]{ _type, text, marks },
                    markDefs[]{ _key, _type, href }
                  },
                  []
                ),
                buttonText,
                "buttonClass": coalesce(buttonClass, "")
              }, []
            )
          }, []
        ),
        buttonText,
        showMoreText
      },


      // withNestedTabsCampsSection
      _type == "withNestedTabsCampsSection" => {
        _type, _key, backgroundColor, heading, innerTabsColorKey, cardsKind, showMoreText, buttonText,
        "intro": coalesce(intro[]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []),
        "pillGroups": coalesce(
          pillGroups[]{
            label, text, "icon": icon{ alt, "url": asset->url },
            "tabs": coalesce(tabs[]{ label, text, "icon": icon{ alt, "url": asset->url } }, []),
            "panels": coalesce(
              panels[]{
                "panelDescription": coalesce(
                  panelDescription[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
                ),
                "clickableCards": coalesce(
                  clickableCards[]{ "image": image{ alt, "url": asset->url }, title, plainDescription, phone, href }, []
                ),
                "regularCards": coalesce(
                  regularCards[]{
                    "image": image{ alt, "url": asset->url }, title, ageText,
                    "location": { "title": location.title, "icon": { "alt": location.icon.alt, "url": location.icon.asset->url } },
                    "ptDescription": coalesce(ptDescription[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []),
                    buttonText
                  }, []
                )
              }, []
            )
          }, []
        )
      },

      // interestingThingsSection
      _type == "interestingThingsSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "items": coalesce(
          items[]{
            "image": image{ alt, "url": asset->url },
            title,
            buttonText,
            "buttonHref": select(
              defined(buttonHref) && buttonHref != "" => buttonHref,
              null
            ),
            "ptDescription": coalesce(
              ptDescription[style == "normal"]{
                _type, _key, style,
                children[]{ _type, text, marks },
                markDefs[]{ _key, _type, href }
              }, []
            )
          }, []
        )
      },



      // offlineAddressesEnglishSection
      _type == "offlineAddressesEnglishSection" => {
        _type, _key, backgroundColor, heading, paddingClass,
        "items": coalesce(items[]{ "image": image{ alt, "url": asset->url }, title, address, phone, href }, [])
      },


      _type == "videoCampsSection" => {
        _type, _key, backgroundColor, "image": image{ alt, "url": asset->url }, videoHref
      },

      // heroBlogSection
      _type == "heroBlogSection" => {
        _type, _key, "image": image{ alt, "url": asset->url }, heading,
        "description": coalesce(description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, [])
      },

      // Блог: список статей (если нет статей на $lang, используем $fallbackLang)
      _type == "postListSection" => {
        _type, _key, buttonText, sort,
        "posts": select(
          count(*[
            _type == "blog" &&
            lower(coalesce(language, __i18n_lang)) == lower($lang) &&
            !(_id in path("drafts.**")) &&
            defined(slug.current)
          ]) > 0
          =>
          *[
            _type == "blog" &&
            lower(coalesce(language, __i18n_lang)) == lower($lang) &&
            !(_id in path("drafts.**")) &&
            defined(slug.current)
          ] | order(coalesce(publishedAt, _createdAt) desc){
            "slug": slug.current,
            "title": coalesce(heading, title),
            "image": { "url": image.asset->url, "alt": image.alt },
            "content": pt::text(description),
            "date": coalesce(publishedAt, _createdAt)
          },
          *[
            _type == "blog" &&
            lower(coalesce(language, __i18n_lang)) == lower(coalesce($fallbackLang, $lang)) &&
            !(_id in path("drafts.**")) &&
            defined(slug.current)
          ] | order(coalesce(publishedAt, _createdAt) desc){
            "slug": slug.current,
            "title": coalesce(heading, title),
            "image": { "url": image.asset->url, "alt": image.alt },
            "content": pt::text(description),
            "date": coalesce(publishedAt, _createdAt)
          }
        )
      }
    }
  },

  "settings": *[
    _type == "globalSettings" &&
    lower(coalesce(language, __i18n_lang)) == lower($lang)
  ][0]{
    header{
      logo{ alt, "src": asset->url },
      buttonText,
      socials[]{ _key, alt, "icon": { "src": icon.asset->url }, "link": link },
      navigation[]{
        _key, text, "linkType": linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        submenu[]{
          _key, text, "linkType": linkType,
          "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
          "anchor": select(linkType == "anchor" => anchor)
        }
      }
    },
    footer{
      logo{ alt, "src": asset->url },
      "description": coalesce(description, []),

      "navColumn1": navColumn1[]{
        _key, text, linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(page->slug.current match '^/' => page->slug.current, "/" + page->slug.current)
        )
      },
      "navColumn2": navColumn2[]{
        _key, text, linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(page->slug.current match '^/' => page->slug.current, "/" + page->slug.current)
        )
      },
      "navColumn3": navColumn3[]{
        _key, text, linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(page->slug.current match '^/' => page->slug.current, "/" + page->slug.current)
        )
      },

      buttonText,
      socials[]{ _key, alt, "icon": { "src": icon.asset->url }, "link": link },
      copyright
    }
  }
}
`;

// === СЛАГИ СТАТЕЙ (для getStaticPaths) ===
export const BLOG_POST_SLUGS = /* groq */ `
*[
  _type == "blog" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current) &&
  defined(coalesce(language, __i18n_lang))
]{
  "lang": lower(coalesce(language, __i18n_lang)),
  "rawSlug": slug.current
}
`;

// === ОДНА СТАТЬЯ + Settings (+ альтернативы для language switch) ===
export const BLOG_POST_WITH_SETTINGS = /* groq */ `
{
  "post": *[
    _type == "blog" &&
    !(_id in path("drafts.**")) &&
    lower(coalesce(language, __i18n_lang)) == lower($lang) &&
    (
      slug.current == $slug ||
      slug.current == ("/" + $slug) ||
      slug.current == ($lang + "/" + $slug) ||
      slug.current == ("/" + $lang + "/" + $slug)
    )
  ][0]{
    _id,
    "title": coalesce(heading, title),
    "image": { "url": image.asset->url, "alt": image.alt },
    "content": description,
    "date": coalesce(publishedAt, _createdAt),

    // Альтернативы для языкового переключателя (если i18n-плагин проставляет __i18n_base)
    "alternates": *[
      _type == "blog" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      coalesce(__i18n_base._ref, _id) == coalesce(^.__i18n_base._ref, ^._id)
    ]{
      "lang": lower(coalesce(language, __i18n_lang)),
      "slug": slug.current
    }
  },

  "settings": *[
    _type == "globalSettings" &&
    lower(coalesce(language, __i18n_lang)) == lower($lang)
  ][0]{
    header{
      logo{ alt, "src": asset->url },
      buttonText,
      socials[]{ _key, alt, "icon": { "src": icon.asset->url }, "link": link },
      navigation[]{
        _key, text, "linkType": linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        submenu[]{
          _key, text, "linkType": linkType,
          "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
          "anchor": select(linkType == "anchor" => anchor)
        }
      }
    },

    footer{
      logo{ alt, "src": asset->url },
      "description": coalesce(description, []),

      "navColumn1": navColumn1[]{
        _key, text, linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(page->slug.current match '^/' => page->slug.current, "/" + page->slug.current)
        )
      },
      "navColumn2": navColumn2[]{
        _key, text, linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(page->slug.current match '^/' => page->slug.current, "/" + page->slug.current)
        )
      },
      "navColumn3": navColumn3[]{
        _key, text, linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(page->slug.current match '^/' => page->slug.current, "/" + page->slug.current)
        )
      },

      buttonText,
      socials[]{ _key, alt, "icon": { "src": icon.asset->url }, "link": link },
      copyright
    }
  }
}
`;
