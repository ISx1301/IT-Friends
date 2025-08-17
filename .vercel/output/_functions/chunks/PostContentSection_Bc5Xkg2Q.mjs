import { s as sanityClient, $ as $$Head } from './Head_DHFPoC9H.mjs';
import { D as DEFAULT_LANG } from './constants_CZJe0MuS.mjs';
import { a as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, d as renderSlot, r as renderTemplate, b as renderComponent, i as renderScript, u as unescapeHTML } from './astro/server_Cb6GeMOu.mjs';
import 'kleur/colors';
/* empty css                          */
/* empty css                          */
import './index_MaT6fT73.mjs';
import { $ as $$Image } from './_astro_assets_XwumF92K.mjs';
import 'clsx';
import { toHTML } from '@portabletext/to-html';

const query = async (groq, params = {}) => sanityClient.fetch(groq, { fallbackLang: DEFAULT_LANG, ...params });

const PAGE_WITH_SETTINGS = (
  /* groq */
  `
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
          images[]{ alt, "asset": { "url": asset->url } }
        },
        imageColumns
      ),

      // --- все твои секции (без изменений) ---
      // areasOfStudyMainSection
      _type == "areasOfStudyMainSection" => {
        _type, _key, backgroundColor, heading, sectionCtaText,
        "cards": cards[]{
          title, ageText, "paragraphs": coalesce(paragraphs, []),
          primaryButtonText, secondaryButtonText,
          "image": image{ alt, "url": asset->url }
        }
      },

      // aboutSection
      _type == "aboutSection" => {
        _type, _key, backgroundColor, heading, headingAlign, layout,
        "image": image{alt, "url": asset->url},
        content{
          h3, "paragraphs": coalesce(paragraphs, []), h4,
          badges{ borderColor, "items": coalesce(items, []) },
          "order": coalesce(order[]{kind}, [])
        }
      },

      // peculiaritiesSection
      _type == "peculiaritiesSection" => {
        _type, _key, backgroundColor, heading,
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
        _type, _key, backgroundColor, heading,
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

      _type == "newSchoolMainSection" => {
        _type, _key, heading, "images": images[]{ alt, "url": asset->url }
      },

      _type == "teamSection" => {
        _type, _key, backgroundColor, heading,
        "description": coalesce(
          description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
        ),
        "members": coalesce(members[]{
          name, subject, "photo": photo{ alt, "url": asset->url },
          "social": social{ url, "icon": icon{ alt, "url": asset->url } }
        }, [])
      },

      _type == "accordionSection" => {
        _type, _key, backgroundColor, heading,
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

      _type == "heroZoomImageSection" => {
        _type, _key, backgroundColor,
        "logo": logo{ alt, "url": asset->url },
        badgeText, heading,
        "description": coalesce(
          description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, []
        ),
        buttonText, "mainImage": mainImage{ alt, "url": asset->url },
        "order": coalesce(order[]{ kind }, [])
      },

      _type == "generalDescriptionSection" => {
        _type, _key, backgroundColor, heading,
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

      _type == "withoutNestedTabsSection" => {
        _type, _key, backgroundColor, heading, cardsKind, tabsColorKey,
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
                "image": image{ alt, "url": asset->url }, title,
                "ptDescription": select(
                  count(ptDescription) > 0 => ptDescription[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } },
                  count(description) > 0 => description[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } },
                  []
                ),
                buttonText
              }, []
            )
          }, []
        ),
        buttonText, showMoreText
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

      _type == "interestingThingsSection" => {
        _type, _key, backgroundColor, heading,
        "items": coalesce(
          items[]{
            "image": image{ alt, "url": asset->url }, title, buttonText,
            "ptDescription": coalesce(ptDescription[style == "normal"]{ _type, _key, style, children[]{ _type, text, marks }, markDefs[]{ _key, _type, href } }, [])
          }, []
        )
      },

      _type == "offlineAddressesEnglishSection" => {
        _type, _key, backgroundColor, heading,
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
`
);
const BLOG_POST_SLUGS = (
  /* groq */
  `
*[
  _type == "blog" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current) &&
  defined(coalesce(language, __i18n_lang))
]{
  "lang": lower(coalesce(language, __i18n_lang)),
  "rawSlug": slug.current
}
`
);
const BLOG_POST_WITH_SETTINGS = (
  /* groq */
  `
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
`
);

