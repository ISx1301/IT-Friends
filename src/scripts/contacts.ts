function setupMenuControls() {
  const callBtn = document.querySelector(".phone-menu-btn") as HTMLButtonElement | null;
  const callMenu = document.querySelector(".phone-menu") as HTMLElement | null;
  const callBtnClose = document.querySelector(".phone-menu-close") as HTMLElement | null;


  const telegramBtn = document.querySelector(".tg-menu-btn") as HTMLButtonElement | null;
  const telegramMenu = document.querySelector(".telegram-menu") as HTMLElement | null;
  const telegramBtnClose = document.querySelector(".telegram-menu-close") as HTMLElement | null;

  

  callBtn?.addEventListener("click", () => {
    callMenu?.classList.remove("-translate-x-full");
  });

  callBtnClose?.addEventListener("click", () => {
    callMenu?.classList.add('-translate-x-full')
  });


  telegramBtn?.addEventListener("click", () => {
    telegramMenu?.classList.remove("-translate-x-full");
  });

  telegramBtnClose?.addEventListener("click", () => {
    telegramMenu?.classList.add('-translate-x-full')
  });

}

document.addEventListener("DOMContentLoaded", setupMenuControls);
