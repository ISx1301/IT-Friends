export const PAGE_WITH_SETTINGS = /* groq */ `
{
  "page": *[
    _type == "page" &&
    lower(language) == lower($lang) &&
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

      // для hero
      "description": coalesce(description, []),

      "button": select(
        defined(button) => {
          "text": button.text,
          "linkType": button.linkType,
          "page": select(
            button.linkType == "page" => button.page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }
          ),
          "anchor": select(button.linkType == "anchor" => button.anchor),
          "externalUrl": select(button.linkType == "external" => button.externalUrl),

          "href": select(
            button.linkType == "page" => select(
              string::startsWith(button.page->slug.current, "/")
                => button.page->slug.current,
              "/" + button.page->slug.current
            ),
            button.linkType == "anchor" => button.anchor,
            button.linkType == "external" => button.externalUrl
          )
        }
      ),

      "imageColumns": select(
        _type == "heroSectionMainSection" => imageColumns[]{
          images[]{
            alt,
            "asset": { "url": asset->url }
          }
        },
        imageColumns
      ),



      _type == "areasOfStudyMainSection" => {
        _type,
        _key,
        backgroundColor,
        heading,
        sectionCtaText,
        "cards": cards[]{
          title,
          ageText,
          "paragraphs": coalesce(paragraphs, []), // Portable Text
          primaryButtonText,
          secondaryButtonText,
          "image": image{
            alt,
            "url": asset->url
          }
        }
      },



      _type == "aboutSection" => {
        _type,
        _key,
        backgroundColor,
        heading,
        headingAlign,
        layout,
        "image": image{alt, "url": asset->url},
        content{
          h3,
          "paragraphs": coalesce(paragraphs, []),
          h4,
          badges{
            borderColor,
            "items": coalesce(items, [])
          },
          "order": coalesce(order[]{kind}, [])
        }
      },

      _type == "peculiaritiesSection" => {
        _type, _key,
        backgroundColor,
        heading,
        "mainImage": mainImage{ alt, "url": asset->url },

        "row1": coalesce(row1[]{
          "image": image{ alt, "url": asset->url },
          title,
          "description": coalesce(
            description[style == "normal"]{
              _type, _key, style,
              children[]{ _type, text, marks },
              markDefs[]{ _key, _type, href }
            }, []
          )
        }, []),

        "row2": coalesce(row2[]{
          "image": image{ alt, "url": asset->url },
          title,
          "description": coalesce(
            description[style == "normal"]{
              _type, _key, style,
              children[]{ _type, text, marks },
              markDefs[]{ _key, _type, href }
            }, []
          )
        }, [])
      },



      _type == "reviewsSection" => {
        _type, _key,
        backgroundColor,
        heading,

        "paragraphs": coalesce(
          paragraphs[style == "normal"]{
            _type, _key, style,
            children[]{ _type, text, marks },
            markDefs[]{ _key, _type, href }
          }, []
        ),

        buttonText,

        "reviews": coalesce(reviews[]{
          name,
          "text": coalesce(
            text[style == "normal"]{
              _type, _key, style,
              children[]{ _type, text, marks },
              markDefs[]{ _key, _type, href }
            }, []
          ),
          "avatar": avatar{ alt, "url": asset->url }
        }, [])
      },


      _type == "newSchoolMainSection" => {
        _type, _key,
        heading,
        "images": images[]{ alt, "url": asset->url }
      },

      _type == "teamSection" => {
        _type, _key,
        backgroundColor,
        heading,
        "description": coalesce(
          description[style == "normal"]{
            _type, _key, style,
            children[]{ _type, text, marks },
            markDefs[]{ _key, _type, href }
          },
          []
        ),

        "members": coalesce(members[]{
          name,
          subject,
          "photo": photo{ alt, "url": asset->url },
          "social": social{
            url,
            "icon": icon{ alt, "url": asset->url }
          }
        }, [])
      },


      _type == "accordionSection" => {
        _type, _key,
        backgroundColor,
        heading,

        "description": coalesce(
          description[style == "normal"]{
            _type, _key,
            style,
            children[]{ _type, text, marks },
            markDefs[]{ _key, _type, href }
          }, []
        ),
        buttonText,
        
        "items": coalesce(items[]{
          question,
          "answer": coalesce(
            answer[style == "normal"]{
              _type, _key,
              style,
              children[]{ _type, text, marks },
              markDefs[]{ _key, _type, href }
            }, []
          )
        }, [])
      },



       _type == "heroZoomImageSection" => {
        _type, _key,
        backgroundColor,
        "logo": logo{ alt, "url": asset->url },
        badgeText,
        heading,
        "description": coalesce(
          description[style == "normal"]{
            _type, _key, style,
            children[]{ _type, text, marks },
            markDefs[]{ _key, _type, href }
          }, []
        ),
        buttonText,
        "mainImage": mainImage{ alt, "url": asset->url },
        "order": coalesce(order[]{ kind }, [])
      },


      _type == "generalDescriptionSection" => {
        _type, _key,
        backgroundColor,
        heading,

        "cards": coalesce(
          cards[]{
            "image": image{ alt, "url": asset->url },
            title,
            "description": coalesce(
              description[style == "normal"]{
                _type, _key, style,
                children[]{ _type, text, marks },
                markDefs[]{ _key, _type, href }
              },
              []
            )
          },
          []
        ),

        buttonText
      },



        
    }
  },

  "settings": *[
    _type == "globalSettings" &&
    lower(coalesce(language, __i18n_lang)) == lower($lang)
  ][0]{
    header{
      logo{ alt, "src": asset->url },
      buttonText,
      socials[]{
        _key,
        alt,
        "icon": { "src": icon.asset->url },
        "link": link
      },
      navigation[]{
        _key,
        text,
        "linkType": linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        submenu[]{
          _key,
          text,
          "linkType": linkType,
          "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
          "anchor": select(linkType == "anchor" => anchor)
        }
      }
    },

    footer{
      logo{ alt, "src": asset->url },

      "description": coalesce(description, []),

      "navColumn1": navColumn1[]{
        _key,
        text,
        linkType,
        "page": select(linkType == "page" => page->{ "slug": slug.current, "lang": coalesce(language, __i18n_lang) }),
        "anchor": select(linkType == "anchor" => anchor),
        "externalUrl": select(linkType == "external" => externalUrl),
        "href": select(
          linkType == "anchor" => anchor,
          linkType == "external" => externalUrl,
          linkType == "page" => select(
            page->slug.current match '^/' => page->slug.current,
            "/" + page->slug.current
          )
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
          linkType == "page" => select(
            page->slug.current match '^/' => page->slug.current,
            "/" + page->slug.current
          )
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
          linkType == "page" => select(
            page->slug.current match '^/' => page->slug.current,
            "/" + page->slug.current
          )
        )
      },

      buttonText,

      socials[]{
        _key,
        alt,
        "icon": { "src": icon.asset->url },
        "link": link
      },

      copyright
    }
  }
}
`;
