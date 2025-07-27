function setupMenuControls() {
  const callBtn = document.querySelector(".menu-btn-call") as HTMLButtonElement | null;
  const telegramBtn = document.querySelector(".menu-btn-telegram") as HTMLButtonElement | null;

  const callMenu = document.querySelector(".menu-call") as HTMLElement | null;
  const telegramMenu = document.querySelector(".menu-telegram") as HTMLElement | null;

  const closeButtons = document.querySelectorAll(".menu-panel .close");

  const allMenus = document.querySelectorAll(".menu-panel");

  function closeAllMenus() {
    allMenus.forEach(menu => {
      menu.classList.add("-translate-x-full");
    });
  }

  callBtn?.addEventListener("click", () => {
    closeAllMenus();
    callMenu?.classList.remove("-translate-x-full");
  });

  telegramBtn?.addEventListener("click", () => {
    closeAllMenus();
    telegramMenu?.classList.remove("-translate-x-full");
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllMenus();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllMenus();
    }
  });
}

document.addEventListener("DOMContentLoaded", setupMenuControls);
