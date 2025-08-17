import { a as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, d as renderSlot, r as renderTemplate, b as renderComponent, u as unescapeHTML, i as renderScript, am as Fragment } from './astro/server_Cb6GeMOu.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { B as BG_CLASSES, H as HEADING_ALIGN_CLASSES, A as ABOUT_LAYOUT_ROW_CLASSES, a as BADGE_BORDER_CLASSES, D as DEFAULT_LANG, L as LOCALE } from './constants_CZJe0MuS.mjs';
import { toHTML } from '@portabletext/to-html';
import './index_MaT6fT73.mjs';
import { $ as $$Image } from './_astro_assets_XwumF92K.mjs';
import { b as $$PostContentSection } from './PostContentSection_Bc5Xkg2Q.mjs';

const $$Astro$o = createAstro("http://localhost:4321");
const $$Article = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$o, $$props, $$slots);
  Astro2.self = $$Article;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute([className, "content"], "class:list")} role="article" aria-label="Починаю читати"> ${renderSlot($$result, $$slots["default"])} </article>`;
}, "D:/IT-Friends main/src/components/Article.astro", void 0);

const $$Astro$n = createAstro("http://localhost:4321");
const $$AboutSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$n, $$props, $$slots);
  Astro2.self = $$AboutSection;
  const ptComponents = {
    marks: {
      em: ({ children }) => `<em>${children}</em>`,
      strong: ({ children }) => `<strong>${children}</strong>`,
      link: ({ value, children }) => {
        const href = value?.href || "#";
        const blank = value?.openInNewTab;
        const target = blank ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}" class="underline hover:no-underline"${target}>${children}</a>`;
      }
    }
  };
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const headingAlignClass = HEADING_ALIGN_CLASSES[section.headingAlign ?? "left"];
  const rowClass = ABOUT_LAYOUT_ROW_CLASSES[section.layout ?? "image-left"];
  const badgeBorderClass = BADGE_BORDER_CLASSES[section.content?.badges?.borderColor ?? "mint"];
  const order = section.content?.order?.length ? section.content.order.map((i) => i.kind) : ["h3", "paragraphs", "h4", "badges"];
  const paragraphs = section.content?.paragraphs ?? [];
  const badges = section.content?.badges?.items ?? [];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`py-20 lg:py-32 ${bgClass}`, "class")}> <div class="container"> <div${addAttribute(`mb-8 basis-1/4 lg:basis-1/12 ${headingAlignClass}`, "class")}> ${section.heading && renderTemplate`<h2 class="font-secondary font-medium text-2xl lg:text-3xl"> ${section.heading} </h2>`} </div> <div${addAttribute(`flex flex-col ${rowClass} gap-8 basis-1/4 lg:basis-1/12`, "class")}> <div class="lg:basis-6/12 basis-1/4"> ${section.image?.url && renderTemplate`<img${addAttribute(section.image.url, "src")}${addAttribute(section.image.alt ?? "", "alt")} loading="lazy" decoding="async" class="w-full h-auto">`} </div> <div class="flex flex-col lg:basis-6/12 basis-1/4"> ${order.map((kind) => {
    switch (kind) {
      case "h3":
        return section.content?.h3 ? renderTemplate`<h3 class="mb-5 font-secondary font-semibold text-xl lg:text-3xl"> ${section.content.h3} </h3>` : null;
      case "paragraphs": {
        if (!paragraphs.length) return null;
        const html = toHTML(paragraphs, { components: ptComponents });
        return renderTemplate`<div class="mb-12 lg:mb-auto"> ${renderComponent($$result, "Article", $$Article, {}, { "default": ($$result2) => renderTemplate` <div class="max-w-none prose">${unescapeHTML(html)}</div> ` })} </div>`;
      }
      case "h4":
        return section.content?.h4 ? renderTemplate`<h4 class="mt-auto mb-4 font-bold text-2xl"> ${section.content.h4} </h4>` : null;
      case "badges":
        return badges.length ? renderTemplate`<div class="gap-4 grid grid-cols-2 mb-12 lg:mb-auto lg:[grid-template-columns:max-content_max-content]"> ${badges.map((b) => renderTemplate`<span${addAttribute(`block w-full px-4 lg:px-6 py-1 lg:py-2 border ${badgeBorderClass} rounded-3xl lg:w-[12rem] font-play font-normal text-xl text-center`, "class")}> ${b} </span>`)} </div>` : null;
    }
  })} </div> </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/AboutSection.astro", void 0);

const $$Astro$m = createAstro("http://localhost:4321");
const $$AccordionSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$m, $$props, $$slots);
  Astro2.self = $$AccordionSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const items = section.items ?? [];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: {
      normal: ({ children }) => `<p>${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class='text-primary-orange' href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const descriptionHtml = toHTML(section.description ?? [], { components: ptComponents });
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} py-16`, "class")} id="faq"> <div class="container"> <div class="flex lg:flex-row flex-col justify-between"> <div class="lg:py-14 basis-4/12"> <div class="m-auto lg:mx-0 mb-6 max-w-xs"> ${section.heading && renderTemplate`<h2 class="mb-8 font-secondary font-medium text-2xl lg:text-3xl lg:text-left text-center"> ${section.heading} </h2>`} </div> ${Boolean(section.description?.length) && renderTemplate`${renderComponent($$result, "Article", $$Article, { "class": "m-auto lg:mx-0 mb-9 max-w-xs lg:text-left text-center" }, { "default": ($$result2) => renderTemplate` <div>${unescapeHTML(descriptionHtml)}</div> ` })}`} ${section.buttonText && renderTemplate`<button type="button" class="hidden lg:inline-block px-7 py-3 leading-none transparent-btn"> ${section.buttonText} </button>`} </div> <!-- Accordion --> <div class="space-y-4 accordion basis-6/12"> ${items.map((it) => {
    const answerHtml = toHTML(it.answer ?? [], { components: ptComponents });
    return renderTemplate`<div class="border rounded-md overflow-hidden accordion-item"> <h2 class="accordion-header"> <button type="button" class="flex justify-between items-center bg-transparent p-5 w-full font-semibold lg:font-bold text-base lg:text-lg text-left transition-colors accordion-trigger" aria-expanded="false"> <span>${it.question}</span> <span class="accordion-icon"> <svg class="w-5 h-5 accordion-icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M256 80v352M80 256h352"></path> </svg> <svg class="hidden w-5 h-5 accordion-icon-minus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"> <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M80 256h352"></path> </svg> </span> </button> </h2> <div class="max-h-0 overflow-hidden transition-all duration-500 ease-in-out accordion-panel"> <div class="p-5 border-t"> ${renderComponent($$result, "Article", $$Article, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(answerHtml)}` })} ` })} </div> </div> </div>`;
  })} </div> </div> </div> </section> ${renderScript($$result, "D:/IT-Friends main/src/components/sharedSections/AccordionSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/sharedSections/AccordionSection.astro", void 0);

const $$Astro$l = createAstro("http://localhost:4321");
const $$GeneralDescriptionSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$GeneralDescriptionSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const cards = section.cards ?? [];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: { normal: ({ children }) => `<p>${children}</p>` },
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class='text-primary-orange' href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const descriptionHtmlByIndex = cards.map(
    (c) => toHTML(c?.description ?? [], { components: ptComponents })
  );
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} my-20 lg:my-28`, "class")}> <div class="container"> ${section.heading && renderTemplate`<div class="flex justify-center mx-auto mb-6 lg:mb-8 py-0.5"> <h2 class="mb-6 lg:mb-7 font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h2> </div>`} ${cards.length > 0 && renderTemplate`<div class="flex lg:flex-row flex-col items-stretch gap-5"> ${cards.map((card, idx) => renderTemplate`<div class="flex flex-col items-center gap-7 bg-white shadow-lg px-8 lg:px-6 py-10 rounded-lg w-full"> ${card.image?.url && renderTemplate`<img${addAttribute(card.image.url, "src")}${addAttribute(card.image.alt ?? "", "alt")} loading="lazy" decoding="async" class="max-h-28 object-contain">`} ${card.title && renderTemplate`<h3 class="font-secondary font-semibold text-xl lg:text-2xl text-center"> ${card.title} </h3>`} ${(card.description?.length ?? 0) > 0 && renderTemplate`${renderComponent($$result, "Article", $$Article, { "class": "font-medium text-base lg:text-lg text-center" }, { "default": ($$result2) => renderTemplate` <div>${unescapeHTML(descriptionHtmlByIndex[idx])}</div> ` })}`} </div>`)} </div>`} ${section.buttonText && renderTemplate`<div class="flex justify-center mt-8"> <button class="px-5 py-4 font-secondary font-medium text-lg orange-btn form-open" type="button"> ${section.buttonText} </button> </div>`} </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/GeneralDescriptionSection.astro", void 0);

