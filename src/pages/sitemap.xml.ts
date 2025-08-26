// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

const ORIGIN = (import.meta.env.PUBLIC_SITE_URL ?? 'https://www.itfriends-school.com') as string;

const projectId = (import.meta.env.PROJECT_ID || process.env.PROJECT_ID) as string;
const dataset = 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2021-10-21',
  useCdn: true,
});

type BaseEntry = {
  slug?: string;
  lang?: string | null;
  _updatedAt?: string;
};

type UrlEntry = { loc: string; lastmod?: string };

function normalizePath(lang: 'uk' | 'en', raw: string): string {
  let s = String(raw || '').trim();

  try {
    if (/^https?:\/\//i.test(s)) {
      s = new URL(s).pathname;
    }
  } catch {}

  s = s.replace(/^\/+/, '');

  const langPrefix = new RegExp(`^${lang}(?:/|$)`, 'i');
  if (langPrefix.test(s)) s = s.replace(langPrefix, '').replace(/^\/+/, '');

  if (s === '' || s.toLowerCase() === 'index') {
    return `/${lang}/`;
  }

  return `/${lang}/${s.replace(/\/+$/, '')}/`;
}

export const GET: APIRoute = async () => {
  // PAGES
  const pages: BaseEntry[] = await client.fetch(`
    *[
      _type == "page" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      defined(coalesce(language, __i18n_lang))
    ]{
      "slug": slug.current,
      "lang": lower(coalesce(language, __i18n_lang)),
      _updatedAt
    }
  `);

  // BLOG
  const posts: BaseEntry[] = await client.fetch(`
    *[
      _type == "blog" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      defined(coalesce(language, __i18n_lang))
    ]{
      "slug": slug.current,
      "lang": lower(coalesce(language, __i18n_lang)),
      _updatedAt
    }
  `);

  const baseUrls: UrlEntry[] = (['uk', 'en'] as const).map((l) => ({
    loc: new URL(`/${l}/`, ORIGIN).toString(),
  }));

const mapDocs = (docs: BaseEntry[]): UrlEntry[] =>
  docs
    .filter((d) => {
      const lang = (d.lang || '').toLowerCase();
      return lang === 'uk' || lang === 'en';
    })
    .map((d) => {
      const lang = (d.lang || '').toLowerCase() as 'uk' | 'en';
      const raw = d.slug || '';
      const pathname = normalizePath(lang, raw);
      const loc = new URL(pathname, ORIGIN).toString();
      const lastmod = d._updatedAt ? new Date(d._updatedAt).toISOString() : undefined;
      return { loc, lastmod };
    });


const pageUrls = mapDocs(pages);
const postUrls = mapDocs(posts);


  const seen = new Set<string>();
  const all: UrlEntry[] = [...baseUrls, ...pageUrls, ...postUrls].filter(({ loc }) => {
    if (seen.has(loc)) return false;
    seen.add(loc);
    return true;
  });

  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    ({ loc, lastmod }) =>
      `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