const $$Astro$4 = createAstro("http://localhost:4321");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([className, { "is-active": isActive }], "class:list")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "D:/IT-Friends main/src/components/NavLink.astro", void 0);

const $$Astro$3 = createAstro("http://localhost:4321");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const { data, lang } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header data-header class="relative h-[4.625rem] lg:h-auto"> <!-- Top header block --> <div class="z-50 lg:static fixed flex justify-between items-center bg-white py-2 container header-bg"> <!-- Logo --> <a href="/"> ${data?.logo?.src && renderTemplate`<img${addAttribute(data.logo.src, "src")}${addAttribute(data.logo.alt ?? "IT Friends logo", "alt")}>`} </a> <!-- Social media desktop --> <div class="hidden lg:flex gap-9"> <div class="flex gap-9"> ${Array.isArray(data?.socials) && data.socials.map((s) => renderTemplate`<a${addAttribute(s.link, "href")} target="_blank" rel="noopener"${addAttribute(s.alt ?? "", "aria-label")}> ${s.icon?.src && renderTemplate`<img class="w-6 h-6"${addAttribute(s.icon.src, "src")}${addAttribute(s.alt ?? "", "alt")} width="24" height="24">`} </a>`)} </div> <!-- Language toggle desktop --> <div class="relative flex justify-center items-center font-secondary cursor-pointer lang-select"> <div class="flex justify-center items-center gap-1 rounded"> <span class="font-medium text-lg current-lang">${(lang ?? "").toUpperCase()}</span> <div class="origin-center transition-transform duration-300 arrow-lang transform"> ${renderComponent($$result, "Image", $$Image, { "src": import('./dropdown-black_BnHM6Clj.mjs'), "format": "svg", "alt": "dropdown" })} </div> </div> <ul class="hidden top-full left-1/2 z-50 absolute gap-1 bg-white drop-shadow shadow mt-2 p-2 rounded min-w-[3.75rem] -translate-x-1/2 lang-menu"> <li class="hover:text-primary-orange text-center transition duration-300" data-lang="UA">UA</li> <li class="hover:text-primary-orange text-center transition duration-300" data-lang="EN">EN</li> </ul> </div> </div> <!-- Burger --> <div class="lg:hidden flex flex-col justify-between space-y-[0.3rem] w-[1.875rem] h-[1.25rem] burger"> <span class="bg-black rounded-[0.125rem] w-full h-[0.1875rem] transition-all duration-300"></span> <span class="bg-black rounded-[0.125rem] w-full h-[0.1875rem] transition-all duration-300"></span> <span class="bg-black rounded-[0.125rem] w-full h-[0.1875rem] transition-all duration-300"></span> </div> </div> <!-- Bottom header block --> <div class="hidden-menu bg-white lg:bg-primary-green"> <div class="px-4 lg:px-4 py-10 lg:py-0 w-full lg:container"> <!-- Navigation --> <nav class="flex lg:flex-row flex-col justify-between items-center py-5"> <ul class="flex lg:flex-row flex-col items-center gap-x-9 gap-y-6 mb-3 lg:mb-0 text-black lg:text-white"> ${Array.isArray(data?.navigation) && data.navigation.map((item) => {
    const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
    return !hasSubmenu ? renderTemplate`<li class="first-letter:uppercase lg:first-letter:lowercase"> ${renderComponent($$result, "NavLink", $$NavLink, { "href": item.linkType === "page" ? item.page.slug : item.linkType === "anchor" ? item.anchor : item.link, "class": "font-secondary lg:font-normal font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300" }, { "default": ($$result2) => renderTemplate`${item.text}` })} </li>` : renderTemplate`<li class="relative first-letter:uppercase lg:first-letter:lowercase"> <div class="relative cursor-pointer course-select"> <div class="group flex justify-center items-center gap-1"> <span class="hidden lg:inline-block font-secondary font-normal group-hover:text-primary-orange text-lg first-letter:uppercase lg:first-letter:lowercase transition duration-300"> ${item.text} </span> <span class="lg:hidden font-secondary lg:font-normal font-semibold group-hover:text-primary-orange text-base first-letter:uppercase lg:first-letter:lowercase transition duration-300 mobile-link"> ${item.text} </span> <div class="origin-center transition-transform duration-300 course-arrow transform"> <span class="lg:hidden block"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="group-hover:stroke-primary-orange w-6 h-6 text-black transition duration-300" fill="none" stroke="currentColor"> <path d="M10 30 L50 70 L90 30" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"></path> </svg> </span> <span class="hidden lg:block"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="group-hover:stroke-primary-orange w-6 h-6 text-white transition duration-300" fill="none" stroke="currentColor"> <path d="M10 30 L50 70 L90 30" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"></path> </svg> </span> </div> </div> <ul class="hidden left-1/2 z-50 lg:absolute gap-2 bg-white lg:drop-shadow lg:shadow mt-4 lg:p-2 rounded lg:w-52 lg:-translate-x-1/2 course-menu"> ${item.submenu.map((sub) => renderTemplate`<li class="lg:px-2 sm:py-0 lg:py-1 font-normal text-center cursor-pointer"> ${renderComponent($$result, "NavLink", $$NavLink, { "href": sub.linkType === "page" ? sub.page.slug : sub.linkType === "anchor" ? sub.anchor : sub.link, "class": "font-secondary text-black hover:text-primary-orange hover:scale-105 transition duration-300" }, { "default": ($$result2) => renderTemplate`${sub.text}` })} </li>`)} </ul> </div> </li>`;
  })} </ul> <!-- Language toggle mobile --> <div class="lg:hidden relative flex justify-center items-center mb-20 font-secondary cursor-pointer lang-select"> <div class="flex justify-center items-center gap-1 rounded"> <span class="font-medium text-primary-orange text-lg current-lang">${(lang ?? "").toUpperCase()}</span> <div class="origin-center transition-transform duration-300 arrow-lang transform"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="group-hover:stroke-primary-orange w-6 h-6 text-black transition duration-300" fill="none" stroke="currentColor"> <path d="M10 30 L50 70 L90 30" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"></path> </svg> </div> </div> <ul class="hidden top-full left-1/2 z-50 absolute gap-1 bg-white drop-shadow shadow mt-1 p-2 rounded min-w-[3.75rem] -translate-x-1/2 lang-menu"> <li class="hover:text-primary-orange text-center transition duration-300" data-lang="UA">UA</li> <li class="hover:text-primary-orange text-center transition duration-300" data-lang="EN">EN</li> </ul> </div> <!-- Social media mobile --> <div class="lg:hidden flex gap-9 mb-7"> ${Array.isArray(data?.socials) && data.socials.map((s) => renderTemplate`<a${addAttribute(s.link, "href")} target="_blank" rel="noopener"${addAttribute(s.alt ?? "", "aria-label")}> ${s.icon?.src && renderTemplate`<img class="w-7 h-7"${addAttribute(s.icon.src, "src")}${addAttribute(s.alt ?? "", "alt")} width="28" height="28">`} </a>`)} </div> <!-- Button --> ${data?.buttonText && renderTemplate`<button type="button" class="free-lesson-btn form-open">${data.buttonText}</button>`} </nav> </div> </div> </header> ${renderScript($$result, "D:/IT-Friends main/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/Header.astro", void 0);