const $$Astro$k = createAstro("http://localhost:4321");
const $$HeroZoomImageSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$HeroZoomImageSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: { normal: ({ children }) => `<p>${children}</p>` },
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class='text-primary-orange' href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const descriptionHtml = toHTML(section.description ?? [], { components: ptComponents });
  const defaultOrder = ["logo", "badge", "heading", "description", "button", "image"];
  const order = section.order?.map((i) => i?.kind).filter(Boolean)?.length ? section.order.map((i) => i.kind) : defaultOrder;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} relative mt-11 lg:mt-16`, "class")}> <div class="container"> ${order.map((k) => {
    switch (k) {
      case "logo":
        return section.logo?.url && renderTemplate`<div class="flex justify-center mb-3"> <img${addAttribute(section.logo.url, "src")}${addAttribute(section.logo.alt ?? "", "alt")} loading="lazy" decoding="async" class="max-h-16 object-contain"> </div>`;
      case "badge":
        return section.badgeText && renderTemplate`<div class="flex justify-center mb-6 lg:mb-8"> <div class="inline-block bg-transparent-btn-hover-bg px-2 py-0.5 rounded"> <p class="text-sm lg:text-base">${section.badgeText}</p> </div> </div>`;
      case "heading":
        return section.heading && renderTemplate`<div class="flex justify-center mb-6 lg:mb-7"> <h1 class="lg:w-2/3 font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h1> </div>`;
      case "description":
        return Boolean(section.description?.length) && renderTemplate`<div class="mx-auto mb-11 lg:mb-11 max-w-md"> ${renderComponent($$result, "Article", $$Article, { "class": "font-normal text-lg text-center" }, { "default": ($$result2) => renderTemplate` <div>${unescapeHTML(descriptionHtml)}</div> ` })} </div>`;
      case "button":
        return section.buttonText && renderTemplate`<div class="flex justify-center mb-11 basis-1/4 lg:basis-1/12"> <button class="px-5 py-4 font-secondary font-medium text-lg orange-btn form-open" type="button"> ${section.buttonText} </button> </div>`;
      case "image":
        return section.mainImage?.url && renderTemplate`<div class="relative mb-6 lg:mb-0 rounded-xl aspect-5/2 overflow-hidden"> <div class="z-10 absolute inset-0 bg-black opacity-40"></div> <img class="z-0 relative w-full h-full object-cover animate-zoom-pulse"${addAttribute(section.mainImage.url, "src")}${addAttribute(section.mainImage.alt ?? "", "alt")} loading="eager" decoding="async"> </div>`;
      default:
        return null;
    }
  })} </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/HeroZoomImageSection.astro", void 0);

const $$Astro$j = createAstro("http://localhost:4321");
const $$InterestingThingsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$InterestingThingsSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const items = section.items ?? [];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: {
      normal: ({ children }) => `<p class="text-base lg:text-lg">${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong class="font-semibold">${children}</strong>`,
      em: ({ children }) => `<em class="italic">${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const itemsDescHtml = items.map((it) => toHTML(it?.ptDescription ?? [], { components: ptComponents }));
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} [.${bgClass}+&]:!pt-0 px-20 border py-32`, "class")}> <div class="container"> ${section.heading && renderTemplate`<div class="mx-auto mb-5 lg:mb-11 max-w-xs lg:max-w-2xl"> <h2 class="font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h2> </div>`} <div class="items-stretch gap-11 lg:gap-5 grid grid-cols-1 lg:grid-cols-2"> ${items.map((it, i) => renderTemplate`<div class="h-full"> <div class="flex flex-col gap-y-5 h-full"> ${it?.image?.url && renderTemplate`<div> <img class="w-full h-auto object-cover"${addAttribute(it.image.url, "src")}${addAttribute(it.image.alt ?? "", "alt")} loading="lazy" decoding="async"> </div>`} ${it?.title && renderTemplate`<div class="max-w-md"> <h3 class="font-bold text-xl">${it.title}</h3> </div>`} ${(it?.ptDescription?.length ?? 0) > 0 && renderTemplate`${renderComponent($$result, "Article", $$Article, { "class": "mt-auto max-w-sm text-left" }, { "default": ($$result2) => renderTemplate` <div>${unescapeHTML(itemsDescHtml[i])}</div> ` })}`} ${it?.buttonText && renderTemplate`<button type="button" class="mt-auto px-1 py-3 lg:w-64 transparent-btn"> ${it.buttonText} </button>`} </div> </div>`)} </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/InterestingThingsSection.astro", void 0);

const $$Astro$i = createAstro("http://localhost:4321");
const $$PeculiaritiesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$PeculiaritiesSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const left = section.row1 ?? [];
  const right = section.row2 ?? [];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: { normal: ({ children }) => `<p>${children}</p>` },
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`py-20 lg:py-32 ${bgClass}`, "class")}> <div class="container"> <div class="w-full"> ${section.heading && renderTemplate`<h2 class="mb-9 lg:mb-14 text-3xl lg:text-4xl text-center">${section.heading}</h2>`} </div> <div class="gap-5 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2"> ${left.slice(0, 2).map((card, i) => {
    const html = toHTML(card.description ?? [], { components: ptComponents });
    const row = i === 0 ? "lg:row-start-1" : "lg:row-start-2";
    return renderTemplate`<div${addAttribute(`bg-white px-5 py-7 rounded-md w-full ${row} lg:col-start-1 flex flex-col h-full`, "class")}> ${card.image?.url && renderTemplate`<img class="mb-3 rounded-md w-12 object-cover"${addAttribute(card.image.url, "src")}${addAttribute(card.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${card.title && renderTemplate`<h3 class="mb-2 font-semibold text-lg lg:text-xl">${card.title}</h3>`} <div class="max-w-none prose grow">${unescapeHTML(html)}</div> </div>`;
  })} <div class="lg:col-start-2 row-span-1 lg:row-span-2 rounded-md overflow-hidden"> ${section.mainImage?.url && renderTemplate`<img class="w-full h-52 lg:h-full object-cover"${addAttribute(section.mainImage.url, "src")}${addAttribute(section.mainImage.alt ?? "", "alt")} loading="lazy" decoding="async">`} </div> ${right.slice(0, 2).map((card, i) => {
    const html = toHTML(card.description ?? [], { components: ptComponents });
    const row = i === 0 ? "lg:row-start-1" : "lg:row-start-2";
    return renderTemplate`<div${addAttribute(`bg-white px-5 py-7 rounded-md w-full ${row} lg:col-start-3 flex flex-col h-full`, "class")}> ${card.image?.url && renderTemplate`<img class="mb-3 rounded-md w-12 object-cover"${addAttribute(card.image.url, "src")}${addAttribute(card.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${card.title && renderTemplate`<h3 class="mb-2 font-semibold text-lg lg:text-xl">${card.title}</h3>`} <div class="max-w-none prose grow">${unescapeHTML(html)}</div> </div>`;
  })} </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/PeculiaritiesSection.astro", void 0);

const $$Astro$h = createAstro("http://localhost:4321");
const $$Excerpt = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Excerpt;
  const props = Astro2.props;
  const className = props.class ?? "";
  const wordLength = props.wordLength;
  const isLang = (v) => typeof v === "string" && (v === "uk" || v === "en");
  const resolvedLang = isLang(props.lang) ? props.lang : isLang(DEFAULT_LANG) ? DEFAULT_LANG : "uk";
  const dict = LOCALE[resolvedLang];
  const html = await Astro2.slots.render("default");
  const plainText = html.trim();
  const words = plainText.split(/\s+/);
  const shouldTruncate = wordLength !== void 0 && words.length > wordLength;
  const excerptedWords = shouldTruncate ? words.slice(0, wordLength) : words;
  const excerptedText = excerptedWords.join(" ");
  const readMoreHtml = `<span class="font-bold cursor-pointer read-more">${dict.readMore}</span>`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`excerpt-container ${className}`, "class")}> <div class="text-base excerpt-text"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(excerptedText + (shouldTruncate ? `... ${readMoreHtml}` : ""))}` })}</div> <div class="hidden text-base full-text">${unescapeHTML(plainText)}</div> </div> ${shouldTruncate && renderTemplate`${renderScript($$result, "D:/IT-Friends main/src/components/Excerpt.astro?astro&type=script&index=0&lang.ts")}`}`;
}, "D:/IT-Friends main/src/components/Excerpt.astro", void 0);

