import {
  DEFAULT_LANG,
  LOCALE,
  BRANCHES_ONLINE,
  type Lang,
  type BranchIdOnline,
} from "@/constants";

// --- helpers ---
function getLang(): Lang {
  const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  if (htmlLang === "uk" || htmlLang === "en") return htmlLang;
  const globalLang = (window as any).__LANG as string | undefined;
  if (globalLang === "uk" || globalLang === "en") return globalLang;
  return DEFAULT_LANG as Lang;
}

export function setupOnlineLessonForm() {
  const lang = getLang();
  const t = LOCALE[lang].onlineForm;
  const branchesDict = BRANCHES_ONLINE[lang];

  const MSG = {
    chooseAddress: lang === "en" ? "Choose what you want to study" : "Оберіть чим хочете займатися",
    sending: lang === "en" ? "Sending…" : "Відправляємо…",
    submitError: lang === "en" ? "Submission failed. Please try again." : "Помилка при відправці. Спробуйте ще раз.",
    networkError: lang === "en" ? "Network error. Please try again later." : "Помилка мережі. Спробуйте пізніше.",
  };

  // --- DOM ---
  const form = document.querySelector<HTMLFormElement>(".online-lesson-form");
  const successBlock = document.querySelector<HTMLElement>(".online-form-success");
  const slider = document.querySelector<HTMLElement>(".online-form-slider");
  const addressPanel = document.querySelector<HTMLElement>(".online-address-panel");

  const pickButtons = document.querySelectorAll<HTMLButtonElement>(".js-pick-branch-online");
  const closeAddressBtn = document.querySelectorAll<HTMLElement>(".js-close-online-address");
  const closeButtons = document.querySelectorAll<HTMLElement>(".online-form-close");

  const branchInput = document.querySelector<HTMLInputElement>(".js-online-branch-value");
  const branchHint = document.querySelector<HTMLParagraphElement>(".js-online-branch-hint");
  const statusEl = document.querySelector<HTMLParagraphElement>(".online-form-status");

  const openTriggers = document.querySelectorAll<HTMLElement>(".online-lesson-form-open");

  const itCourseWrap = document.querySelector<HTMLElement>(".online-field-itcourse");
  const wantEngWrap = document.querySelector<HTMLElement>(".online-field-wantEnglish");
  const wantItWrap = document.querySelector<HTMLElement>(".online-field-wantIt");

  const itCourseInput = document.querySelector<HTMLInputElement>(".online-input-itcourse");
  const wantEngInput = document.querySelector<HTMLInputElement>(".online-input-want-english");
  const wantItInput = document.querySelector<HTMLInputElement>(".online-input-want-it");

  // --- show/hide/toggle ---
  const show = (el?: Element | null) => { el?.classList.remove("-translate-x-full", "hidden"); el?.classList.add("translate-x-0"); };
  const hide = (el?: Element | null) => { el?.classList.add("-translate-x-full"); el?.classList.remove("translate-x-0"); };

  const on = (el?: Element | null, enabled = true) => {
    if (!el) return;
    if (enabled) el.classList.remove("hidden"); else el.classList.add("hidden");
  };
  const enable = (input?: HTMLInputElement | null, enabled = true) => {
    if (!input) return;
    input.disabled = !enabled;
    if (!enabled) input.value = "";
  };

  const updateExtras = (branch: BranchIdOnline) => {
    const isIT = branch === "online_it";
    on(itCourseWrap, isIT);
    on(wantEngWrap, isIT);
    on(wantItWrap, !isIT);

    enable(itCourseInput, isIT);
    enable(wantEngInput, isIT);
    enable(wantItInput, !isIT);
  };

  const openAddressPanel = () => show(addressPanel);
  const closeAddressPanel = () => hide(addressPanel);
  const openForm = () => show(slider);
  const closeForm = () => hide(slider);

  // --- listeners ---
  openTriggers.forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); openAddressPanel(); }));
  closeAddressBtn.forEach((btn) => btn.addEventListener("click", closeAddressPanel));

  pickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const branch = (btn.dataset.branch || "") as BranchIdOnline;
      if (branchInput) branchInput.value = branch;
      const info = branchesDict[branch];
      if (branchHint) branchHint.textContent = info ? `${info.district} — ${info.address}` : "";
      updateExtras(branch);
      closeAddressPanel();
      openForm();
    });
  });

  closeButtons.forEach((btn) => btn.addEventListener("click", closeForm));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeForm(); closeAddressPanel(); } });

  // --- submit ---
  if (form && successBlock && slider) {
    form.addEventListener("submit", async (e: SubmitEvent) => {
      e.preventDefault();
      let isValid = true;

      const fields = [
        { input: form.querySelector<HTMLInputElement>(".online-input-parent"),      error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-child-first"), error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-child-last"),  error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-age"),         error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-street"),      error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-city"),        error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-country"),        error: t.requiredError, validate: (v: string) => v.trim() !== "" },
        { input: form.querySelector<HTMLInputElement>(".online-input-phone"),       error: t.phoneError,    validate: (v: string) => v.replace(/\D/g, "").length >= 10 },
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
        const res = await fetch("/api/submit-online", { method: "POST", body: new FormData(form) });
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

document.addEventListener("DOMContentLoaded", setupOnlineLessonForm);