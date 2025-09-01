// import sliders from './sliders';

type WatchCallback = (
  intersect: boolean,
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

type SetObserverFn = (el: HTMLElement, callback: WatchCallback) => void;

export interface AppInterface {
  sliders?: object[];
  formValidations?: Record<string, unknown>;
  setObserver: SetObserverFn;
}

const toNumber = (v: unknown, fallback = 0): number => {
  const n = typeof v === 'string' ? Number(v) : Number.NaN;
  return Number.isFinite(n) ? n : fallback;
};

const hasData = (el: HTMLElement, key: string) =>
  Object.prototype.hasOwnProperty.call(el.dataset, key);

const setCSSVar = (el: HTMLElement, name: string, value?: string | number) => {
  if (value === undefined || value === null || value === '') return;
  el.style.setProperty(name, String(value));
};

/** ------------------ Observer (per-element options) ------------------ **/

const setIntersectionObserver: SetObserverFn = (el, callback) => {
  const threshold = toNumber(el.dataset.watchThreshold ?? '0', 0);
  const rootMargin = el.dataset.watchRootMargin ?? '0px';

  const handle: IntersectionObserverCallback = (entries, obs) => {
    entries.forEach((entry) => callback(entry.isIntersecting, entry, obs));
  };

  const observer = new IntersectionObserver(handle, { threshold, rootMargin });
  observer.observe(el);
};

/** ------------------ App ------------------ **/

class App implements AppInterface {
  private _initScriptsEvent!: Event;

  sliders: object[] = [];
  formValidations: Record<string, unknown> = {};
  setObserver: SetObserverFn = setIntersectionObserver;

  constructor() {
    this.addEventListeners();

    const boot = () => this.init();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }

    window.addEventListener('load', () => {
      this.watchBlocks();
    }, { once: true });
  }

  initValidation() {
    // this.formValidations = new (window as any).FormValidation(opts.validationOpts);
  }

  initSliders() {
    // sliders.forEach((item) => item.mount());
    // this.sliders = sliders;
  }

  initStagger(selector = '[data-stagger]') {
    document.querySelectorAll<HTMLElement>(selector).forEach((parent) => {
      const step = toNumber(parent.dataset.stagger ?? '100', 100);
      parent.querySelectorAll<HTMLElement>('[data-watch]').forEach((child, i) => {
        if (!hasData(child, 'watchDelay')) child.dataset.watchDelay = String(i * step);
      });
    });
  }

  watchBlocks(selector = '[data-watch]') {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));

    els.forEach((el) => {
      if (hasData(el, 'watchBound')) return;
      el.dataset.watchBound = '1';

      const delayMs = toNumber(el.dataset.watchDelay ?? '0', 0);
      const durationMs = toNumber(el.dataset.watchDuration ?? '300', 300);
      const outDelayMs = toNumber(el.dataset.watchOutDelay ?? '0', 0);
      const addClassDelayMs = toNumber(el.dataset.watchAddClassDelay ?? '0', 0);
      const ease = el.dataset.watchEase ?? 'cubic-bezier(.22,.61,.36,1)';
      const once = hasData(el, 'watchOnce');
      const repeat = hasData(el, 'watchRepeat');

      setCSSVar(el, '--watch-delay', `${delayMs}ms`);
      setCSSVar(el, '--watch-duration', `${durationMs}ms`);
      setCSSVar(el, '--watch-ease', ease);

      let inTimer: number | undefined;
      let outTimer: number | undefined;

      const onIntersect: WatchCallback = (intersect, entry, obs) => {
        if (intersect) {
          if (outTimer) window.clearTimeout(outTimer);

          const wait = addClassDelayMs > 0 ? addClassDelayMs : 0;

          if (inTimer) window.clearTimeout(inTimer);
          inTimer = window.setTimeout(() => {
            el.classList.add('is-inview');
            if (once) obs.unobserve(entry.target as Element);
          }, wait);
        } else if (repeat) {
          if (inTimer) window.clearTimeout(inTimer);
          if (outTimer) window.clearTimeout(outTimer);
          outTimer = window.setTimeout(() => {
            el.classList.remove('is-inview');
          }, outDelayMs);
        }
      };

      this.setObserver(el, onIntersect);
    });
  }

  addEventListeners() {
    this._initScriptsEvent = new Event('scriptsInit');

    document.addEventListener('scriptsInit', () => {
      console.info('Init scripts');
    });

    window.addEventListener('scroll', () => { /* no-op */ });
    window.addEventListener('resize', () => { /* no-op */ });

    window.addEventListener('load', () => {
      document.body.classList.add('is-loaded');
      console.log(`App start\n`);
    });

    document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((el) => {
      el.addEventListener('click', (ev: Event) => {
        const url = new URL(el.href, window.location.href);
        const isSamePage = url.pathname === window.location.pathname && url.origin === window.location.origin;
        if (!isSamePage || !url.hash) return;

        const target = document.querySelector(url.hash);
        if (!target) return;

        ev.preventDefault();
        const headerHeight = 100;
        const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scroll({ top: y, behavior: 'smooth' });
      });
    });
  }

  init() {
    this.initStagger();
    this.watchBlocks();
    // this.initValidation();
    // this.initSliders();
    document.dispatchEvent(this._initScriptsEvent);
  }
}

new App();
// window.APP = APP;