const $$Astro$g = createAstro("http://localhost:4321");
const $$EmblaCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$EmblaCarousel;
  const { containerClass = "", options } = Astro2.props;
  const baseOptions = {
    loop: true,
    ...options
  };
  return renderTemplate`${maybeRenderHead()}<div class="embla"${addAttribute(JSON.stringify(baseOptions), "data-options")} data-astro-cid-giprlulo> <div class="embla__viewport" data-astro-cid-giprlulo> <div${addAttribute(`embla__container ${containerClass}`, "class")} data-astro-cid-giprlulo> ${renderSlot($$result, $$slots["slides"])} </div> </div> <div class="embla__controls" data-astro-cid-giprlulo> ${renderSlot($$result, $$slots["controls"])} </div> </div>  ${renderScript($$result, "D:/IT-Friends main/src/components/EmblaCarousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/EmblaCarousel.astro", void 0);

const $$Astro$f = createAstro("http://localhost:4321");
const $$ReviewsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$ReviewsSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const reviews = section.reviews ?? [];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: {
      normal: ({ children }) => `<p>${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const paragraphsHtml = toHTML(section.paragraphs ?? [], { components: ptComponents });
  const STRIPE_CLASSES = ["bg-primary-green", "bg-primary-orange", "bg-span-gray"];
  const stripeClassByIndex = (i) => STRIPE_CLASSES[i % STRIPE_CLASSES.length];
  const seg = Astro2.url.pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
  const lang = seg === "en" ? "en" : "uk";
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`py-16 lg:py-32 ${bgClass} overflow-hidden`, "class")} id="reviews"> <div class="container"> <div class="flex lg:flex-row flex-col justify-between"> <div class="py-14 basis-4/12"> ${section.heading && renderTemplate`<h2 class="mb-8 font-secondary font-medium text-2xl lg:text-3xl lg:text-left text-center"> ${section.heading} </h2>`} ${Boolean(section.paragraphs?.length) && renderTemplate`${renderComponent($$result, "Article", $$Article, { "class": "mb-11 lg:text-left text-center" }, { "default": ($$result2) => renderTemplate` <div>${unescapeHTML(paragraphsHtml)}</div> ` })}`} ${section.buttonText && renderTemplate`<button type="button" class="hidden lg:inline-block px-7 py-3 leading-none transparent-btn"> ${section.buttonText} </button>`} </div> <div class="flex flex-row lg:flex-col justify-between gap-5 basis-6/12"> ${renderComponent($$result, "EmblaCarousel", $$EmblaCarousel, { "containerClass": "lg:flex-col overflow-visible", "options": { breakpoints: { "(min-width: 1272px)": { active: false } } } }, { "controls": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "controls" }, { "default": ($$result3) => renderTemplate` <div class="lg:hidden flex justify-center items-center gap-3 mt-4"> <button class="embla__prev" type="button" aria-label="Previous slide"> ${renderComponent($$result3, "Image", $$Image, { "class": "w-6 h-6", "src": import('./embla-prev-svg_CQgyYHHf.mjs'), "alt": "prev-btn" })} </button> <div class="flex justify-center items-center gap-1 bg-gray rounded-2xl w-24 h-9" aria-live="polite" aria-atomic="true"> <p class="font-bold text-primary-green embla-current"></p> <p class="font-bold">/</p> <p class="font-bold embla-total"></p> </div> <button class="embla__next" type="button" aria-label="Next slide"> ${renderComponent($$result3, "Image", $$Image, { "class": "w-6 h-6", "src": import('./embla-next-svg_DL3cuSYO.mjs'), "alt": "next-btn" })} </button> </div> ` })}`, "slides": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "slides" }, { "default": ($$result3) => renderTemplate`${reviews.map((rv, index) => {
    const isEven = index % 2 === 0;
    const stripe = stripeClassByIndex(index);
    const cardClass = `embla__slide flex lg:flex-row flex-col lg:justify-between items-center gap-5 lg:gap-0
                 bg-white shadow-none lg:shadow-md border border-gray lg:border-none rounded-md
                 w-[31rem] min-w-full lg:min-w-0 ${isEven ? "ml-auto" : ""}`;
    const reviewHtml = toHTML(rv.text ?? [], { components: ptComponents });
    return renderTemplate`<div${addAttribute(cardClass, "class")}> <div${addAttribute(`${stripe} rounded-md w-full lg:w-2 h-2 lg:h-[-webkit-fill-available]`, "class")}></div> <div class="my-3"> ${rv.avatar?.url && renderTemplate`<img class="rounded-full w-16 h-16 object-cover"${addAttribute(rv.avatar.url, "src")}${addAttribute(rv.avatar.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${rv.name && renderTemplate`<p class="font-normal">${rv.name}</p>`} </div> <div class="max-w-xs"> ${renderComponent($$result3, "Article", $$Article, {}, { "default": ($$result4) => renderTemplate`${renderComponent($$result4, "Excerpt", $$Excerpt, { "lang": lang, "wordLength": 15 }, { "default": ($$result5) => renderTemplate` <div class="text-center lg:text-start">${unescapeHTML(reviewHtml)}</div> ` })} ` })} </div> ${section.buttonText && renderTemplate`<button type="button" class="lg:hidden my-6 py-5 border-black w-11/12 leading-none transparent-btn"> ${section.buttonText} </button>`} </div>`;
  })}` })}` })} </div> </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/ReviewsSection.astro", void 0);

const $$Astro$e = createAstro("http://localhost:4321");
const $$TeamSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$TeamSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const members = section.members ?? [];
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: {
      normal: ({ children }) => `<p>${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong>${children}</strong>`,
      em: ({ children }) => `<em>${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const descriptionHtml = toHTML(section.description ?? [], { components: ptComponents });
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`py-16 lg:py-32 w-full overflow-visible ${bgClass}`, "class")}> <div class="container"> <div class="m-auto mb-16 max-w-lg"> ${section.heading && renderTemplate`<h2 class="mb-8 font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h2>`} ${Boolean(section.description?.length) && renderTemplate`<div class="font-normal text-base text-center"> <div>${unescapeHTML(descriptionHtml)}</div> </div>`} </div> </div> <div class="p-0 container"> <div class="flex lg:gap-5 pb-4 lg:overflow-hidden"> ${renderComponent($$result, "EmblaCarousel", $$EmblaCarousel, { "containerClass": "!gap-0 -mr-5", "options": { breakpoints: { "(min-width: 1272px)": { slidesToScroll: 1, loop: true, align: "start" } } } }, { "controls": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "controls" }, { "default": ($$result3) => renderTemplate` <div class="flex justify-around items-center gap-3 mt-4"> <button class="embla__prev" type="button" aria-label="Previous slide"> ${renderComponent($$result3, "Image", $$Image, { "class": "w-8 h-8", "src": import('./embla-prev2_07QaYn8a.mjs'), "format": "svg", "alt": "prev-btn" })} </button> <div class="flex justify-center items-center gap-1 bg-gray rounded-2xl w-24 h-9" aria-live="polite" aria-atomic="true"> <p class="font-bold embla-current"></p> <p class="font-bold">/</p> <p class="font-bold embla-total"></p> </div> <button class="embla__next" type="button" aria-label="Next slide"> ${renderComponent($$result3, "Image", $$Image, { "class": "w-8 h-8", "src": import('./embla-next2_CJL8fzh5.mjs'), "alt": "next-btn", "format": "svg" })} </button> </div> ` })}`, "slides": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "slides" }, { "default": ($$result3) => renderTemplate`${members.map((m, index) => {
    const isEven = (index + 1) % 2 === 0;
    const colWrap = isEven ? "flex flex-col lg:flex-col-reverse gap-6 pr-5" : "flex flex-col gap-6 pr-5";
    const slidePad = isEven ? "pt-0 lg:pt-16" : "";
    return renderTemplate`<div${addAttribute(`flex-grow-0 flex-shrink-0 min-w-80 lg:min-w-0 basis-1/2 lg:basis-1/4 ${slidePad}`, "class")}> <div${addAttribute(colWrap, "class")}> <div class="rounded-full aspect-2/3"> ${m.photo?.url && renderTemplate`<img class="rounded-full w-full h-full object-cover"${addAttribute(m.photo.url, "src")}${addAttribute(m.photo.alt ?? "", "alt")} loading="lazy" decoding="async">`} </div> <div class="flex flex-col items-center"> ${m.name && renderTemplate`<h3 class="font-medium text-lg">${m.name}</h3>`} ${m.subject && renderTemplate`<p class="text-base">${m.subject}</p>`} ${m.social?.icon?.url && m.social?.url && renderTemplate`<a${addAttribute(m.social.url, "href")} target="_blank" rel="noopener noreferrer"> <img class="w-7 h-7"${addAttribute(m.social.icon.url, "src")}${addAttribute(m.social.icon.alt ?? "", "alt")} loading="lazy" decoding="async"> </a>`} </div> </div> </div>`;
  })}` })}` })} </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/TeamSection.astro", void 0);

