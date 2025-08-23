import {
  DEFAULT_LANG,
  LOCALE,
  BRANCHES,
  BRANCH_ORDER_OFFLINE,
  type Lang,
  type BranchId,
  type DirectionKey,
  PHONE_LINKS,
  TELEGRAM_BRANCH_LINKS,
  TELEGRAM_ONLINE_LINKS,
} from "@/constants";

type Mode = "phone" | "telegram";

function getLang(): Lang {
  const l = (document.documentElement.getAttribute("lang") || "").toLowerCase();
  if (l === "uk" || l === "en") return l;
  const g = (window as any).__LANG as string | undefined;
  if (g === "uk" || g === "en") return g;
  return DEFAULT_LANG as Lang;
}

const $  = <T extends Element = Element>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = Element>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const show = (el?: Element|null) => el?.classList.remove("-translate-x-full");
const hide = (el?: Element|null) => el?.classList.add("-translate-x-full");

// --- helpers ---
function pickOnlinePhoneHref(direction: DirectionKey): string {
  const list = PHONE_LINKS.online || [];
  if (!list.length) return "#";
  const it  = list.find(x => /(it|айті)/i.test(x.label)) || list[0];
  const eng = list.find(x => /(англій|english|англ)/i.test(x.label)) || list[list.length-1] || list[0];
  if (direction === "online_it")  return it.href;
  if (direction === "online_eng") return eng.href;
  return list[0].href;
}

function phoneHrefFor(branch: BranchId, direction: DirectionKey): string {
  if (branch === "online") return pickOnlinePhoneHref(direction);
  const list = PHONE_LINKS[branch] || [];
  return list[0]?.href || "#";
}

function telegramHrefForBranch(branch: Exclude<BranchId,'online'>): string {
  return TELEGRAM_BRANCH_LINKS[branch] || "#";
}

function telegramHrefForOnline(direction: DirectionKey): string {
  if (direction === "online_it")  return TELEGRAM_ONLINE_LINKS.online_it;
  if (direction === "online_eng") return TELEGRAM_ONLINE_LINKS.online_eng;
  return TELEGRAM_ONLINE_LINKS.online_it; // fallback
}

export default function setupQuickContacts() {
  const lang = getLang();
  const branches = BRANCHES[lang];

  let mode: Mode = "phone";
  let pickedDirection: DirectionKey | null = null;

  const phoneStart = $(".qc-phone-btn");
  const tgStart    = $(".qc-telegram-btn");

  const directionMenu  = $(".qc-direction-menu");
  const directionClose = $(".qc-direction-menu-close");

  const addressPanel   = $(".qc-address-panel");
  const addressClose   = $(".qc-address-panel-close");
  const addressWrap    = $(".qc-address-list") as HTMLElement | null;

  phoneStart?.addEventListener("click", () => { mode = "phone";    show(directionMenu); });
  tgStart?.addEventListener("click",    () => { mode = "telegram"; show(directionMenu); });

  directionClose?.addEventListener("click", () => hide(directionMenu));
  addressClose?.addEventListener("click",   () => hide(addressPanel));

  function openImmediateForOnline(dir: DirectionKey) {
    if (mode === "phone") {
      const href = pickOnlinePhoneHref(dir);
      if (href && href !== "#") window.location.href = href;
    } else {
      const href = telegramHrefForOnline(dir);
      if (href) window.open(href, "_blank", "noopener");
    }
  }

  function buildAddressList(direction: DirectionKey) {
    if (!addressWrap) return;
    addressWrap.innerHTML = "";

    BRANCH_ORDER_OFFLINE.forEach((branch) => {
      const href = mode === "phone"
        ? phoneHrefFor(branch, direction)
        : telegramHrefForBranch(branch);

      const a = document.createElement("a");
      a.className = "py-2 border w-full font-medium text-lg text-center rounded-lg flex flex-col";
      a.href = href;
      if (mode === "telegram") { a.target = "_blank"; a.rel = "noopener"; }

      a.setAttribute("aria-label", `${branches[branch].district}, ${branches[branch].address}`);

      const s1 = document.createElement("span"); s1.textContent = branches[branch].district;
      const s2 = document.createElement("span"); s2.textContent = branches[branch].address;
      a.appendChild(s1); a.appendChild(s2);

      addressWrap.appendChild(a);
    });
  }

  $$(".qc-pick-direction").forEach((btn) => {
    btn.addEventListener("click", () => {
      pickedDirection = (btn as HTMLElement).getAttribute("data-direction") as DirectionKey;

      if (pickedDirection === "online_eng" || pickedDirection === "online_it") {
        hide(directionMenu);
        openImmediateForOnline(pickedDirection);
        return;
      }

      if (pickedDirection === "it_school" || pickedDirection === "english_kids") {
        buildAddressList(pickedDirection);
        hide(directionMenu);
        show(addressPanel);
        return;
      }

      if (pickedDirection === "it_camps" || pickedDirection === "franchise") {
        hide(directionMenu);
        return;
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hide(directionMenu);
      hide(addressPanel);
    }
  });
}

document.addEventListener("DOMContentLoaded", setupQuickContacts);
