import {
  DEFAULT_LANG,
  LOCALE,
  BRANCHES,
  type Lang,
} from "@/constants";

// lang helpers 
function getLang(): Lang {
  const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  if (htmlLang === "uk" || htmlLang === "en") return htmlLang;
  
  const globalLang = (window as any).__LANG as string | undefined;
  if (globalLang === "uk" || globalLang === "en") return globalLang;
  return DEFAULT_LANG as Lang;
}

const lang = getLang();
const t = LOCALE[lang].form;
const branchesDict = BRANCHES[lang];

const MSG = {
  chooseAddress: lang === "en" ? "Please choose an address" : "Оберіть адресу",
  sending: lang === "en" ? "Sending…" : "Відправляємо…",
  submitError:
    lang === "en"
      ? "Submission failed. Please try again."
      : "Помилка при відправці. Спробуйте ще раз.",
  networkError:
    lang === "en"
      ? "Network error. Please try again later."
      : "Помилка мережі. Спробуйте пізніше.",
};

// dom 
const form = document.querySelector<HTMLFormElement>(".free-lesson-form");
const successBlock = document.querySelector<HTMLElement>(".form-success");
const slider = document.querySelector<HTMLElement>(".form-slider");
const addressPanel = document.querySelector<HTMLElement>(".address-panel");

const pickButtons = document.querySelectorAll<HTMLButtonElement>(".js-pick-branch");
const closeAddressBtn = document.querySelectorAll<HTMLButtonElement>(".js-close-address");
const closeButtons = document.querySelectorAll<HTMLButtonElement>(".form-close");

const branchInput = document.querySelector<HTMLInputElement>(".js-branch-value");
const branchHint = document.querySelector<HTMLParagraphElement>(".js-branch-hint");
const statusEl = document.querySelector<HTMLParagraphElement>(".form-status");

const openTriggers = document.querySelectorAll<HTMLElement>(".free-lesson-open");

// show/hide 
function show(el?: Element | null) {
  el?.classList.remove("-translate-x-full");
  el?.classList.add("translate-x-0");
}
function hide(el?: Element | null) {
  el?.classList.add("-translate-x-full");
  el?.classList.remove("translate-x-0");
}

function openAddressPanel() { show(addressPanel); }
function closeAddressPanel() { hide(addressPanel); }
function openForm() { show(slider); }
function closeForm() { hide(slider); }

// openers/closers 
openTriggers.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openAddressPanel();
  });
});

closeAddressBtn.forEach((btn) => {
  btn.addEventListener("click", () => closeAddressPanel());
});

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

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement | null;
  if (target && target.classList.contains("form-close")) {
    closeForm();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeForm();
    closeAddressPanel();
  }
});

if (form && successBlock && slider) {
  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    let isValid = true;

    const fields: {
      input: HTMLInputElement | null;
      error: string;
      validate: (val: string) => boolean;
    }[] = [
      {
        input: form.querySelector<HTMLInputElement>(".form-input-parent"),
        error: t.requiredError,
        validate: (v) => v.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-child-first"),
        error: t.requiredError,
        validate: (v) => v.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-child-last"),
        error: t.requiredError,
        validate: (v) => v.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-age"),
        error: t.requiredError,
        validate: (v) => v.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-street"),
        error: t.requiredError,
        validate: (v) => v.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-phone"),
        error: t.phoneError,
        validate: (v) => v.replace(/\D/g, "").length >= 10,
      },
    ];

    fields.forEach(({ input, error, validate }) => {
      if (!input) return;
      const parent = input.parentElement!;
      const errorText = parent.querySelector<HTMLSpanElement>(".form-error");
      if (!validate(input.value)) {
        isValid = false;
        input.classList.add("border-red-error");
        if (errorText) {
          errorText.textContent = error;
          errorText.classList.remove("hidden");
        }
      } else {
        input.classList.remove("border-red-error");
        errorText?.classList.add("hidden");
      }
    });

    if (!branchInput?.value) {
      isValid = false;
      if (statusEl) statusEl.textContent = MSG.chooseAddress;
    }

    if (!isValid) return;

    try {
      if (statusEl) statusEl.textContent = MSG.sending;

      const res = await fetch("/api/submit", {
        method: "POST",
        body: new FormData(form),
      });

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