const $$Astro$d = createAstro("http://localhost:4321");
const $$Tabs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Tabs;
  const { divider = true, triggerType = "tab", class: classes, colorKey } = Astro2.props;
  const color1 = "bg-transparent-btn-hover-bg";
  const color2 = "bg-primary-sand";
  const colorMap = {
    gray: color1,
    sand: color2
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["tabs  ", classes], "class:list")} data-tabs role="tablist"> <div${addAttribute([
    "flex justify-center gap-5 lg:gap-10 font-secondary font-semibold  text-base lg:text-lg text-center container tab-triggers",
    triggerType === "pill" ? "bg-gradient-pills-to from-gradient-pills-from to-gradient-pills-to p-2 gap-5 w-11/12 lg:max-w-max rounded-full mb-14" : ""
  ], "class:list")} role="tablist"> ${renderSlot($$result, $$slots["triggers"])} </div> ${divider && renderTemplate`<div${addAttribute(["min-h-52", colorMap[colorKey]], "class:list")}></div>`} <div${addAttribute([
    "relative tab-content ",
    divider ? "top-[-9rem]" : ""
  ], "class:list")}> ${renderSlot($$result, $$slots["content"])} </div> </div> ${renderScript($$result, "D:/IT-Friends main/src/components/Tabs.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/Tabs.astro", void 0);

const $$Astro$c = createAstro("http://localhost:4321");
const $$TabsTrigger = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$TabsTrigger;
  const tabColorMap = {
    gray: "bg-transparent-btn-hover-bg",
    sand: "bg-primary-sand"
  };
  const {
    id,
    colorKey,
    triggerType = "tab",
    class: classes
  } = Astro2.props;
  const isActive = id.slice(-1) === "1";
  return renderTemplate`${maybeRenderHead()}<button${addAttribute([
    "tab-trigger inline-block px-3 lg:px-7 py-3 duration-300",
    triggerType === "pill" ? "rounded-full w-full" : "rounded-t-lg",
    isActive ? triggerType === "pill" ? "bg-white text-black" : `${tabColorMap[colorKey]} text-black ` : triggerType === "pill" ? "bg-[transparent] text-white" : "bg-[transparent] text-black",
    classes
  ], "class:list")} role="tab"${addAttribute(id, "data-tab")}${addAttribute(triggerType, "data-trigger-type")}${addAttribute(tabColorMap[colorKey], "data-color")}${addAttribute(isActive, "aria-selected")} type="button"> ${renderSlot($$result, $$slots["default"])} </button>`;
}, "D:/IT-Friends main/src/components/TabsTrigger.astro", void 0);

const $$Astro$b = createAstro("http://localhost:4321");
const $$TabContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$TabContent;
  const { id, class: classes } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["tab-panel", id.slice(-1) === "1" ? "" : "hidden", classes], "class:list")}${addAttribute(id, "data-content")} role="tabpanel"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "D:/IT-Friends main/src/components/TabContent.astro", void 0);

