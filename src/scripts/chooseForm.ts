export function setupChooseForm() {

  const panel = document.querySelector<HTMLDivElement>(".choose-form-panel");

  if (!panel) {
    return;
  }

  const openers = document.querySelectorAll<HTMLElement>(".choose-form-open");
  const closers = panel.querySelectorAll<HTMLElement>(".qc-direction-menu-close");

  const show = () => {
    panel.classList.remove("-translate-x-full");
    panel.classList.add("translate-x-0");
  };
  const hide = () => {
    panel.classList.remove("translate-x-0");
    panel.classList.add("-translate-x-full");
  };

  openers.forEach((btn) =>
    btn.addEventListener("click", (e) => { e.preventDefault(); show(); })
  );
  closers.forEach((btn) =>
    btn.addEventListener("click", () => hide())
  );

  const campBtn = panel.querySelector<HTMLElement>(".choose-form-camps-open");
  campBtn?.addEventListener("click", () => {
    hide();
    const campPick = document.querySelector<HTMLElement>(".camp-pick-panel");
    if (campPick) {
      campPick.classList.remove("-translate-x-full");
      campPick.classList.add("translate-x-0");
    }
  });
};

document.addEventListener("DOMContentLoaded", setupChooseForm);