const $$Astro$2 = createAstro("http://localhost:4321");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const { data } = Astro2.props;
  const paragraphClass = (i) => i === 0 ? "mb-1 lg:mb-2 leading-5 lg:w-52" : "lg:text-left text-center leading-5 lg:w-52";
  return renderTemplate`${maybeRenderHead()}<footer class="relative bg-white pt-12 lg:pt-9 peer-lg:pt-0 pb-5 lg:pb-11"> <div class="container"> <div class="flex lg:flex-row flex-col mb-5 w-full"> <div class="flex flex-col items-center lg:items-start order-1 basis-1/4 lg:basis-3/12 shrink-0"> <!-- <Image
          src={import("@images/logo-footer.jpg")}
          format="webp"
          alt="FooterLogo"
        /> --> <a class="mb-3 lg:mb-7" href="/"> ${data?.logo?.src && renderTemplate`<img${addAttribute(data.logo.src, "src")}${addAttribute(data.logo.alt ?? "IT Friends logo", "alt")}>`} </a> ${data?.description?.map((paragraph, i) => renderTemplate`<p${addAttribute(paragraphClass(i), "class")}> ${paragraph} </p>`)} <!-- <p class="mb-1 lg:mb-2 leading-5">
          IT‑школа для дітей і <span class="hidden lg:inline"><br /></span> підлітків
          7–16 років.
        </p>
        <p class="lg:text-left text-center leading-5">
          Вчимо зрозуміло, <span class="hidden lg:inline"><br /></span> підтримуємо
          інтерес, <br /> допомагаємо знайти своє.
        </p> --> </div> <!-- First links block --> <div class="order-3 lg:order-2 mb-1 lg:mb-0 pt-7 basis-1/4 lg:basis-1/12 shrink-0"> <ul class="space-y-2 font-secondary"> ${data?.navColumn1?.map((item) => renderTemplate`<li class="text-center lg:text-start"> ${item.linkType === "page" ? renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "class": "font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300", "href": item.page?.slug ?? "" }, { "default": ($$result2) => renderTemplate`${item.text}` })}` : renderTemplate`<a class="font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300"${addAttribute(item.href, "href")}${addAttribute(item.linkType === "external" ? "_blank" : void 0, "target")}${addAttribute(item.linkType === "external" ? "noopener noreferrer" : void 0, "rel")}> ${item.text} </a>`} </li>`)} </ul> </div> <!-- Second links block --> <div class="order-3 mb-1 lg:mb-0 pt-0 lg:pt-7 pl-0 lg:pl-16 basis:1/4 lg:basis-2/12 shrink-0"> <ul class="space-y-1 lg:space-y-2 font-secondary"> ${data?.navColumn2?.map((item) => renderTemplate`<li class="text-center lg:text-start"> ${item.linkType === "page" ? renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "class": "font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300", "href": item.page?.slug ?? "" }, { "default": ($$result2) => renderTemplate`${item.text}` })}` : renderTemplate`<a class="font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300"${addAttribute(item.href, "href")}${addAttribute(item.linkType === "external" ? "_blank" : void 0, "target")}${addAttribute(item.linkType === "external" ? "noopener noreferrer" : void 0, "rel")}> ${item.text} </a>`} </li>`)} </ul> </div> <!-- Third links block --> <div class="order-5 lg:order-4 pt-0 lg:pt-7 pl-0 lg:pl-14 basis:1/4 lg:basis-4/12 shrink-0"> <ul class="space-y-2 font-secondary"> ${data?.navColumn3?.map((item) => renderTemplate`<li class="text-center lg:text-start"> ${item.linkType === "page" ? renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "class": "font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300", "href": item.page?.slug ?? "" }, { "default": ($$result2) => renderTemplate`${item.text}` })}` : renderTemplate`<a class="font-semibold hover:text-primary-orange text-base lg:text-lg hover:scale-105 transition duration-300"${addAttribute(item.href, "href")}${addAttribute(item.linkType === "external" ? "_blank" : void 0, "target")}${addAttribute(item.linkType === "external" ? "noopener noreferrer" : void 0, "rel")}> ${item.text} </a>`} </li>`)} </ul> </div> <div class="flex flex-col items-center lg:items-end gap-10 order-2 lg:order-5 pt-12 lg:pt-7 basis:1/4 lg:basis-2/12 shrink-0"> <button type="button" class="order-2 lg:order-1 px-11 py-3 orange-btn form-open">${data?.buttonText}</button> <div class="flex justify-center lg:justify-between gap-16 lg:gap-0 order-1 lg:order-2 pl-0 lg:pl-[1rem] w-full"> <!-- Social media --> ${Array.isArray(data?.socials) && data.socials.map((s) => renderTemplate`<a${addAttribute(s.link, "href")} target="_blank" rel="noopener"${addAttribute(s.alt ?? "", "aria-label")}> ${s.icon?.src && renderTemplate`<img class="w-7 h-7"${addAttribute(s.icon.src, "src")}${addAttribute(s.alt ?? "", "alt")} width="24" height="24">`} </a>`)} <!-- <a href="#">
            <Image
              class="w-7 h-7"
              src={import("@images/facebook.svg")}
              alt="Facebook picture"
              format="svg"
            />
          </a>
          <a href="#">
            <Image
              class="w-7 h-7"
              src={import("@images/telegram.svg")}
              alt="Telegram picture"
              format="svg"
            />
          </a>
          <a href="#">
            <Image
              class="w-7 h-7"
              src={import("@images/instagram.svg")}
              alt="Instagram picture"
              format="svg"
            />
          </a> --> </div> </div> </div> <div class="flex justify-center w-full"> <p class="font-normal text-sm lg:text-base">
