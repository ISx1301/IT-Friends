export function setupBurger(): void {
  const burger = document.querySelector('.burger') as HTMLButtonElement | null;
  const menu = document.querySelector('.hidden-menu') as HTMLElement | null;
  const head = document.querySelector('.header-bg') as HTMLElement | null;

  if (!burger || !menu || !head) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('menu-active');
    head.classList.toggle('menu-active');
  });
}
