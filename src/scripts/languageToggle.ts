type SetupOpts = {
  locales?: string[];              
};

function computeTargetPath(path: string, targetLang: string, locales: string[]): string {
  const cleaned = path.replace(/\/+/g, "/");
  let parts = cleaned.replace(/^\/|\/$/g, "").split("/").filter(Boolean);

  const hasPrefix = parts.length > 0 && locales.includes(parts[0]);

  const contentParts = hasPrefix ? parts.slice(1) : parts;

  if (targetLang === "uk") {
    if (contentParts.length === 0) return "/";                          
    return "/uk/" + contentParts.join("/");                              
  }

  if (targetLang === "en") {
    if (contentParts.length === 0) return "/en";                         
    return "/en/" + contentParts.join("/");
  }

  return cleaned.startsWith("/") ? cleaned : "/" + cleaned;
}

export function setupToggleArrow(opts: SetupOpts = {}): void {
  const { locales = ["uk", "en"] } = opts;

  const langContainers = document.querySelectorAll<HTMLElement>(".lang-select");

  langContainers.forEach((container) => {
    const arrow = container.querySelector<HTMLElement>(".arrow-lang");
    const menu = container.querySelector<HTMLElement>(".lang-menu");
    const currentLang = container.querySelector<HTMLElement>(".current-lang");
    if (!arrow || !menu || !currentLang) return;

    // Open/close menu
    container.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
      arrow.classList.toggle("-rotate-180");
    });

    // Lang choose
    menu.querySelectorAll<HTMLLIElement>("li[data-lang]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        // "UA"/"EN" -> "uk"/"en"
        const raw = (item.getAttribute("data-lang") || "").toLowerCase();
        const targetLang = raw === "ua" ? "uk" : raw;

        if (!locales.includes(targetLang)) return;

        currentLang.textContent = targetLang.toUpperCase();
        menu.classList.add("hidden");
        arrow.classList.remove("-rotate-180");

        const nextPath = computeTargetPath(window.location.pathname, targetLang, locales);
        document.cookie = `language=${targetLang}; path=/; max-age=31536000`;
        window.location.assign(nextPath);
      });
    });

    document.addEventListener("click", (e) => {
      const t = e.target as HTMLElement | null;
      if (t && !container.contains(t)) {
        menu.classList.add("hidden");
        arrow.classList.remove("-rotate-180");
      }
    });
  });
}
