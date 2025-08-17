/* empty css                          */
import { createClient } from '@sanity/client';
import { a as createAstro, c as createComponent, e as addAttribute, f as renderHead, r as renderTemplate } from './astro/server_Cb6GeMOu.mjs';
import 'kleur/colors';
import 'clsx';

const sanityClient = createClient(
            {"apiVersion":"2021-10-21","projectId":"hf1wg9uc","dataset":"production","useCdn":true,"token":"skzoYd3SkD6dAIqBMhdCynZZUKXfyPOnCUP8AOcCLXzryjdscqy0dJg4iKGQtdkVYGhjS4HxPxt4uue5D0rC1y01w4SRN3RfZNt4dLAbFHlcACgR3HiQwTngVd43xYtcZUanOAKeG0dy6PhjGSOQUnODA0V67rmBIaqxUNG38r3JQlBpvBoK"}
          );

globalThis.sanityClient = sanityClient;

const $$Astro = createAstro("http://localhost:4321");
const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Head;
  const { title, description, image } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const ogImageAbsolute = image ? new URL(image, Astro2.site).toString() : null;
  return renderTemplate`<head><!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}>${description && renderTemplate`<meta name="description"${addAttribute(description, "content")}>`}<!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalURL, "content")}><meta property="og:title"${addAttribute(title, "content")}>${description && renderTemplate`<meta property="og:description"${addAttribute(description, "content")}>`}${ogImageAbsolute && renderTemplate`<meta property="og:image"${addAttribute(ogImageAbsolute, "content")}>`}<!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:url"${addAttribute(canonicalURL, "content")}><meta name="twitter:title"${addAttribute(title, "content")}>${description && renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>`}${ogImageAbsolute && renderTemplate`<meta name="twitter:image"${addAttribute(ogImageAbsolute, "content")}>`}${renderHead()}</head>`;
}, "D:/IT-Friends main/src/components/Head.astro", void 0);

export { $$Head as $, sanityClient as s };
