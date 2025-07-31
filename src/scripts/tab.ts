export function setupTabs(): void {
  function removeColorClasses(element: HTMLElement) {
    element.classList.remove(
      "bg-transparent-btn-hover-bg",
      "bg-primary-sand",
      "bg-white",
      "bg-[transparent]",
      "text-black",
      "text-white"
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    const tabsRoot = document.querySelectorAll("[data-tabs]");

    [...tabsRoot].forEach((root) => {
      const triggers = Array.from(root.querySelectorAll<HTMLButtonElement>(":scope > .tab-triggers .tab-trigger"));
      const panels = Array.from(root.querySelectorAll<HTMLElement>(":scope > .tab-content > .tab-panel"));

      const activeTrigger = triggers.find(trigger => trigger.getAttribute("aria-selected") === "true");

      if (activeTrigger) {
        const target = activeTrigger.getAttribute("data-tab");
        panels.forEach(panel => {
          const contentId = panel.getAttribute("data-content");
          panel.classList.toggle("hidden", contentId !== target);
        });
      }

      triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
          const target = trigger.getAttribute("data-tab");
          if (!target) return;

          panels.forEach(panel => {
            const contentId = panel.getAttribute("data-content");
            panel.classList.toggle("hidden", contentId !== target);
          });

          triggers.forEach(btn => {
            const isActive = btn === trigger;
            btn.setAttribute("aria-selected", String(isActive));
            removeColorClasses(btn);

            const colorClass = btn.getAttribute("data-color");
            const triggerType = btn.getAttribute("data-trigger-type");

            if (isActive) {
              if (triggerType === "pill") {
                btn.classList.add("bg-white", "text-black");
              } else {
                if (colorClass) btn.classList.add(colorClass);
                btn.classList.add("text-black");
              }
            } else {
              btn.classList.add("bg-[transparent]");
              btn.classList.add(triggerType === "pill" ? "text-white" : "text-black");
            }
          });

          setupCardManager();
        });
      });
    });

    setupCardManager();
  });
}



export function setupCardManager(): void {
  const activePanels = document.querySelectorAll<HTMLElement>(".tab-panel:not(.hidden)");
  if (!activePanels.length) return;

  activePanels.forEach(activePanel => {
    const cardBlocks = activePanel.querySelectorAll<HTMLElement>(".card-block");

    cardBlocks.forEach(block => {
      const cards = Array.from(block.querySelectorAll<HTMLElement>(".card"));
      const showMoreButton = block.querySelector<HTMLButtonElement>(".show-more-btn");
      if (!showMoreButton) return;

      const totalCards = cards.length;

      if (totalCards < 4) {
        cards.forEach(card => card.classList.remove("hidden"));
        showMoreButton.classList.add("hidden");
        return;
      }

      cards.forEach((card, index) => {
        if (index < 3) card.classList.remove("hidden");
        else card.classList.add("hidden");
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
  });
}
