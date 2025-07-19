export function setupTabs(): void {
  document.addEventListener("DOMContentLoaded", () => {
    const tabsRoot = document.querySelector(".tab-container") as HTMLElement;
    if (!tabsRoot) return;

    const triggers = Array.from(tabsRoot.querySelectorAll<HTMLButtonElement>(".tab-trigger"));
    const panels = Array.from(tabsRoot.querySelectorAll<HTMLElement>(".tab-panel"));

    const activeTrigger = triggers.find((trigger) => trigger.getAttribute("aria-selected") === "true");
    if (activeTrigger) {
      const target = activeTrigger.getAttribute("data-tab");
      activeTrigger.classList.add("bg-transparent-btn-hover-bg");
      panels.forEach((panel) => {
        const contentId = panel.getAttribute("data-content");
        if (contentId === target) {
          panel.classList.remove("hidden");
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
          if (isActive) {
            btn.classList.add("bg-transparent-btn-hover-bg");
          } else {
            btn.classList.remove("bg-transparent-btn-hover-bg");
          }
        });

        setupCardManager();
      });
    });
  });
}

export function setupCardManager(): void {
  const activePanel = document.querySelector(".tab-panel:not(.hidden)") as HTMLElement;
  if (!activePanel) return;

  const cardBlocks = activePanel.querySelectorAll(".card-block");
  cardBlocks.forEach((block) => {
    const cards = Array.from(block.querySelectorAll(".card")) as HTMLElement[];
    const showMoreButton = block.nextElementSibling?.querySelector(".show-more-btn") as HTMLButtonElement | null;

    if (!showMoreButton) return; 

  
    const isFullyExpanded = block.getAttribute("data-state") === "fully-expanded";

    if (!isFullyExpanded) {
      cards.forEach((card, index) => {
        if (index >= 6) {
          card.classList.add("hidden");
        } else {
          card.classList.remove("hidden");
        }
      });
      showMoreButton.classList.remove("hidden");
    }

    const newShowMoreButton = showMoreButton.cloneNode(true) as HTMLButtonElement;
    showMoreButton.parentNode?.replaceChild(newShowMoreButton, showMoreButton);

    newShowMoreButton.addEventListener("click", () => {
      let visibleCount = cards.filter(card => !card.classList.contains("hidden")).length;
      let hiddenCards = cards.filter(card => card.classList.contains("hidden"));

      const cardsToShow = Math.min(3, hiddenCards.length);
      for (let i = 0; i < cardsToShow; i++) {
        if (hiddenCards[i]) {
          hiddenCards[i].classList.remove("hidden");
        }
      }

      visibleCount = cards.filter(card => !card.classList.contains("hidden")).length;
      hiddenCards = cards.filter(card => card.classList.contains("hidden"));

      if (hiddenCards.length === 0) {
        newShowMoreButton.classList.add("hidden");
        block.setAttribute("data-state", "fully-expanded");
      }
    });
  });
}