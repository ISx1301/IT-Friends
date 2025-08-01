import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel';
import Autoplay, { type AutoplayOptionsType } from 'embla-carousel-autoplay';

type EmblaOptions = EmblaOptionsType & { autoplay: AutoplayOptionsType };

window.addEventListener('DOMContentLoaded', () => {
  const emblaNodes = document.querySelectorAll('.embla');

  emblaNodes.forEach((emblaNode) => {   
    const embla = emblaNode as HTMLElement;
    const options = JSON.parse(embla.dataset.options!) as EmblaOptions;

    const viewport = emblaNode.querySelector('.embla__viewport');
    if (viewport instanceof HTMLElement) {
      const autoplay = Autoplay({ delay: 2000, stopOnInteraction: false, ...options.autoplay });
      const embla = EmblaCarousel(viewport, options, [autoplay]);

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


