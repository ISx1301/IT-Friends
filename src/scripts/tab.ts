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