const $$Astro$a = createAstro("http://localhost:4321");
const $$WithoutNestedTabsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$WithoutNestedTabsSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const tabs = section.tabs ?? [];
  const panels = section.panels ?? [];
  const cardsKind = section.cardsKind ?? "regular";
  const tabsColorKey = section.tabsColorKey ?? "gray";
  const count = Math.min(tabs.length, panels.length);
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptPanelComponents = {
    block: {
      normal: ({ children }) => `<p class="max-w-md font-medium text-3xl text-center">${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong class="font-semibold">${children}</strong>`,
      em: ({ children }) => `<em class="italic">${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const ptCardComponents = {
    block: {
      normal: ({ children }) => `<p class="text-base lg:text-lg">${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong class="font-semibold">${children}</strong>`,
      em: ({ children }) => `<em class="italic">${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const panelDescHtml = panels.map(
    (p) => toHTML(p?.panelDescription ?? [], { components: ptPanelComponents })
  );
  const regularDescHtml = panels.map(
    (p) => (p?.regularCards ?? []).map(
      (c) => toHTML(c?.ptDescription ?? c?.description ?? [], {
        components: ptCardComponents
      })
    )
  );
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} `, "class")}> <div class="container"> ${section.heading && renderTemplate`<div class="mx-auto mb-10 lg:mb-16 max-w-md"> <h2 class="font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h2> </div>`} </div> ${count > 0 && renderTemplate`${renderComponent($$result, "Tabs", $$Tabs, { "colorKey": tabsColorKey, "divider": true }, { "content": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result3) => renderTemplate`${Array.from({ length: count }).map((_, i) => {
    const id = `tab_${i + 1}`;
    const panel = panels[i];
    return renderTemplate`${renderComponent($$result3, "TabContent", $$TabContent, { "id": id }, { "default": ($$result4) => renderTemplate` <div class="container"> ${cardsKind === "clickable" && (panel?.panelDescription?.length ?? 0) > 0 && renderTemplate`<div class="flex justify-center lg:mb-12"> ${renderComponent($$result4, "Article", $$Article, {}, { "default": ($$result5) => renderTemplate` <div>${unescapeHTML(panelDescHtml[i])}</div> ` })} </div>`} <div class="card-block gap-5 grid grid-cols-1 lg:grid-cols-3"> ${(() => {
      switch (cardsKind) {
        case "clickable": {
          const p = panels[i];
          const cards = p.clickableCards;
          const nodes = cards.map((c) => renderTemplate`<a${addAttribute(c.href, "href")} class="block space-y-3 bg-white shadow-xl hover:shadow-2xl px-6 py-9 rounded-xl w-full transition card"> <img class="mx-auto object-contain"${addAttribute(c.image.url, "src")}${addAttribute(c.image.alt ?? "", "alt")} loading="lazy" decoding="async"> <h3 class="font-secondary font-semibold text-2xl text-center"> ${c.title} </h3> <p class="font-medium text-base lg:text-lg text-center"> ${c.plainDescription} </p> <p class="text-center">${c.phone}</p> </a>`);
          nodes.push(
            renderTemplate`<div class="flex justify-center col-span-full mt-11 lg:mt-16"> <button class="px-5 py-4 font-secondary font-medium text-lg orange-btn form-open" type="button"> ${section.buttonText} </button> </div>`
          );
          return nodes;
        }
        case "regular": {
          const p = panels[i];
          const cards = p.regularCards;
          const nodes = cards.map((c, idx2) => renderTemplate`<div class="flex flex-col gap-3 bg-white shadow-xl px-6 py-9 rounded-xl w-full h-full card"> <img class="mx-auto max-h-32 object-contain"${addAttribute(c.image.url, "src")}${addAttribute(c.image.alt ?? "", "alt")} loading="lazy" decoding="async"> <h3 class="font-secondary font-semibold text-2xl text-center"> ${c.title} </h3> ${renderComponent($$result4, "Article", $$Article, { "class": "flex-1" }, { "default": ($$result5) => renderTemplate` <div>${unescapeHTML(regularDescHtml[i][idx2])}</div> ` })} <button type="button" class="mt-auto py-5 w-full font-secondary font-medium text-lg orange-btn form-open"> ${c.buttonText} </button> </div>`);
          nodes.push(
            renderTemplate`<div class="flex justify-center col-span-full"> <button type="button" class="px-11 py-3 transparent-btn show-more-btn"> ${section.showMoreText} </button> </div>`
          );
          return nodes;
        }
        default:
          return null;
      }
    })()} </div> </div> ` })}`;
  })}` })}`, "triggers": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "triggers" }, { "default": ($$result3) => renderTemplate`${Array.from({ length: count }).map((_, i) => {
    const tab = tabs[i];
    const id = `tab_${i + 1}`;
    return renderTemplate`${renderComponent($$result3, "TabTrigger", $$TabsTrigger, { "id": id, "colorKey": tabsColorKey }, { "default": ($$result4) => renderTemplate`${tab?.icon?.url && renderTemplate`<img${addAttribute(tab.icon.url, "src")}${addAttribute(tab.icon.alt ?? "", "alt")} loading="lazy" decoding="async" class="inline-block mr-2 mb-2 lg:mb-0 w-6 h-6 object-contain">
                  <br class="lg:hidden">`}${tab?.label ?? tab?.text ?? `Tab ${i + 1}`}` })}`;
  })}` })}` })}`} </section>`;
}, "D:/IT-Friends main/src/components/sharedSections/WithoutNestedTabsSection.astro", void 0);

const $$Astro$9 = createAstro("http://localhost:4321");
const $$HeroBlogSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$HeroBlogSection;
  const { section, anchorId } = Astro2.props;
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptComponents = {
    block: {
      normal: ({ children }) => `<p class="font-normal text-white text-center">${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong class="font-semibold">${children}</strong>`,
      em: ({ children }) => `<em class="italic">${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="underline underline-offset-2" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const descHtml = toHTML(section?.description ?? [], { components: ptComponents });
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")} class="relative"> <div class="before:absolute relative before:inset-0 before:bg-black/60 rounded-none aspect-3/1 lg:aspect-[11/3] overflow-hidden before:content-['']"> ${section?.image?.url && renderTemplate`<img class="w-full h-full object-cover"${addAttribute(section.image.url, "src")}${addAttribute(section.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} <div class="absolute inset-0 flex justify-center items-center px-4"> <div class="w-full lg:max-w-[25rem]"> ${section?.heading && renderTemplate`<h1 class="mb-4 lg:mb-5 font-secondary font-medium text-white text-2xl lg:text-4xl text-center"> ${section.heading} </h1>`} ${(section?.description?.length ?? 0) > 0 && renderTemplate`<div class="text-white text-center">${unescapeHTML(descHtml)}</div>`} </div> </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/blog/HeroBlogSection.astro", void 0);

const $$Astro$8 = createAstro("http://localhost:4321");
const $$PostListSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$PostListSection;
  const { section } = Astro2.props;
  const posts = section.posts;
  const buttonText = section.buttonText;
  const lang = Astro2.params.lang ?? "uk";
  return renderTemplate`${maybeRenderHead()}<section class="py-20"> <div class="container"> <div class="gap-x-5 gap-y-16 grid grid-cols-1 lg:grid-cols-3 mb-11 posts-container"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/${lang}/blog/${post.slug}`, "href")}> <div class="hidden post-card"> <img${addAttribute(post.image.url, "src")}${addAttribute(post.image.alt || post.title, "alt")} loading="lazy" decoding="async" class="w-full h-auto"> <h3 class="mt-3 font-semibold">${post.title}</h3> <p class="opacity-80 mt-2 line-clamp-3">${post.content}</p> <time class="block opacity-60 mt-2 text-sm"> ${new Date(post.date).toLocaleDateString()} </time> </div> </a>`)} </div> <div class="flex justify-center"> <button type="button" class="px-20 py-3 transparent-btn load-more-btn"> ${buttonText} </button> </div> </div> </section> ${renderScript($$result, "D:/IT-Friends main/src/components/staticSections/blog/PostListSection.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/IT-Friends main/src/components/staticSections/blog/PostListSection.astro", void 0);

const $$Astro$7 = createAstro("http://localhost:4321");
const $$PostCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { post } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/blog/${post.slug}`, "href")}> <div> ${renderComponent($$result, "Image", $$Image, { "class": "mb-8 w-full h-full object-cover", "src": post.image, "format": "webp", "alt": post.title })} <h2 class="mb-6 font-bold text-xl">${post.title}</h2> ${renderComponent($$result, "Article", $$Article, { "class:list": "mb-6" }, { "default": ($$result2) => renderTemplate`${post.previewContent}` })} <span class="text-data-gray">${post.date}</span> </div> </a>`;
}, "D:/IT-Friends main/src/components/PostCard.astro", void 0);

const $$Astro$6 = createAstro("http://localhost:4321");
const $$RelatedPostsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$RelatedPostsSection;
  const { posts } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="py-14"> <div class="container"> <div class="gap-6 grid grid-cols-1 lg:grid-cols-3"> ${posts.map((post) => renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "post": post, "key": post.slug })}`)} </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/blog/RelatedPostsSection.astro", void 0);

const playPng = new Proxy({"src":"/_astro/play.iqFupsR9.png","width":74,"height":74,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/IT-Friends main/public/play.png";
							}
							
							return target[name];
						}
					});

