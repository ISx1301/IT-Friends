interface AccordionElements {
  item: HTMLElement;
  trigger: HTMLElement;
  panel: HTMLElement;
  plusIcon: HTMLElement;
  minusIcon: HTMLElement;
}

export function initAccordion() {
  const accordionItems = document.querySelectorAll<HTMLElement>(".accordion-item");
  const accordionElements: AccordionElements[] = Array.from(accordionItems).map((item) => {
    const trigger = item.querySelector<HTMLElement>(".accordion-trigger")!;
    const panel = item.querySelector<HTMLElement>(".accordion-panel")!;
    const plusIcon = item.querySelector<HTMLElement>(".accordion-icon-plus")!;
    const minusIcon = item.querySelector<HTMLElement>(".accordion-icon-minus")!;

    return { item, trigger, panel, plusIcon, minusIcon };
  });

  accordionElements.forEach(({ trigger, panel, plusIcon, minusIcon }) => {
    trigger.addEventListener("click", () => {
      const expanded = trigger.getAttribute("aria-expanded") === "true";

      accordionElements.forEach((el) => {
        el.trigger.setAttribute("aria-expanded", "false");
        el.panel.style.maxHeight = "0px";
        el.plusIcon.classList.remove("hidden");
        el.minusIcon.classList.add("hidden");
      });

      if (!expanded) {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
        plusIcon.classList.add("hidden");
        minusIcon.classList.remove("hidden");
      }
    });
  });
}