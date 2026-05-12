import { CAMPS, type CampId } from "@/constants";

export function setupCampForm() {
  const pickPanel   = document.querySelector<HTMLElement>(".camp-pick-panel");
  const formSlider  = document.querySelector<HTMLElement>(".camp-form-slider");
  const form        = document.querySelector<HTMLFormElement>(".camp-lesson-form");
  const successBlock = document.querySelector<HTMLElement>(".camp-form-success");
  const statusEl    = document.querySelector<HTMLParagraphElement>(".camp-form-status");
  const campInput   = document.querySelector<HTMLInputElement>(".js-camp-value");
  const campHint    = document.querySelector<HTMLElement>(".js-camp-hint");

  const openTriggers  = document.querySelectorAll<HTMLElement>(".camp-form-open");
  const pickButtons   = document.querySelectorAll<HTMLElement>(".js-pick-camp");
  const pickClosers   = document.querySelectorAll<HTMLElement>(".js-camp-pick-close");
  const formClosers   = document.querySelectorAll<HTMLElement>(".camp-form-close");

  if (!pickPanel || !formSlider || !form) return;

  const show = (el: HTMLElement) => { el.classList.remove("-translate-x-full"); el.classList.add("translate-x-0"); };
  const hide = (el: HTMLElement) => { el.classList.add("-translate-x-full"); el.classList.remove("translate-x-0"); };

  const openPick  = () => show(pickPanel);
  const closePick = () => hide(pickPanel);
  const openForm  = () => show(formSlider);
  const closeForm = () => hide(formSlider);

  openTriggers.forEach((btn) => btn.addEventListener("click", (e) => { e.preventDefault(); openPick(); }));
  pickClosers.forEach((btn)  => btn.addEventListener("click", closePick));
  formClosers.forEach((btn)  => btn.addEventListener("click", closeForm));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePick(); closeForm(); }
  });

  pickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const campId = (btn as HTMLElement).dataset.camp as CampId | undefined;
      if (!campId || !CAMPS[campId]) return;

      if (campInput)  campInput.value = campId;
      if (campHint)   campHint.textContent = CAMPS[campId].label;

      closePick();
      openForm();
    });
  });

  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    let isValid = true;

    const fields = [
      { input: form.querySelector<HTMLInputElement>(".camp-input-parent"),      validate: (v: string) => v.trim() !== "",                          error: "Поле обов'язкове" },
      { input: form.querySelector<HTMLInputElement>(".camp-input-child-first"), validate: (v: string) => v.trim() !== "",                          error: "Поле обов'язкове" },
      { input: form.querySelector<HTMLInputElement>(".camp-input-child-last"),  validate: (v: string) => v.trim() !== "",                          error: "Поле обов'язкове" },
      { input: form.querySelector<HTMLInputElement>(".camp-input-age"),         validate: (v: string) => v.trim() !== "",                          error: "Поле обов'язкове" },
      { input: form.querySelector<HTMLInputElement>(".camp-input-street"),      validate: (v: string) => v.trim() !== "",                          error: "Поле обов'язкове" },
      { input: form.querySelector<HTMLInputElement>(".camp-input-phone"),       validate: (v: string) => v.replace(/\D/g, "").length >= 10,        error: "Введіть номер телефону" },
    ];

    fields.forEach(({ input, validate, error }) => {
      if (!input) return;
      const errEl = input.parentElement?.querySelector<HTMLSpanElement>(".form-error");
      if (!validate(input.value)) {
        isValid = false;
        input.classList.add("border-red-error");
        if (errEl) { errEl.textContent = error; errEl.classList.remove("hidden"); }
      } else {
        input.classList.remove("border-red-error");
        errEl?.classList.add("hidden");
      }
    });

    if (!campInput?.value) {
      isValid = false;
      if (statusEl) statusEl.textContent = "Оберіть табір";
    }

    if (!isValid) return;

    if (statusEl) statusEl.textContent = "Відправляємо…";

    try {
      const res  = await fetch("/api/submit-camp", { method: "POST", body: new FormData(form) });
      const data = await res.json().catch(() => ({} as any));
      if (res.ok && data?.ok) {
        form.classList.add("hidden");
        successBlock?.classList.remove("hidden");
        if (statusEl) statusEl.textContent = "";
        form.reset();
        if (campHint) campHint.textContent = "";
      } else {
        if (statusEl) statusEl.textContent = "Помилка при відправці. Спробуйте ще раз.";
        console.error("camp submit failed:", data);
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = "Помилка мережі. Спробуйте пізніше.";
      console.error(err);
    }
  });
}

document.addEventListener("DOMContentLoaded", setupCampForm);
