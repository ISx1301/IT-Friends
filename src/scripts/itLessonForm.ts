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

const BRANCH_TITLES: Record<string, string> = {
  borshchahivka: "ЖМ Борщагівка — Б-р, Кольцова 14",
  kharkivska_poznyaky: "ЖМ Харківська-Позняки — Вул. Кошиця 9Б",
  poznyaky: "ЖМ Позняки — Пр-т, Григоренко 16",
  troieshchyna: "ЖМ Троєщина — Пр-т, Маяковського 91в",
  voskresenka: "ЖМ Воскресенка — Вул. Курнатовського 22",
};

// ====== helpers ======
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

openTriggers.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openAddressPanel();
  });
});


closeAddressBtn?.forEach((btn) => {
  btn.addEventListener("click", () => closeAddressPanel());
})


pickButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const branch = btn.dataset.branch || "";
    if (branchInput) branchInput.value = branch;
    if (branchHint) branchHint.textContent = BRANCH_TITLES[branch] || "";
    closeAddressPanel();
    openForm();
  });
});


closeButtons.forEach((btn) => btn.addEventListener("click", closeForm));


document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

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

    const fields: { input: HTMLInputElement | null; error: string; validate: (val: string) => boolean }[] = [
      { input: form.querySelector<HTMLInputElement>(".form-input-parent"),      error: "Поле обов’язкове", validate: (v) => v.trim() !== "" },
      { input: form.querySelector<HTMLInputElement>(".form-input-child-first"), error: "Поле обов’язкове", validate: (v) => v.trim() !== "" },
      { input: form.querySelector<HTMLInputElement>(".form-input-child-last"),  error: "Поле обов’язкове", validate: (v) => v.trim() !== "" },
      { input: form.querySelector<HTMLInputElement>(".form-input-age"),         error: "Поле обов’язкове", validate: (v) => v.trim() !== "" },
      { input: form.querySelector<HTMLInputElement>(".form-input-street"),      error: "Поле обов’язкове", validate: (v) => v.trim() !== "" },
      { input: form.querySelector<HTMLInputElement>(".form-input-phone"),       error: "Введіть номер телефону", validate: (v) => v.replace(/\D/g, "").length >= 10 },
    ];

    fields.forEach(({ input, error, validate }) => {
      if (!input) return;
      const parent = input.parentElement!;
      const errorText = parent.querySelector<HTMLSpanElement>(".form-error");
      if (!validate(input.value)) {
        isValid = false;
        input.classList.add("border-red-error");
        errorText?.classList.remove("hidden");
        if (errorText) errorText.textContent = error;
      } else {
        input.classList.remove("border-red-error");
        errorText?.classList.add("hidden");
      }
    });

    if (!branchInput?.value) {
      isValid = false;
      statusEl && (statusEl.textContent = "Оберіть адресу");
    }

    if (!isValid) return;

    try {
      statusEl && (statusEl.textContent = "Відправляємо…");
      const res = await fetch("/api/submit", { method: "POST", body: new FormData(form) });
      const data = await res.json().catch(() => ({} as any));

      if (res.ok && (data as any).ok) {
        form.classList.add("hidden");
        successBlock.classList.remove("hidden");
        statusEl && (statusEl.textContent = "");
        form.reset();
      } else {
        statusEl && (statusEl.textContent = "Помилка при відправці. Спробуйте ще раз.");
        console.error("submit failed:", data);
      }
    } catch (err) {
      statusEl && (statusEl.textContent = "Помилка мережі. Спробуйте пізніше.");
      console.error(err);
    }
  });
}
