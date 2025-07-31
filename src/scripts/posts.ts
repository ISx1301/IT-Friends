export function setupLoadMorePostsByClasses(): void {
  const containerClass = 'posts-container';
  const cardClass = 'post-card';
  const buttonClass = 'load-more-btn';
  const batchSize = 6;

  const container = document.querySelector<HTMLElement>(`.${containerClass}`);
  const loadMoreBtn = document.querySelector<HTMLButtonElement>(`.${buttonClass}`);

  if (!container || !loadMoreBtn) return;

  const cards = Array.from(container.querySelectorAll<HTMLElement>(`.${cardClass}`));
  const totalCards = cards.length;

  if (totalCards <= batchSize) {
    cards.forEach(card => card.classList.remove('hidden'));
    loadMoreBtn.classList.add('hidden');
    return;
  }

  cards.forEach((card, i) => {
    if (i < batchSize) card.classList.remove('hidden');
    else card.classList.add('hidden');
  });

  loadMoreBtn.classList.remove('hidden');

  loadMoreBtn.addEventListener('click', () => {
    const hiddenCards = cards.filter(card => card.classList.contains('hidden'));
    if (hiddenCards.length === 0) {
      loadMoreBtn.classList.add('hidden');
      return;
    }

    const toShow = hiddenCards.slice(0, batchSize);
    toShow.forEach(card => card.classList.remove('hidden'));

    if (cards.filter(card => card.classList.contains('hidden')).length === 0) {
      loadMoreBtn.classList.add('hidden');
    }
  });
}
