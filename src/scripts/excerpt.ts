export function setupExcerpt() {
  const containers = document.querySelectorAll('.excerpt-container');

  containers.forEach(container => {
    const readMore = container.querySelector('.read-more');
    const excerptText = container.querySelector('.excerpt-text');
    const fullText = container.querySelector('.full-text');

    if (readMore && excerptText && fullText) {
      readMore.addEventListener('click', () => {
        fullText.classList.remove('hidden');
        readMore.classList.add('hidden');
      });
    }
  });
}
