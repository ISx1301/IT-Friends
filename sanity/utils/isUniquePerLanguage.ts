export async function isUniquePerLanguage(
  slugValue: string | { current?: string },
  context: any 
): Promise<boolean> {
  const doc = context?.document ?? {};
  const getClient = context?.getClient;
  if (typeof getClient !== 'function') return true;

  const client = getClient({ apiVersion: '2024-05-23' });

  const id = String(doc?._id || '').replace(/^drafts\./, '');
  const lang = String(doc?.language ?? doc?.__i18n_lang ?? '').toLowerCase();
  const type = String(doc?._type || 'blog');
  const slug = typeof slugValue === 'string' ? slugValue : String(slugValue?.current || '');

  if (!slug || !lang) return true;

  const params = { id, type, lang, slug };

  const query = `
    count(*[
      _type == $type &&
      lower(coalesce(language, __i18n_lang)) == $lang &&
      slug.current == $slug &&
      !(_id in [$id, "drafts." + $id])
    ]) == 0
  `;

  const ok = await client.fetch(query, params);
  return Boolean(ok);
}
