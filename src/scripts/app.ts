// src/scripts/app.ts

/** Срабатывает и на первой загрузке, и при клиентских переходах */
function onPageLoad(cb: () => void) {
  // Astro SPA / View Transitions
  document.addEventListener('astro:page-load', cb);
  // Первая загрузка без SPA
  if (document.readyState !== 'loading') cb();
  else document.addEventListener('DOMContentLoaded', cb);
}

/** Однократная инициализация на элемент */
function onceOn(el: Element, key: string, fn: () => void) {
  const flag = `data-init-${key}`;
  const node = el as HTMLElement;
  if (node.hasAttribute(flag)) return;
  node.setAttribute(flag, '1');
  fn();
}

/** Инициализация всех скриптов хедера */
async function initHeaderFeatures(root: Element) {
  // Ленивая подгрузка модулей параллельно
  const [burgerMod, langMod, courseMod] = await Promise.all([
    import('./hamburger'),       // ранее вы импортировали @scripts/hamburger
    import('./languageToggle'),  // ранее @scripts/languageToggle
    import('./courseToggle'),    // ранее @scripts/courseToggle
  ]);

  const setupBurger = (burgerMod as any).setupBurger ?? (burgerMod as any).default;
  const setupToggleArrow = (langMod as any).setupToggleArrow ?? (langMod as any).default;
  const setupCourseToggle = (courseMod as any).setupCourseToggle ?? (courseMod as any).default;

  // Передаём root как опциональный аргумент — лишний аргумент не сломает
  if (typeof setupBurger === 'function') setupBurger(root);
  if (typeof setupToggleArrow === 'function') setupToggleArrow(root);
  if (typeof setupCourseToggle === 'function') setupCourseToggle(root);
}

/** На каждой странице ищем header и инициализируем ровно один раз */
onPageLoad(() => {
  const headers = document.querySelectorAll<HTMLElement>('[data-header]');
  headers.forEach((header) => {
    onceOn(header, 'header-features', () => initHeaderFeatures(header));
  });
});

/** Небольшой сброс перед сменой страницы (по желанию) */
document.addEventListener('astro:before-swap', () => {
  document.documentElement.classList.remove('menu-open');
});
