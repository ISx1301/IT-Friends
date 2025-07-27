const form = document.querySelector<HTMLFormElement>(".free-lesson-form");
const successBlock = document.querySelector<HTMLElement>(".form-success");
const slider = document.querySelector<HTMLElement>(".form-slider");
const openButtons = document.querySelectorAll<HTMLButtonElement>(".form-open");
const closeButtons = document.querySelectorAll<HTMLButtonElement>(".form-close");

if (form && successBlock && slider) {
  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      slider.classList.remove("-translate-x-full");
      slider.classList.add("translate-x-0");
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      slider.classList.add("-translate-x-full");
      slider.classList.remove("translate-x-0");
    });
  });

  form.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();

    let isValid = true;

    const fields: {
      input: HTMLInputElement | null;
      error: string;
      validate: (val: string) => boolean;
    }[] = [
      {
        input: form.querySelector<HTMLInputElement>(".form-input-name"),
        error: "Поле обов’язкове",
        validate: (val) => val.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-lastname"),
        error: "Поле обов’язкове",
        validate: (val) => val.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-age"),
        error: "Поле обов’язкове",
        validate: (val) => val.trim() !== "",
      },
      {
        input: form.querySelector<HTMLInputElement>(".form-input-phone"),
        error: "Введіть номер телефону",
        validate: (val) => val.replace(/\D/g, "").length >= 10,
      },
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

    if (isValid) {
      form.classList.add("hidden");
      successBlock.classList.remove("hidden");
    }
  });
}
