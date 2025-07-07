export function setupBurgerToggle(): void {
  document.addEventListener("DOMContentLoaded", () => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobile-menu");
    const topMenu = document.getElementById('logo-menu');

    if (!burger || !mobileMenu || !topMenu) return;

    const logoMenu = document.querySelector(".logo-menu") as HTMLDivElement | null;
    if (logoMenu) {
      document.documentElement.style.setProperty("--logo-menu-height", `${logoMenu.offsetHeight}px`);
    }

    if (window.innerWidth < 1240 && !mobileMenu.classList.contains("mobile-menu_active")) {
      mobileMenu.style.transform = "translateX(-100%)";
      mobileMenu.style.opacity = "0";
      mobileMenu.style.pointerEvents = "none";
    }

    burger.addEventListener("click", () => {
      const isActive = burger.classList.contains("active");
      const spans = burger.querySelectorAll("span");

      burger.classList.toggle("active");
      mobileMenu.classList.toggle("mobile-menu_active");

      if (window.innerWidth < 1240) {
        if (isActive) {
          spans[0].classList.remove("rotate-45", "translate-x-[0.25rem]", "translate-y-[0.5rem]");
          spans[1].classList.remove("opacity-0");
          spans[2].classList.remove("-rotate-45", "translate-x-[0.25rem]", "translate-y-[-0.5rem]");
          topMenu.style.backgroundColor = ''; 
          mobileMenu.style.transition = "transform 0.6s ease, opacity 0.6s ease";
          mobileMenu.style.transform = "translateX(-100%)";
          mobileMenu.style.opacity = "0";
          mobileMenu.style.pointerEvents = "none";
          setTimeout(() => {
            mobileMenu.classList.remove("mobile-menu_active");
          }, 600);
        } else {
          spans[0].classList.add("rotate-45", "translate-x-[0.25rem]", "translate-y-[0.5rem]");
          spans[1].classList.add("opacity-0");
          spans[2].classList.add("-rotate-45", "translate-x-[0.25rem]", "translate-y-[-0.5rem]");
          topMenu.style.backgroundColor = '#F0F0F0'; 
          mobileMenu.style.transition = "transform 0.6s ease, opacity 0.6s ease";
          mobileMenu.style.transform = "translateX(0)";
          mobileMenu.style.opacity = "1";
          mobileMenu.style.pointerEvents = "auto";
        }
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1240) {
        mobileMenu.style.transform = "";
        mobileMenu.style.opacity = "";
        mobileMenu.style.pointerEvents = "";
        mobileMenu.style.transition = "";
        topMenu.style.backgroundColor = ''; 
      } else if (!mobileMenu.classList.contains("mobile-menu_active")) {
        mobileMenu.style.transform = "translateX(-100%)";
        mobileMenu.style.opacity = "0";
        mobileMenu.style.pointerEvents = "none";
      }
    });
  });
}