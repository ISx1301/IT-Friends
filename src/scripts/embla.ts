import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

window.addEventListener('DOMContentLoaded', () => {
  const emblaNodes = document.querySelectorAll('.embla');

  emblaNodes.forEach((emblaNode) => {
    if (window.innerWidth >= 1440) return;

    const viewport = emblaNode.querySelector('.embla__viewport');
    if (viewport instanceof HTMLElement) {
      const autoplay = Autoplay({ delay: 2000, stopOnInteraction: false });
      const embla = EmblaCarousel(viewport, { loop: true }, [autoplay]);

      const controls = emblaNode.querySelector('.embla__controls');
      if (controls) {
        const prevButton = controls.querySelector('.embla__prev');
        const nextButton = controls.querySelector('.embla__next');
        const currentSlide = controls.querySelector('.embla-current');
        const totalSlides = controls.querySelector('.embla-total');

        if (prevButton instanceof HTMLButtonElement) {
          prevButton.addEventListener('click', () => embla.scrollPrev());
        }
        if (nextButton instanceof HTMLButtonElement) {
          nextButton.addEventListener('click', () => embla.scrollNext());
        }

        if (currentSlide instanceof HTMLElement && totalSlides instanceof HTMLElement) {
          totalSlides.textContent = embla.slideNodes().length.toString(); 
          currentSlide.textContent = (embla.selectedScrollSnap() + 1).toString(); 

          embla.on('select', () => {
            currentSlide.textContent = (embla.selectedScrollSnap() + 1).toString(); 
          });
        }
      }
    }
  });
});


