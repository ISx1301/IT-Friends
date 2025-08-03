import mediumZoom from 'medium-zoom';

export default function initZoom() {
  window.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelectorAll('.zoom-wrapper img');
    mediumZoom(img);
  });
}
