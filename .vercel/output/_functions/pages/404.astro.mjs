import { $ as $$Head } from '../chunks/Head_DHFPoC9H.mjs';
import { a as createAstro, c as createComponent, b as renderComponent, m as maybeRenderHead, d as renderSlot, r as renderTemplate } from '../chunks/astro/server_Cb6GeMOu.mjs';
import 'kleur/colors';
/* empty css                                  */
import { L as LOCALE, D as DEFAULT_LANG } from '../chunks/constants_CZJe0MuS.mjs';
import '../chunks/index_MaT6fT73.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_XwumF92K.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("http://localhost:4321");
const $$Error = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Error;
  const { description, btn404 } = Astro2.props;
  return renderTemplate`<html class="scroll-smooth" lang="en"> ${renderComponent($$result, "HeadBase", $$Head, { "description": description, "btn": btn404 })}${maybeRenderHead()}<body class="flex flex-col min-h-[100svh]"> <main aria-label="Content"> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "D:/IT-Friends main/src/layouts/Error.astro", void 0);

const $$Astro = createAstro("http://localhost:4321");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const firstSeg = Astro2.url.pathname.split("/").filter(Boolean)[0] ?? "";
  const isLang = (x) => x === "uk" || x === "en";
  const lang = isLang(firstSeg) ? firstSeg : isLang(DEFAULT_LANG) ? DEFAULT_LANG : "uk";
  const t = LOCALE[lang];
  const description = t.notFoundText;
  const btn404 = t.btn404;
  return renderTemplate`${renderComponent($$result, "ErrorLayout", $$Error, { "description": description, "btn": btn404 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="place-items-center grid min-h-dvh"> <div class="container"> <div class="flex flex-col items-center"> ${renderComponent($$result2, "Image", $$Image, { "class": "mx-auto lg:aspect-2/1", "src": import('../chunks/logo404_CjGyTKFr.mjs'), "format": "webp", "alt": "logo404" })} <h1 class="lg:mb-9 font-secondary font-medium text-2xl lg:text-4xl">404</h1> <p class="mb-14 lg:max-w-xl font-secondary font-medium text-2xl lg:text-4xl text-center"> ${t.notFoundText} </p> <a href="/"> <button class="px-32 py-5 orange-btn" type="button">${t.btn404}</button> </a> </div> </div> </div> ` })}`;
}, "D:/IT-Friends main/src/pages/404.astro", void 0);

const $$file = "D:/IT-Friends main/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
