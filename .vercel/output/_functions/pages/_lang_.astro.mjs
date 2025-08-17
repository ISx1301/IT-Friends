import '../chunks/Head_DHFPoC9H.mjs';
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Cb6GeMOu.mjs';
import 'kleur/colors';
import { q as query, P as PAGE_WITH_SETTINGS, $ as $$Default } from '../chunks/PostContentSection_Bc5Xkg2Q.mjs';
import { D as DEFAULT_LANG } from '../chunks/constants_CZJe0MuS.mjs';
import { s as sectionsRegistry } from '../chunks/sections-registry_CU7pa2SS.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const prerender = false;
const getStaticPaths = async () => {
  const rows = await query(
    `
    *[_type == "page" && defined(slug.current) && defined(language)]{
      "lang": language,
      "rawSlug": slug.current
    }
    `
  );
  if (!rows?.length) {
    console.warn("[getStaticPaths] has no paths for page schema. Check Sanity.");
    return [];
  }
  const langs = /* @__PURE__ */ new Set();
  for (const { lang, rawSlug } of rows) {
    let s = String(rawSlug || "");
    s = s.replace(/^\/+|\/+$/g, "");
    if (s.startsWith(`${lang}/`)) s = s.slice(lang.length + 1);
    if (s === "" || s === lang) s = "index";
    if (s.includes("/")) s = s.split("/")[0];
    if (s === "index") langs.add(lang);
  }
  return Array.from(langs).map((lang) => ({ params: { lang } }));
};
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang = DEFAULT_LANG, slug = "index" } = Astro2.params;
  const data = await query(PAGE_WITH_SETTINGS, { lang, slug });
  if (!data?.page) {
    return Astro2.redirect(`/404`, 302);
  }
  const { page, settings } = data;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "settings": settings, "lang": lang, "seo": page.seo }, { "default": async ($$result2) => renderTemplate`${page?.sections?.map((sec, index) => {
    const Cmp = sectionsRegistry[sec._type];
    const anchorId = `section${index + 1}`;
    return Cmp ? renderTemplate`${renderComponent($$result2, "Cmp", Cmp, { "section": sec, "anchorId": anchorId })}` : renderTemplate`${maybeRenderHead()}<section class="py-6"><div class="container">Unknown section: ${sec._type}</div></section>`;
  })}` })}`;
}, "D:/IT-Friends main/src/pages/[lang]/index.astro", void 0);

const $$file = "D:/IT-Friends main/src/pages/[lang]/index.astro";
const $$url = "/[lang]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