const $$Astro$5 = createAstro("http://localhost:4321");
const $$VideoCampsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$VideoCampsSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} [.${bgClass}+&]:!pt-0 px-20 border py-32`, "class")}> <div class="container"> <a${addAttribute(section.videoHref, "href")} target="_blank" rel="noopener noreferrer" aria-label="Відтворити відео"> <div class="group relative rounded-xl aspect-[3/4] lg:aspect-[2/1] overflow-hidden"> ${section?.image?.url && renderTemplate`<img class="rounded-xl w-full h-full object-cover"${addAttribute(section.image.url, "src")}${addAttribute(section.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition pointer-events-none"></div> ${renderComponent($$result, "AstroImage", $$Image, { "src": playPng, "alt": "", "aria-hidden": "true", "class": "top-1/2 left-1/2 z-10 absolute group-hover:brightness-90 w-16 md:w-20 h-16 md:h-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none", "loading": "lazy" })} </div> </a> </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/camps/VideoCampsSection.astro", void 0);

const $$Astro$4 = createAstro("http://localhost:4321");
const $$WithNestedTabsCampsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$WithNestedTabsCampsSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const groups = section.pillGroups ?? [];
  const innerColorKey = section.innerTabsColorKey ?? "gray";
  const kind = section.cardsKind ?? "regular";
  const escapeAttr = (s) => (s ?? "").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ptIntroComponents = {
    block: {
      normal: ({ children }) => `<p class="text-base lg:text-lg text-center">${children}</p>`
    },
    marks: {
      strong: ({ children }) => `<strong class="font-semibold">${children}</strong>`,
      em: ({ children }) => `<em class="italic">${children}</em>`,
      link: ({ value, children }) => {
        const href = escapeAttr(value?.href);
        if (!href) return children;
        return `<a class="text-primary-orange underline" href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
      }
    }
  };
  const ptPanelComponents = {
    block: {
      normal: ({ children }) => `<p class="mx-auto max-w-xl font-medium text-xl text-center">${children}</p>`
    },
    marks: ptIntroComponents.marks
  };
  const ptCardComponents = {
    block: {
      normal: ({ children }) => `<p class="text-base lg:text-lg leading-6 lg:leading-7">${children}</p>`
    },
    marks: ptIntroComponents.marks
  };
  const introHtml = toHTML(section.intro ?? [], { components: ptIntroComponents });
  const BADGE_CLASSES = [
    "bg-span-gray text-white",
    "bg-span-sand text-black",
    "bg-span-mint text-black"
  ];
  const badgeClassByIndex = (i) => BADGE_CLASSES[i % BADGE_CLASSES.length];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} `, "class")}> <div class="container"> ${section.heading && renderTemplate`<div class="mx-auto mb-6 lg:mb-8 max-w-md"> <h2 class="font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h2> </div>`} ${section.intro && section.intro.length > 0 && renderTemplate`<div class="mx-auto mb-12 lg:max-w-lg"> ${renderComponent($$result, "Article", $$Article, {}, { "default": ($$result2) => renderTemplate` <div>${unescapeHTML(introHtml)}</div> ` })} </div>`} </div> ${groups.length > 0 && renderTemplate`${renderComponent($$result, "Tabs", $$Tabs, { "colorKey": "gray", "divider": false, "triggerType": "pill" }, { "content": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result3) => renderTemplate`${groups.map((g, gi) => {
    const outerId = `pill_${gi + 1}`;
    const tabs = g.tabs ?? [];
    const panels = g.panels ?? [];
    const count = Math.min(tabs.length, panels.length);
    return renderTemplate`${renderComponent($$result3, "TabContent", $$TabContent, { "id": outerId }, { "default": ($$result4) => renderTemplate`${count > 0 && renderTemplate`${renderComponent($$result4, "Tabs", $$Tabs, { "colorKey": innerColorKey, "divider": true, "triggerType": "tab" }, { "content": ($$result5) => renderTemplate`${renderComponent($$result5, "Fragment", Fragment, { "slot": "content" }, { "default": ($$result6) => renderTemplate`${Array.from({ length: count }).map((_, ti) => {
      const id = `sub_${gi + 1}_${ti + 1}`;
      const panel = panels[ti];
      const panelDescHtml = toHTML(panel?.panelDescription ?? [], { components: ptPanelComponents });
      const regularDescHtml = (panel?.regularCards ?? []).map(
        (c) => toHTML(c?.ptDescription ?? [], { components: ptCardComponents })
      );
      return renderTemplate`${renderComponent($$result6, "TabContent", $$TabContent, { "id": id }, { "default": ($$result7) => renderTemplate` <div class="container"> ${kind === "clickable" && (panel?.panelDescription?.length ?? 0) > 0 && renderTemplate`<div class="flex justify-center lg:mb-12"> ${renderComponent($$result7, "Article", $$Article, {}, { "default": ($$result8) => renderTemplate` <div>${unescapeHTML(panelDescHtml)}</div> ` })} </div>`} <div class="card-block gap-5 grid grid-cols-1 lg:grid-cols-3"> ${(() => {
        switch (kind) {
          case "clickable": {
            const cards = panel?.clickableCards ?? [];
            const nodes = cards.map((c) => renderTemplate`<a${addAttribute(c.href, "href")} class="block space-y-3 bg-white shadow-xl hover:shadow-2xl px-6 py-9 rounded-xl w-full transition card"> ${c.image?.url && renderTemplate`<img class="mx-auto object-contain"${addAttribute(c.image.url, "src")}${addAttribute(c.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${c.title && renderTemplate`<h3 class="font-secondary font-semibold text-2xl text-center">${c.title}</h3>`} ${c.plainDescription && renderTemplate`<p class="font-medium text-base lg:text-lg text-center">${c.plainDescription}</p>`} ${c.phone && renderTemplate`<p class="text-center">${c.phone}</p>`} </a>`);
            if (section.buttonText) {
              nodes.push(
                renderTemplate`<div class="flex justify-center col-span-full mt-11 lg:mt-16"> <button class="px-5 py-4 font-secondary font-medium text-lg orange-btn form-open" type="button"> ${section.buttonText} </button> </div>`
              );
            }
            return nodes;
          }
          case "regular": {
            const cards = panel?.regularCards ?? [];
            const nodes = cards.map((c, ci) => renderTemplate`<div class="flex flex-col gap-3 bg-white shadow-xl px-6 py-9 rounded-xl w-full h-full card"> ${c.image?.url && renderTemplate`<img class="mx-auto max-h-52 object-contain"${addAttribute(c.image.url, "src")}${addAttribute(c.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${c.title && renderTemplate`<h3 class="font-secondary font-semibold text-2xl text-center">${c.title}</h3>`} ${c.ageText && renderTemplate`<div class="text-center"> <span${addAttribute(`mb-auto px-4 py-1 rounded-lg ${badgeClassByIndex(ci)}`, "class")}>${c.ageText}</span> </div>`} ${(c.location?.title || c.location?.icon?.url) && renderTemplate`<div class="flex justify-center items-center gap-2"> ${c.location?.icon?.url && renderTemplate`<img${addAttribute(c.location.icon.url, "src")}${addAttribute(c.location.icon.alt ?? "", "alt")} loading="lazy" decoding="async" class="inline-block w-5 h-5 object-contain">`} ${c.location?.title && renderTemplate`<p class="font-semibold">${c.location.title}</p>`} </div>`} ${(c.ptDescription?.length ?? 0) > 0 && renderTemplate`${renderComponent($$result7, "Article", $$Article, { "class": "flex-1" }, { "default": ($$result8) => renderTemplate` <div>${unescapeHTML(regularDescHtml[ci])}</div> ` })}`} ${c.buttonText && renderTemplate`<button type="button" class="mt-auto py-5 w-full font-secondary font-medium text-lg orange-btn form-open"> ${c.buttonText} </button>`} </div>`);
            nodes.push(
              renderTemplate`<div class="flex justify-center col-span-full"> <button type="button" class="px-11 py-3 transparent-btn show-more-btn"> ${section.showMoreText ?? "\u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044F \u0431\u0456\u043B\u044C\u0448\u0435"} </button> </div>`
            );
            return nodes;
          }
          default:
            return null;
        }
      })()} </div> </div> ` })}`;
    })}` })}`, "triggers": ($$result5) => renderTemplate`${renderComponent($$result5, "Fragment", Fragment, { "slot": "triggers" }, { "default": ($$result6) => renderTemplate`${Array.from({ length: count }).map((_, ti) => {
      const t = tabs[ti];
      const id = `sub_${gi + 1}_${ti + 1}`;
      return renderTemplate`${renderComponent($$result6, "TabTrigger", $$TabsTrigger, { "id": id, "colorKey": innerColorKey, "triggerType": "tab" }, { "default": ($$result7) => renderTemplate`${t?.icon?.url && renderTemplate`<img${addAttribute(t.icon.url, "src")}${addAttribute(t.icon.alt ?? "", "alt")} loading="lazy" decoding="async" class="inline-block mr-2 w-6 h-6 object-contain">`}${t?.label ?? t?.text ?? `\u0422\u0430\u0431 ${ti + 1}`}` })}`;
    })}` })}` })}`}` })}`;
  })}` })}`, "triggers": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "triggers" }, { "default": ($$result3) => renderTemplate`${groups.map((g, gi) => {
    const id = `pill_${gi + 1}`;
    return renderTemplate`${renderComponent($$result3, "TabTrigger", $$TabsTrigger, { "id": id, "colorKey": "gray", "triggerType": "pill" }, { "default": ($$result4) => renderTemplate`${g?.icon?.url && renderTemplate`<img${addAttribute(g.icon.url, "src")}${addAttribute(g.icon.alt ?? "", "alt")} loading="lazy" decoding="async" class="inline-block mr-2 w-6 h-6 object-contain">`}${g?.label ?? g?.text ?? `\u0413\u0440\u0443\u043F\u0430 ${gi + 1}`}` })}`;
  })}` })}` })}`} </section>`;
}, "D:/IT-Friends main/src/components/staticSections/camps/WithNestedTabsCampsSection.astro", void 0);

const $$Astro$3 = createAstro("http://localhost:4321");
const $$OfflineAddressesEnglishSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$OfflineAddressesEnglishSection;
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const items = section.items ?? [];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`${bgClass} py-20 lg:py-32`, "class")}> <div class="container"> ${section.heading && renderTemplate`<div class="mb-9"> <h2 class="font-secondary font-medium text-2xl lg:text-4xl text-center"> ${section.heading} </h2> </div>`} <div class="mb-11"> ${renderComponent($$result, "EmblaCarousel", $$EmblaCarousel, { "options": { breakpoints: { "(min-width: 1272px)": { active: false } } } }, { "controls": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "controls" }, { "default": ($$result3) => renderTemplate` <div class="lg:hidden flex justify-center items-center gap-3 mt-4"> <button class="embla__prev" type="button" aria-label="Previous slide"> ${renderComponent($$result3, "Image", $$Image, { "class": "w-6 h-6", "src": import('./embla-prev-svg_CQgyYHHf.mjs'), "alt": "prev-btn" })} </button> <div class="flex justify-center items-center gap-1 bg-gray rounded-2xl w-24 h-9" aria-live="polite" aria-atomic="true"> <p class="font-bold text-primary-orange embla-current"></p> <p class="font-bold">/</p> <p class="font-bold embla-total"></p> </div> <button class="embla__next" type="button" aria-label="Next slide"> ${renderComponent($$result3, "Image", $$Image, { "class": "w-6 h-6", "src": import('./embla-next-svg_DL3cuSYO.mjs'), "alt": "next-btn" })} </button> </div> ` })}`, "slides": ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "slides" }, { "default": ($$result3) => renderTemplate`${items.map((it) => renderTemplate`<div class="min-w-full lg:min-w-0 embla__slide"> ${it?.href ? renderTemplate`<a${addAttribute(it.href, "href")} target="_blank" rel="noopener noreferrer" class="block h-full"> <div class="flex flex-col items-center gap-5 shadow-lg px-6 py-6 rounded-lg h-full"> ${it?.image?.url && renderTemplate`<img class="rounded-lg"${addAttribute(it.image.url, "src")}${addAttribute(it.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${it?.title && renderTemplate`<h3 class="font-secondary font-semibold text-base lg:text-lg text-center uppercase"> ${it.title} </h3>`} ${(it?.address || it?.phone) && renderTemplate`${renderComponent($$result3, "Article", $$Article, { "class": "max-w-xs font-normal text-center" }, { "default": ($$result4) => renderTemplate`${it.address && renderTemplate`<p>${it.address}</p>`}${it.phone && renderTemplate`<p>${it.phone}</p>`}` })}`} </div> </a>` : renderTemplate`<div class="h-full"> <div class="flex flex-col items-center gap-5 shadow-lg px-6 py-6 rounded-lg h-full"> ${it?.image?.url && renderTemplate`<img class="rounded-lg"${addAttribute(it.image.url, "src")}${addAttribute(it.image.alt ?? "", "alt")} loading="lazy" decoding="async">`} ${it?.title && renderTemplate`<h3 class="font-secondary font-semibold text-base lg:text-lg text-center uppercase"> ${it.title} </h3>`} ${(it?.address || it?.phone) && renderTemplate`${renderComponent($$result3, "Article", $$Article, { "class": "max-w-xs font-normal text-center" }, { "default": ($$result4) => renderTemplate`${it.address && renderTemplate`<p>${it.address}</p>`}${it.phone && renderTemplate`<p>${it.phone}</p>`}` })}`} </div> </div>`} </div>`)}` })}` })} </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/english/OfflineAddressesEnglishSection.astro", void 0);

