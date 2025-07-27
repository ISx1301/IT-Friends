export function setupTabs(): void {
  function removeColorClasses(element: HTMLElement) {
    element.classList.remove("bg-transparent-btn-hover-bg", "bg-primary-sand");
  }

  // new version start
  document.addEventListener("DOMContentLoaded", () => {
    const tabsRoot = document.querySelectorAll("[data-tabs]") as unknown as HTMLCollection;
    
    [...tabsRoot].forEach((root) => {
      /*
      '[data-tabs]' > .tab-trigger
      '[data-tabs]' > .tab-panel
      '[data-tabs]' > '[data-tabs]' > .tab-trigger - not needed to select
      '[data-tabs]' > '[data-tabs]' > .tab-panel - not needed to select
      */
      const triggers = Array.from(root.querySelectorAll<HTMLButtonElement>(":scope > .tab-triggers .tab-trigger"));
      const panels = Array.from(root.querySelectorAll<HTMLElement>(":scope > .tab-content > .tab-panel"));
      
      const activeTrigger = triggers.find((trigger) => trigger.getAttribute("aria-selected") === "true");
      if (activeTrigger) {
        const target = activeTrigger.getAttribute("data-tab");
        const colorClass = activeTrigger.getAttribute("data-color");
        if (colorClass) activeTrigger.classList.add(colorClass);
  
        panels.forEach((panel) => {
          const contentId = panel.getAttribute("data-content");
          if (contentId === target) {
            panel.classList.remove("hidden");
          } else {
            panel.classList.add("hidden");
          }
        });
      }
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const target = trigger.getAttribute("data-tab");
          if (!target) return;
  
          panels.forEach((panel) => {
            const contentId = panel.getAttribute("data-content");
            panel.classList.toggle("hidden", contentId !== target);
          });
  
          triggers.forEach((btn) => {
            const isActive = btn === trigger;
            btn.setAttribute("aria-selected", String(isActive));
            removeColorClasses(btn);
  
            if (isActive) {
              const colorClass = btn.getAttribute("data-color");
              if (colorClass) {
                btn.classList.add(colorClass);
              }
            }
          });
        });
      });
    });
  });
  // new version end
  
  // old version
  document.addEventListener("DOMContentLoaded", () => {
    const tabsRoot = document.querySelector(".tab-container") as HTMLElement | null;
    if (!tabsRoot) return;

    const triggers = Array.from(tabsRoot.querySelectorAll<HTMLButtonElement>(".tab-trigger"));
    const panels = Array.from(tabsRoot.querySelectorAll<HTMLElement>(".tab-panel"));

    const activeTrigger = triggers.find((trigger) => trigger.getAttribute("aria-selected") === "true");
    if (activeTrigger) {
      const target = activeTrigger.getAttribute("data-tab");
      const colorClass = activeTrigger.getAttribute("data-color");
      if (colorClass) activeTrigger.classList.add(colorClass);

      panels.forEach((panel) => {
        const contentId = panel.getAttribute("data-content");
        if (contentId === target) {
          panel.classList.remove("hidden");
        } else {
          panel.classList.add("hidden");
        }
      });

      setupCardManager();
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const target = trigger.getAttribute("data-tab");
        if (!target) return;

        panels.forEach((panel) => {
          const contentId = panel.getAttribute("data-content");
          panel.classList.toggle("hidden", contentId !== target);
        });

        triggers.forEach((btn) => {
          const isActive = btn === trigger;
          btn.setAttribute("aria-selected", String(isActive));
          removeColorClasses(btn);

          if (isActive) {
            const colorClass = btn.getAttribute("data-color");
            if (colorClass) {
              btn.classList.add(colorClass);
            }
          }
        });

        setupCardManager();
      });
    });
  });
}

export function setupCardManager(): void {
  const activePanel = document.querySelector(".tab-panel:not(.hidden)") as HTMLElement | null;
  if (!activePanel) return;

  const cardBlocks = activePanel.querySelectorAll(".card-block");

  cardBlocks.forEach((block) => {
    const cards = Array.from(block.querySelectorAll(".card")) as HTMLElement[];
    const showMoreButton = block.nextElementSibling?.querySelector(".show-more-btn") as HTMLButtonElement | null;

    if (!showMoreButton) return;

    const totalCards = cards.length;

    if (totalCards < 4) {
      cards.forEach(card => card.classList.remove("hidden"));
      showMoreButton.classList.add("hidden");
      return;
    }

    cards.forEach((card, index) => {
      if (index < 3) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    showMoreButton.classList.remove("hidden");

    const newShowMoreButton = showMoreButton.cloneNode(true) as HTMLButtonElement;
    showMoreButton.parentNode?.replaceChild(newShowMoreButton, showMoreButton);

    newShowMoreButton.addEventListener("click", () => {
      const hiddenCards = cards.filter(card => card.classList.contains("hidden"));

      if (hiddenCards.length === 0) {
        newShowMoreButton.classList.add("hidden");
        return;
      }

      const cardsToShow = Math.min(3, hiddenCards.length);
      for (let i = 0; i < cardsToShow; i++) {
        hiddenCards[i].classList.remove("hidden");
      }

      const remaining = cards.filter(card => card.classList.contains("hidden")).length;

      if (remaining === 0) {
        newShowMoreButton.classList.add("hidden");
      }
    });
  });
}