&copy; ${data?.copyright} </p> </div> </div> </footer>`;
}, "D:/IT-Friends main/src/components/Footer.astro", void 0);

const $$FreeLessonForm = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="top-0 left-0 z-50 fixed flex justify-center items-center bg-white w-full h-screen overflow-y-auto transition-transform -translate-x-full duration-300 ease-in-out transform form-slider"> <div class="container"> <div class="h-screen"> <div class="flex flex-row lg:flex-col justify-between mb-1 py-2 lg:py-0"> <div class="lg:mb-3"> <a href="/"> ${renderComponent($$result, "Image", $$Image, { "src": import('./logo_kTktt8L3.mjs'), "format": "svg", "alt": "IT Friends logo" })} </a> </div> <div> <button type="button" class="group hidden lg:flex items-center form-close"> <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:stroke-primary-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path> </svg> <p class="font-secondary font-medium group-hover:text-primary-orange text-lg">Назад</p> </button> </div> <button type="button" class="lg:hidden form-close"> <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-700 hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div class="flex justify-center items-center h-screen"> <form class="flex flex-col items-center lg:shadow-xl lg:px-14 py-9 rounded-lg free-lesson-form" action="#"> <h2 class="mb-4 font-secondary font-semibold text-primary-green text-xl text-center">Спробуйте безкоштовний урок!</h2> <div class="mb-7 lg:max-w-md"> <p class="font-secondary text-center">Заповніть коротку форму — і ми підберемо для вашої дитини безкоштовне заняття з напрямку, який її цікавить.</p> </div> <label class="flex flex-col mb-7 w-full lg:w-80 font-secondary font-medium" for="">
Ім’я*
<input class="pl-3 border focus:border-2 rounded-md h-10 form-input-name" type="text"> <span class="hidden mt-1 text-red-error text-sm form-error">Поле обов’язкове</span> </label> <label class="flex flex-col mb-7 w-full lg:w-80 font-secondary font-medium" for="">
Прізвище*
<input class="pl-3 border focus:border-2 rounded-md h-10 form-input-lastname" type="text"> <span class="hidden mt-1 text-red-error text-sm form-error">Поле обов’язкове</span> </label> <label class="flex flex-col mb-7 w-full lg:w-80 font-secondary font-medium" for="">
Вік дитини*
<input class="pl-3 border focus:border-2 rounded-md h-10 form-input-age" type="text"> <span class="hidden mt-1 text-red-error text-sm form-error">Поле обов’язкове</span> </label> <label class="flex flex-col mb-7 w-full lg:w-80 font-secondary font-medium" for="">
Номер телефону*
<input class="pl-3 border focus:border-2 rounded-md h-10 form-input-phone" type="text"> <span class="hidden mt-1 text-red-error text-sm form-error">Введіть номер телефону</span> </label> <button class="px-8 py-4 font-secondary font-medium orange-btn" type="submit">Надіслати заявку</button> </form> <div class="hidden animate-fadeInUp form-success"> <div class="flex flex-col items-center gap-6 lg:gap-9 lg:w-96"> <h2 class="font-secondary font-semibold text-lg lg:text-2xl text-center">
Форма успішно надіслана! Дякуємо, ми зв’яжемось з вами протягом 24 годин
</h2> ${renderComponent($$result, "Image", $$Image, { "src": import('./form-done_jOjllhFA.mjs'), "format": "svg", "alt": "IT Friends logo" })} </div> </div> </div> </div> </div> </div> ${renderScript($$result, "D:/IT-Friends main/src/components/FreeLessonForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/FreeLessonForm.astro", void 0);

const $$Contacts = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="lg:hidden right-0 bottom-1 z-10 fixed flex flex-col menu-controls"> <button type="button" class="menu-btn-call"> ${renderComponent($$result, "Image", $$Image, { "src": import('./call-btn_BuFkpzx3.mjs'), "format": "svg", "alt": "Call" })} </button> <button type="button" class="menu-btn-telegram"> ${renderComponent($$result, "Image", $$Image, { "src": import('./telegram-btn_DAohGMAb.mjs'), "format": "svg", "alt": "Telegram" })} </button> </div> <div class="top-0 left-0 z-50 fixed flex flex-col justify-center items-center gap-4 bg-white w-full h-screen overflow-x-auto transition-transform -translate-x-full duration-300 ease-in-out menu-panel menu-call transform"> <div class="container"> <div class="top-4 right-4 absolute cursor-pointer close"> ${renderComponent($$result, "Image", $$Image, { "src": import('./green-close_BgPosg56.mjs'), "format": "svg", "alt": "Close menu" })} </div> <div class="mb-5"> <h2 class="font-secondary font-medium text-xl text-center">Оберіть, будь ласка,  напрямок, який цікавить:</h2> </div> <div class="flex flex-col items-center gap-4 w-full"> <a href="tel:+38067" class="contact-btn">IT школа</a> <a href="tel:+38098" class="contact-btn">Англійська для дітей</a> <a href="tel:+38093" class="contact-btn">IT табори</a> <a href="tel:+38050" class="contact-btn">Франшиза</a> </div> </div> </div> <div class="top-0 left-0 z-50 fixed flex flex-col justify-center items-center gap-4 bg-white w-full h-screen overflow-x-auto transition-transform -translate-x-full duration-300 ease-in-out menu-panel menu-telegram transform"> <div class="container"> <div class="top-4 right-4 absolute cursor-pointer close"> ${renderComponent($$result, "Image", $$Image, { "src": import('./green-close_BgPosg56.mjs'), "format": "svg", "alt": "Close menu" })} </div> <div class="mb-5"> <h2 class="font-secondary font-medium text-xl text-center">Оберіть, будь ласка, зручну для вас адресу:</h2> </div> <div class="flex flex-col gap-4"> <a href="https://t.me/user1" target="_blank" class="py-2 contact-btn"> <span>ЖМ Борщагівка</span> <span>Б-р, Кольцова 14</span> </a> <a href="https://t.me/user2" target="_blank" class="py-2 contact-btn"> <span>ЖМ Харківська-Позняки</span> <span>Вул. Кошиця 9Б</span> </a> <a href="https://t.me/user3" target="_blank" class="py-2 contact-btn"> <span>ЖМ Позняки</span> <span>Пр-т, Григоренко 16</span> </a> <a href="https://t.me/user4" target="_blank" class="py-2 contact-btn"> <span>ЖМ Троєщина</span> <span>Пр-т, Маяковського 91в</span> </a> <a href="https://t.me/user5" target="_blank" class="py-2 contact-btn"> <span>ЖМ Воскресенка</span> <span>Вул. Курнатовського 22</span> </a> </div> </div> </div> ${renderScript($$result, "D:/IT-Friends main/src/components/Contacts.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/Contacts.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("http://localhost:4321");
const $$Default = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Default;
  const { settings, lang, seo } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html class="scroll-smooth" lang="en"> ', "", '<body class="flex flex-col min-h-[100svh]"> ', " ", " ", ' <main aria-label="Content"> ', " </main> ", ' <!-- <script type="module" src="/src/scripts/app.ts"><\/script> --> ', " </body></html>"])), renderComponent($$result, "HeadBase", $$Head, { ...seo }), maybeRenderHead(), renderComponent($$result, "Header", $$Header, { "data": settings?.header, "lang": lang }), renderComponent($$result, "Contacts", $$Contacts, {}), renderComponent($$result, "FreeLessonForm", $$FreeLessonForm, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data": settings?.footer, "lang": lang }), renderScript($$result, "D:/IT-Friends main/src/layouts/Default.astro?astro&type=script&index=0&lang.ts"));
}, "D:/IT-Friends main/src/layouts/Default.astro", void 0);

const $$Astro = createAstro("http://localhost:4321");
const $$PostContentSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostContentSection;
  const { post } = Astro2.props;
  const html = toHTML(post.content, {
    components: {
      // Каждый блок — отдельный <p>, заголовки — по стилю
      block: ({ children, value }) => {
        const c = String(children).replace(/\n/g, "<br/>");
        switch (value?.style) {
          case "h2":
            return `<h2>${c}</h2>`;
          case "h3":
            return `<h3>${c}</h3>`;
          case "h4":
            return `<h4>${c}</h4>`;
          default:
            return `<p>${c}</p>`;
        }
      },
      // Маркировки текста
      marks: {
        strong: ({ children }) => `<strong>${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        link: ({ children, value }) => {
          const href = value?.href || "#";
          return `<a href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
        }
      }
    }
  });
  const alt = post.image.alt ?? post.title;
  return renderTemplate`${maybeRenderHead()}<section class="py-9 lg:py-16"> <div class="container"> <div class="flex"> <div class="flex flex-col basis-full lg:basis-9/12"> <h1 class="mb-9 lg:mb-10 font-bold text-2xl lg:text-4xl">${post.title}</h1> <div class="zoom-wrapper"> <img class="mb-14 w-full h-full aspect-28/15"${addAttribute(post.image.url, "src")}${addAttribute(alt, "alt")} loading="lazy" decoding="async"> </div> <!-- Контент с абзацами/заголовками/ссылками --> <div class="space-y-4 max-w-none prose">${unescapeHTML(html)}</div> </div> </div> </div> </section> ${renderScript($$result, "D:/IT-Friends main/src/components/staticSections/blog/PostContentSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/staticSections/blog/PostContentSection.astro", void 0);

export { $$Default as $, BLOG_POST_WITH_SETTINGS as B, PAGE_WITH_SETTINGS as P, BLOG_POST_SLUGS as a, $$PostContentSection as b, query as q };