const $$Astro$2 = createAstro("http://localhost:4321");
const $$AreasOfStudyMainSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AreasOfStudyMainSection;
  const ptComponents = {
    marks: {
      em: ({ children }) => `<em>${children}</em>`,
      strong: ({ children }) => `<strong>${children}</strong>`,
      link: ({ value, children }) => {
        const href = value?.href || "#";
        const blank = value?.openInNewTab;
        const target = blank ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}" class="text-primary-orange"${target}>${children}</a>`;
      }
    }
  };
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const BADGE_CLASSES = [
    "bg-span-gray text-white",
    "bg-span-sand text-black",
    "bg-span-mint text-black"
  ];
  const badgeClassByIndex = (i) => BADGE_CLASSES[i % BADGE_CLASSES.length];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`lg:py-section-top-bottom-padding ${bgClass} py-12`, "class")}> <div class="container"> <div class="flex justify-center mb-6 lg:mb-11 basis-1/4 lg:basis-1/12"> <h2 class="font-secondary text-2xl lg:text-3xl">${section?.heading}</h2> </div> <div class="items-stretch gap-5 grid grid-cols-1 lg:grid-cols-3 mb-11"> ${Array.isArray(section?.cards) && section.cards.length > 0 && section.cards.map((card, idx) => {
    const html = card.paragraphs?.length ? toHTML(card.paragraphs, { components: ptComponents }) : "";
    return renderTemplate`<div class="grid grid-rows-[auto_1fr_auto] bg-white shadow-2xl px-6 lg:px-8 pt-4 pb-9 rounded-lg w-full h-full"> <div class="flex flex-col items-center space-y-3"> ${card?.image?.url && renderTemplate`<img${addAttribute(card.image.url, "src")}${addAttribute(card.image.alt ?? "", "alt")}>`} ${card?.title && renderTemplate`<h3 class="w-full font-secondary font-semibold text-2xl text-center"> ${card.title} </h3>`} ${card?.ageText && renderTemplate`<span${addAttribute(`${badgeClassByIndex(idx)} px-4 py-1 rounded-lg`, "class")}> ${card.ageText} </span>`} </div> <div class="mt-3 min-h-0"> ${renderComponent($$result, "Article", $$Article, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Excerpt", $$Excerpt, { "wordLength": 30 }, { "default": ($$result3) => renderTemplate`${html && renderTemplate`<div class="max-w-none">${unescapeHTML(html)}</div>`}` })} ` })} </div> <div class="flex flex-col gap-3 w-full"> ${card?.secondaryButtonText && renderTemplate`<button class="lg:hidden inline-block py-2 border w-full orange-btn form-open" type="button"> ${card.secondaryButtonText} </button>`} ${card?.primaryButtonText && renderTemplate`<button class="py-2 border w-full transparent-btn" type="button"> ${card.primaryButtonText} </button>`} </div> </div>`;
  })} </div> <div class="hidden lg:flex justify-center basis-1/4 lg:basis-1/12"> <button class="px-5 py-4 font-secondary font-medium text-lg orange-btn form-open" type="button"> ${section.sectionCtaText} </button> </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/main/AreasOfStudyMainSection.astro", void 0);

const $$Astro$1 = createAstro("http://localhost:4321");
const $$HeroSectionMainSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeroSectionMainSection;
  const ptComponents = {
    marks: {
      em: ({ children }) => `<em>${children}</em>`,
      strong: ({ children }) => `<strong>${children}</strong>`,
      link: ({ value, children }) => {
        const href = value?.href || "#";
        const blank = value?.openInNewTab;
        const target = blank ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}" class="text-primary-orange"${target}>${children}</a>`;
      }
    }
  };
  const { section, anchorId } = Astro2.props;
  const bgClass = BG_CLASSES[section.backgroundColor ?? "white"];
  const descHtml = section.description?.length ? toHTML(section.description, { components: ptComponents }) : "";
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`flex ${bgClass} items-stretch min-h-80 lg:min-h-[80vh]`, "class")}> <div class="container"> <div class="flex lg:flex-row flex-col justify-between items-center gap-5"> <div class="flex flex-col items-center lg:items-start order-1 lg:order-0 basis-1/2"> <h1 class="mb-5 font-secondary font-medium text-3xl lg:text-4xl-custom lg:text-left text-center"> ${section?.heading} </h1> ${renderComponent($$result, "Article", $$Article, { "class": "hidden lg:block mb-9 w-96" }, { "default": ($$result2) => renderTemplate`${descHtml && renderTemplate`<div class="max-w-none prose">${unescapeHTML(descHtml)}</div>`}` })} <a class="group inline-flex items-center bg-primary-green lg:bg-black hover:bg-opacity-0 px-10 py-4 border border-primary-green lg:border-black hover:border-black rounded-lg text-white hover:text-black text-lg transition duration-100"${addAttribute(section.button.href, "href")}> ${section.button.text} ${renderComponent($$result, "Image", $$Image, { "class": "group-hover:brightness-0 group-hover:invert-1 ml-2", "src": import('./arrow-outline_DKlj1G0X.mjs'), "format": "svg", "alt": "IT Friends logo" })} </a> ${Array.isArray(section.stats) && section.stats.length > 0 && renderTemplate`<div class="mt-14 mb-20"> <div class="flex lg:flex-row flex-col items-center lg:items-start gap-8 lg:gap-0 -mx-14"> ${section.stats.slice(0, 3).flatMap((s, idx, arr) => [
    renderTemplate`<div class="px-7 text-center"> <p class="font-secondary font-bold text-primary-green text-3xl">${s.number}</p> <p class="font-secondary text-xl"> <span>${unescapeHTML(s.label)}</span> </p> </div>`,
    ...idx < arr.length - 1 ? [
      renderTemplate`<div class="bg-primary-green w-14 lg:w-[1px] h-[1px] lg:h-14"></div>`
    ] : []
  ])} </div> </div>`} </div> <div class="order-0 lg:order-1 mb-1 lg:mb-0 lg:basis-5/12"> ${Array.isArray(section.imageColumns) && section.imageColumns.length > 0 && renderTemplate`<div class="order-0 lg:order-1 mb-10 lg:mb-0 lg:basis-5/12"> <div class="flex gap-x-4 lg:gap-x-5 max-h-80 lg:max-h-[80vh] overflow-hidden"> ${section.imageColumns.slice(0, 4).map((col, idx) => {
    const anim = idx % 2 === 0 ? "animate-[marquee-to-top_90000ms_linear_alternate_infinite]" : "animate-[marquee-to-bottom_110000ms_linear_alternate_infinite]";
    const align = idx === 1 || idx === 3 ? "self-end" : "";
    const lgVisibility = idx === 3 ? "lg:hidden" : "lg:basis-1/3";
    return renderTemplate`<div${addAttribute(`flex flex-col gap-y-4 lg:gap-y-5 h-fit ${anim} ${align} basis-1/4 ${lgVisibility}`, "class")}> ${Array.isArray(col.images) && col.images.map((img) => img?.asset?.url && renderTemplate`<div class="rounded-full aspect-4/11 overflow-hidden shrink-0"> <img class="w-full h-full object-cover"${addAttribute(img.asset.url, "src")}${addAttribute(img.alt ?? "", "alt")} loading="lazy" decoding="async"> </div>`)} </div>`;
  })} </div> </div>`} </div> </div> </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/main/HeroSectionMainSection.astro", void 0);

