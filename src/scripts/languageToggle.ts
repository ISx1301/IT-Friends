type Lang = "uk" | "en";

type SetupOpts = {
  locales?: ReadonlyArray<Lang>;
};

function isLang(x: string): x is Lang {
  return x === "uk" || x === "en";
}

function computeTargetPath(
  path: string,
  targetLang: Lang,
  locales: ReadonlyArray<Lang>
): string {
  const cleaned = "/" + String(path || "/").replace(/\/+/g, "/").replace(/^\/|\/$/g, "");
  const parts = cleaned === "/" ? [] : cleaned.split("/").filter(Boolean);

  const hasPrefix = parts.length > 0 && locales.includes(parts[0] as Lang);
  const currentLang = hasPrefix ? (parts[0] as Lang) : undefined;
  const contentParts = hasPrefix ? parts.slice(1) : parts;

  const isHome =
    (!hasPrefix && parts.length === 0) ||
    (currentLang === "uk" && (contentParts.length === 0 || (contentParts.length === 1 && (contentParts[0] === "index" || contentParts[0] === "uk")))) ||
    (currentLang === "en" && (contentParts.length === 0 || (contentParts.length === 1 && (contentParts[0] === "index" || contentParts[0] === "en"))));

  if (isHome) {
    return targetLang === "uk" ? "/uk/" : "/en/en";
  }

  const tail = "/" + contentParts.join("/");
  return targetLang === "uk" ? `/uk${tail}` : `/en${tail}`;
}

export function setupToggleArrow(opts: SetupOpts = {}): void {
  const { locales = ["uk", "en"] as const } = opts;

  const langContainers = document.querySelectorAll<HTMLElement>(".lang-select");

  langContainers.forEach((container) => {
    const arrow = container.querySelector<HTMLElement>(".arrow-lang");
    const menu = container.querySelector<HTMLElement>(".lang-menu");
    const currentLang = container.querySelector<HTMLElement>(".current-lang");
    if (!arrow || !menu || !currentLang) return;

    container.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
      arrow.classList.toggle("-rotate-180");
    });

    menu.querySelectorAll<HTMLLIElement>("li[data-lang]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();

        // "UA"/"EN" -> "uk"/"en"
        const raw = (item.getAttribute("data-lang") || "").toLowerCase();
        const normalized = raw === "ua" ? "uk" : raw;

        if (!isLang(normalized)) return; 

        const targetLang: Lang = normalized;

        currentLang.textContent = targetLang.toUpperCase();
        menu.classList.add("hidden");
        arrow.classList.remove("-rotate-180");

        const nextPath = computeTargetPath(window.location.pathname, targetLang, locales);
        document.cookie = `language=${targetLang}; path=/; max-age=31536000`;
        window.location.assign(nextPath + window.location.search + window.location.hash);
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
