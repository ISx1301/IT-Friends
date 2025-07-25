import EmblaCarousel from 'embla-carousel';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

export const initEmbla = (selector: string) => {
  const emblaNode = document.querySelector(selector);
  if (!(emblaNode instanceof HTMLElement)) return;

  const viewport = emblaNode.querySelector('.embla__viewport');
  if (!(viewport instanceof HTMLElement)) return;

  const mediaQuery = window.matchMedia('(max-width: 1023px)'); 
  let embla: EmblaCarouselType | null = null;

  const setupEmbla = () => {
    if (mediaQuery.matches && !embla) {
      embla = EmblaCarousel(viewport, { loop: true }, [
        Autoplay({ delay: 3000, stopOnInteraction: false })
      ]);

      const currentEl = emblaNode.querySelector('#embla-current');
      const totalEl = emblaNode.querySelector('#embla-total');

      if (currentEl && totalEl) {
        totalEl.textContent = String(embla.slideNodes().length).padStart(2, '0');

        const updateCurrent = () => {
          const index = embla!.selectedScrollSnap() + 1;
          currentEl.textContent = String(index).padStart(2, '0');
        };

        embla.on('select', updateCurrent);
        embla.on('init', updateCurrent);
        updateCurrent();
      }

      const prevBtn = emblaNode.querySelector('.embla__prev');
      const nextBtn = emblaNode.querySelector('.embla__next');

      prevBtn?.addEventListener('click', () => embla?.scrollPrev());
      nextBtn?.addEventListener('click', () => embla?.scrollNext());
    }

    if (!mediaQuery.matches && embla) {
      embla.destroy();
      embla = null;
    }
  };

  mediaQuery.addEventListener('change', setupEmbla);
  setupEmbla();
};