const $$Astro = createAstro("http://localhost:4321");
const $$NewSchoolMainSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewSchoolMainSection;
  const { section, anchorId } = Astro2.props;
  const group = section.images;
  const REPEAT = 4;
  const groups = Array.from({ length: REPEAT }, () => group);
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(anchorId, "id")}${addAttribute(`py-0 w-full overflow-hidden`, "class")}> ${section.heading && renderTemplate`<div class="mb-6 lg:mb-12 max-w-2xl container"> <h2 class="font-secondary font-medium text-2xl lg:text-4xl text-center">${section.heading}</h2> </div>`} <div class="flex gap-2 lg:gap-5 px-0 w-full h-fit animate-[marquee-to-left_60000ms_linear_alternate_infinite]"> ${groups.map((g) => renderTemplate`<div class="gap-2 lg:gap-5 grid grid-cols-12 min-w-full"> <div class="flex flex-col gap-y-2 lg:gap-y-5 col-span-5 h-full"> <img class="rounded-xl w-full h-full object-cover"${addAttribute(g[0].url, "src")}${addAttribute(g[0].alt ?? "", "alt")}> <img class="rounded-xl w-full h-full object-cover"${addAttribute(g[1].url, "src")}${addAttribute(g[1].alt ?? "", "alt")}> </div> <div class="col-span-3 rounded-xl h-full"> <img class="w-full h-full object-cover"${addAttribute(g[2].url, "src")}${addAttribute(g[2].alt ?? "", "alt")}> </div> <div class="col-span-4 rounded-xl h-full"> <img class="rounded-xl w-full h-full object-cover"${addAttribute(g[3].url, "src")}${addAttribute(g[3].alt ?? "", "alt")}> </div> </div>`)} </div> </section>`;
}, "D:/IT-Friends main/src/components/staticSections/main/NewSchoolMainSection.astro", void 0);

const sectionsRegistry = {
  // shared
  aboutSection: $$AboutSection,
  accordionSection: $$AccordionSection,
  generalDescriptionSection: $$GeneralDescriptionSection,
  heroZoomImageSection: $$HeroZoomImageSection,
  interestingThingsSection: $$InterestingThingsSection,
  peculiaritiesSection: $$PeculiaritiesSection,
  reviewsSection: $$ReviewsSection,
  teamSection: $$TeamSection,
  withoutNestedTabsSection: $$WithoutNestedTabsSection,
  // blog
  heroBlogSection: $$HeroBlogSection,
  postContentSection: $$PostContentSection,
  postListSection: $$PostListSection,
  relatedPostsSection: $$RelatedPostsSection,
  // camps
  videoCampsSection: $$VideoCampsSection,
  withNestedTabsCampsSection: $$WithNestedTabsCampsSection,
  // english
  offlineAddressesEnglishSection: $$OfflineAddressesEnglishSection,
  // main
  areasOfStudyMainSection: $$AreasOfStudyMainSection,
  heroSectionMainSection: $$HeroSectionMainSection,
  newSchoolMainSection: $$NewSchoolMainSection
};

export { sectionsRegistry as s };
