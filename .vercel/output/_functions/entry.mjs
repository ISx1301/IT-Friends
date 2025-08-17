import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DDxfvyul.mjs';
import { manifest } from './manifest_DrNFTvwS.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/_lang_/blog/_slug_.astro.mjs');
const _page3 = () => import('./pages/_lang_/blog.astro.mjs');
const _page4 = () => import('./pages/_lang_/_slug_.astro.mjs');
const _page5 = () => import('./pages/_lang_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/[lang]/blog/[slug].astro", _page2],
    ["src/pages/[lang]/blog/index.astro", _page3],
    ["src/pages/[lang]/[slug].astro", _page4],
    ["src/pages/[lang]/index.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "9d2d6235-29f2-4db0-b722-7cdfe303496f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
