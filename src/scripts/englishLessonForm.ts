import { DEFAULT_LANG, LOCALE, BRANCHES, type Lang } from "@/constants";

// --- helpers ---
function getLang(): Lang {
  const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  if (htmlLang === "uk" || htmlLang === "en") return htmlLang;
  const globalLang = (window as any).__LANG as string | undefined;
  if (globalLang === "uk" || globalLang === "en") return globalLang;
  return DEFAULT_LANG as Lang;
}

export function setupEnglishLessonForm() {
  const lang = getLang();
  const t = LOCALE[lang].formEnglish; 
  const branchesDict = BRANCHES[lang];

  const MSG = {
    chooseAddress: lang === "en" ? "Please choose an address" : "Оберіть адресу",
    sending: lang === "en" ? "Sending…" : "Відправляємо…",
    submitError: lang === "en" ? "Submission failed. Please try again." : "Помилка при відправці. Спробуйте ще раз.",
    networkError: lang === "en" ? "Network error. Please try again later." : "Помилка мережі. Спробуйте пізніше.",
  };

  // --- DOM ---
  const form = document.querySelector<HTMLFormElement>(".english-lesson-form");
  const successBlock = document.querySelector<HTMLElement>(".english-form-success");
  const slider = document.querySelector<HTMLElement>(".english-form-slider");
  const addressPanel = document.querySelector<HTMLElement>(".english-address-panel");

  const pickButtons = document.querySelectorAll<HTMLButtonElement>(".js-pick-branch-en");
  const closeAddressBtn = document.querySelectorAll<HTMLElement>(".js-close-english-address");
  const closeButtons = document.querySelectorAll<HTMLElement>(".english-form-close");

  const branchInput = document.querySelector<HTMLInputElement>(".js-english-branch-value");
  const branchHint = document.querySelector<HTMLParagraphElement>(".js-english-branch-hint");
  const statusEl = document.querySelector<HTMLParagraphElement>(".english-form-status");

  const openTriggers = document.querySelectorAll<HTMLElement>(".english-lesson-form-open");

  // --- show/hide ---
  const show = (el?: Element | null) => { el?.classList.remove("-translate-x-full"); el?.classList.add("translate-x-0"); };
  const hide = (el?: Element | null) => { el?.classList.add("-translate-x-full"); el?.classList.remove("translate-x-0"); };

  const openAddressPanel = () => show(addressPanel);
  const closeAddressPanel = () => hide(addressPanel);
  const openForm = () => show(slider);
  const closeForm = () => hide(slider);

  // --- listeners ---
  openTriggers.forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); openAddressPanel(); }));
  closeAddressBtn.forEach((btn) => btn.addEventListener("click", closeAddressPanel));

  pickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const branch = (btn.dataset.branch || "") as keyof typeof branchesDict;
      if (branchInput) branchInput.value = branch;
      const info = branchesDict[branch];
      if (branchHint) branchHint.textContent = info ? `${info.district} — ${info.address}` : "";
      closeAddressPanel();
      openForm();
    });
  });

  closeButtons.forEach((btn) => btn.addEventListener("click", closeForm));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeForm(); closeAddressPanel(); }
  });

  // --- submit ---
  if (form && successBlock && slider) {
    form.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();
      let isValid = true;

      const fields = [
        { input: form.querySelector<HTMLInputElement>(".english-input-parent"),      error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".english-input-child-first"), error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".english-input-child-last"),  error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".english-input-age"),         error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".english-input-street"),      error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".english-input-phone"),       error: t.phoneError,    validate: (v: string) => v.replace(/\D/g, "").length >= 10 },
      ];

      fields.forEach(({ input, error, validate }) => {
        if (!input) return;
        const parent = input.parentElement!;
        const errEl = parent.querySelector<HTMLSpanElement>(".form-error");
        if (!validate(input.value)) {
          isValid = false;
          input.classList.add("border-red-error");
          if (errEl) { errEl.textContent = error; errEl.classList.remove("hidden"); }
        } else {
          input.classList.remove("border-red-error");
          errEl?.classList.add("hidden");
        }
      });

      if (!branchInput?.value) {
        isValid = false;
        if (statusEl) statusEl.textContent = MSG.chooseAddress;
      }
      if (!isValid) return;

      try {
        if (statusEl) statusEl.textContent = MSG.sending;
        const res = await fetch("/api/submit-english", { method: "POST", body: new FormData(form) });
        const data = await res.json().catch(() => ({} as any));
        if (res.ok && (data as any).ok) {
          form.classList.add("hidden");
          successBlock.classList.remove("hidden");
          if (statusEl) statusEl.textContent = "";
          form.reset();
        } else {
          if (statusEl) statusEl.textContent = MSG.submitError;
          console.error("submit failed:", data);
        }
      } catch (err) {
        if (statusEl) statusEl.textContent = MSG.networkError;
        console.error(err);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", setupEnglishLessonForm);
