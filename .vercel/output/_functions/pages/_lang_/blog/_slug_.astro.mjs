import '../../../chunks/Head_DHFPoC9H.mjs';
import { a as createAstro, c as createComponent, b as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_Cb6GeMOu.mjs';
import 'kleur/colors';
import { q as query, $ as $$Default, B as BLOG_POST_WITH_SETTINGS, a as BLOG_POST_SLUGS, b as $$PostContentSection } from '../../../chunks/PostContentSection_Bc5Xkg2Q.mjs';
import { D as DEFAULT_LANG } from '../../../chunks/constants_CZJe0MuS.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const prerender = false;
async function getStaticPaths() {
  const rows = await query(BLOG_POST_SLUGS);
  if (!rows?.length) return [];
  const paths = rows.map(({ lang, rawSlug }) => {
    let s = String(rawSlug || "").replace(/^\/+|\/+$/g, "");
    if (s.startsWith(`${lang}/`)) s = s.slice(lang.length + 1);
    if (s === "" || s === lang) s = "index";
    if (s.includes("/")) s = s.split("/").pop();
    return { params: { lang, slug: s } };
  }).filter((p) => p.params.slug !== "index" && p.params.slug !== "blog");
  return paths;
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { lang = DEFAULT_LANG, slug } = Astro2.params;
  const data = await query(BLOG_POST_WITH_SETTINGS, { lang, slug });
  if (!data?.post) {
    return Astro2.redirect(`/404`, 302);
  }
  const { post, settings } = data;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "settings": settings, "lang": lang, "seo": { title: post.title } }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PostContentSection", $$PostContentSection, { "post": post })} ` })}`;
}, "D:/IT-Friends main/src/pages/[lang]/blog/[slug].astro", void 0);

const $$file = "D:/IT-Friends main/src/pages/[lang]/blog/[slug].astro";
const $$url = "/[lang]/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
