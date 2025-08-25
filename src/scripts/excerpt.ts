function checkExcerpt(container: HTMLElement) {
  const readMore = container.querySelector<HTMLSpanElement>('.read-more');
  const excerptText = container.querySelector<HTMLElement>('.excerpt-text');
  const fullText = container.querySelector<HTMLElement>('.full-text');
  if (!readMore || !excerptText || !fullText) return;

  // show the button only if there is actually a line cut
  const isOverflowing = excerptText.scrollHeight > excerptText.clientHeight + 1;
  readMore.classList.toggle('hidden', !isOverflowing);
}

export function setupExcerpt() {
  const containers = document.querySelectorAll<HTMLElement>('.excerpt-container');

  containers.forEach((container) => {
    const readMore = container.querySelector<HTMLSpanElement>('.read-more');
    const excerptText = container.querySelector<HTMLElement>('.excerpt-text');
    const fullText = container.querySelector<HTMLElement>('.full-text');
    if (!readMore || !excerptText || !fullText) return;

    // do not re-attach the handler
    if ((container as any)._excerptBound) return;
    (container as any)._excerptBound = true;

    // 1) primary check after rendering
    requestAnimationFrame(() => checkExcerpt(container));

    // 2) recalculate when a block appears in the viewport (if it was hidden)
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) checkExcerpt(container);
    });
    io.observe(container);

    // 3) recalculate on resize (line wrapping will change)
    const ro = new ResizeObserver(() => checkExcerpt(container));
    ro.observe(excerptText);

    // 4) main handler for the “read more” click
    readMore.addEventListener('click', () => {
      // replace HTML with full
      excerptText.innerHTML = fullText.innerHTML;

      // remove clamping
      excerptText.classList.remove('excerpt--clamped');
      excerptText.style.removeProperty('--lines');

      // hide btn
      readMore.classList.add('hidden');
    });
  });
}
