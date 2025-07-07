export function setupToggleArrow(): void {
  const langContainers = document.querySelectorAll(".lang-select");

  langContainers.forEach((arrowContainer) => {
    const arrow = arrowContainer.querySelector(".arrow-lang");
    const menu = arrowContainer.querySelector(".lang-menu");
    const currentLang = arrowContainer.querySelector(".current-lang");

    if (!arrow || !menu || !currentLang) {
      return;
    }

    arrowContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
      arrow.classList.toggle("-rotate-180");
    });

    const items = menu.querySelectorAll("li[data-lang]");
    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const lang = item.getAttribute("data-lang");
        if (lang) {
          currentLang.textContent = lang;
          menu.classList.add("hidden");
          arrow.classList.remove("-rotate-180");
        }
      });
    });

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement | null;
      if (target && !arrowContainer.contains(target)) {
        menu.classList.add("hidden");
        arrow.classList.remove("-rotate-180");
      }
    });
  });
}