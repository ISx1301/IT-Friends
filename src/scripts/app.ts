// // import opts from './options';
// // import sliders from './sliders';

// const setIntersectionObserver = (section: HTMLElement, callback: Function) => {
//   const target = section;

//   function handleIntersection(entries: any[]) {
//     entries.map((entry) => {
//       if (entry.isIntersecting) {
//         callback(true, entry);
//       } else {
//         callback(false, entry);
//       }
//     });
//   }

//   const observer = new IntersectionObserver(handleIntersection);
//   observer.observe(target);
// }

// export interface AppInterface {
//   sliders?: Object[];
//   formValidations?: Object;
//   setObserver: typeof setIntersectionObserver;
// }

// class App implements AppInterface {

//   private _initScriptsEvent!: Event;
//   sliders: Object[];
//   formValidations: Object;
//   setObserver: (section: HTMLElement, callback: Function) => void;

//   constructor() {
//     // Vars
//     this.sliders = [];
//     this.formValidations = {};
//     // Funcs
//     this.setObserver = setIntersectionObserver;
//     // Calls
//     this.addEventListeners();
//     this.init();
//   }

//   initValidation() {
//     // this.formValidations = new window.FormValidation(opts.validationOpts);
//   }

//   initSliders() {
//     // sliders.forEach((item) => item.mount());
//     // this.sliders = sliders;
//   } 

//   watchBlocks(cls = '[data-watch]') {
//     [...document.querySelectorAll<HTMLElement>(cls)].forEach((el) => {
//       const isInView = (intersect: boolean) => {
//         if (intersect) {
//           setTimeout(() => el.classList.add('is-inview'), 500);
//         } else if (el.dataset.hasOwnProperty('watchRepeat')) {
//           setTimeout(() => el.classList.remove('is-inview'), 500);
//         }
//       }
//       this.setObserver(el, isInView);
//     });
//   }

//   addEventListeners() {
//     // eslint-disable-next-line no-underscore-dangle
//     this._initScriptsEvent = new Event('scriptsInit');

//     document.addEventListener('scriptsInit', () => {
//       console.info('Init scripts');
//     });

//     window.addEventListener('scroll', () => {

//     });

//     window.addEventListener('load', () => {
//       document.body.classList.add('is-loaded');
//       console.log(`${opts.initText}\n`);
//     });

//     window.addEventListener('resize', () => {

//     });

//     // Elements events
//     document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((el) => {
//       el.addEventListener('click', (ev: Event) => {
//         ev.preventDefault();
//         const link = new URL(el.href);
//         const headerHeight = 100;
//         const target = document.querySelector(link.hash);
//         if (!target) return;
//         const y = target.getBoundingClientRect().top + window.scrollY - headerHeight;
//         window.scroll({
//           top: y,
//           behavior: 'smooth'
//         });
//       });
//     });
//   }

//   init() {
//     if (opts.DEBUG) {
//       console.info('Debug is ON');
//     }
//     this.watchBlocks();
//     // this.initValidation();
//     this.initSliders();
//     document.dispatchEvent(this._initScriptsEvent);
//   }
// }

// const APP = new App();
// window.APP = APP;