type QSel = <T extends Element>(sel: string, root?: ParentNode) => T | null;
type QSelAll = <T extends Element>(sel: string, root?: ParentNode) => NodeListOf<T>;

const $: QSel = (sel, root = document) => root.querySelector(sel) as any;
const $$: QSelAll = (sel, root = document) => root.querySelectorAll(sel) as any;



export interface ScholarshipFormData {
  fullName: string;
  phone: string;
  branch: string;           
  ageYears: number;
  courseTitle: string;
  yearsStudying: number;    
  motivationDoc?: File | null;  // .doc/.docx <= 5MB
  hp?: string;                  // honeypot
}

function setErr(input: HTMLElement, msg: string) {
  input.classList.add('border-red-error');
  const wrapper = input.parentElement;
  const err =
    wrapper?.querySelector<HTMLSpanElement>('.form-error') ||
    wrapper?.querySelector<HTMLSpanElement>('.form-error-file');
  if (err) {
    err.textContent = msg;
    err.classList.remove('hidden');
  }
}

function clearErr(input: HTMLElement) {
  input.classList.remove('border-red-error');
  const wrapper = input.parentElement;
  const err =
    wrapper?.querySelector<HTMLSpanElement>('.form-error') ||
    wrapper?.querySelector<HTMLSpanElement>('.form-error-file');
  if (err) err.classList.add('hidden');
}

export function setupHubForm(): void {
  const openBtn = document.querySelector<HTMLButtonElement>('#post-form-open,[data-open-form="true"]');
  const slider = document.querySelector<HTMLDivElement>('.post-scholarship-slider');
  const form = slider?.querySelector<HTMLFormElement>('.post-scholarship-form') || null;
  const successBlock = document.querySelector<HTMLDivElement>('.post-scholarship-success');
  const statusEl = form?.querySelector<HTMLParagraphElement>('.js-status') || null;
  const closeEls = $$('.js-post-form-close');

  if (!openBtn || !slider || !form) return;

  // === filename UI ===
  const fileInput = form.querySelector<HTMLInputElement>('#motivationDoc'); 
  const fileNameEl = form.querySelector<HTMLSpanElement>('.js-file-name');
  const defaultFileLabel = 'Файл не обрано';

  const shorten = (name: string, max = 40) =>
    name.length <= max ? name : name.slice(0, max - 10) + '…' + name.slice(-9);

  const updateFileName = () => {
    if (!fileNameEl || !fileInput) return;
    const n = fileInput.files?.[0]?.name;
    fileNameEl.textContent = n ? shorten(n) : defaultFileLabel;
  };

  fileInput?.addEventListener('change', updateFileName);

  form.addEventListener('reset', () => {
    setTimeout(updateFileName, 0); 
  });

  const show = () => {
    slider.classList.remove('-translate-x-full');
    slider.classList.add('translate-x-0');
    updateFileName();
  };
  const hide = () => {
    slider.classList.add('-translate-x-full');
    slider.classList.remove('translate-x-0');
  };

  openBtn.addEventListener('click', (e) => { e.preventDefault(); show(); });
  closeEls.forEach((el) => el.addEventListener('click', hide));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });

  // === submit ===
  form.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();

    const fullName = $('.js-inp-fullName', form) as HTMLInputElement | null;
    const phone = $('.js-inp-phone', form) as HTMLInputElement | null;
    const branch = $('.js-inp-branch', form) as HTMLInputElement | null;
    const age = $('.js-inp-age', form) as HTMLInputElement | null;
    const course = $('.js-inp-course', form) as HTMLInputElement | null;
    const yearsStudying = $('.js-inp-yearsStudying', form) as HTMLInputElement | null;
    const hp = form.querySelector<HTMLInputElement>('input[name="hp"]');

    if (!fullName || !phone || !branch || !age || !course || !yearsStudying || !fileInput) {
      console.error('Form structure mismatch');
      return;
    }

    let ok = true;

    // Full name
    if (!fullName.value.trim()) { ok = false; setErr(fullName, "Обов'язкове поле"); } else { clearErr(fullName); }

    // Phone
    const digits = phone.value.replace(/\D/g, '');
    if (digits.length < 10) { ok = false; setErr(phone, 'Вкажіть коректний номер'); } else { clearErr(phone); }

    // Branch
    if (!branch.value.trim()) { ok = false; setErr(branch, "Обов'язкове поле"); } else { clearErr(branch); }

    // Age 
    const ageVal = Number(age.value);
    if (!age.value || Number.isNaN(ageVal) || ageVal < 3 || ageVal > 120) { ok = false; setErr(age, "Обов'язкове поле"); }
    else { clearErr(age); }

    // Course
    if (!course.value.trim()) { ok = false; setErr(course, "Обов'язкове поле"); } else { clearErr(course); }

    // Years studying 0..20
    const ys = Number(yearsStudying.value);
    if (!yearsStudying.value || Number.isNaN(ys) || ys < 0 || ys > 20) { ok = false; setErr(yearsStudying, "Обов'язкове поле"); }
    else { clearErr(yearsStudying); }

    // File (optional): .doc/.docx up to **4MB** 
    const f = fileInput.files?.[0] ?? null;
    if (f) {
      const okExt = /\.docx?$/i.test(f.name);
      const okSize = f.size <= 4 * 1024 * 1024; // был 5, сделал 4 под UI
      if (!okExt || !okSize) { ok = false; setErr(fileInput, 'Тільки .doc/.docx до 4 МБ'); }
      else { clearErr(fileInput); }
    } else { clearErr(fileInput); }

    if (!ok) return;

    if (statusEl) statusEl.textContent = 'Відправляємо…';

    const fd = new FormData();
    fd.set('fullName', fullName.value.trim());
    fd.set('phone', digits);
    fd.set('branch', branch.value.trim());
    fd.set('ageYears', String(ageVal));
    fd.set('courseTitle', course.value.trim());
    fd.set('yearsStudying', String(ys));
    if (f) fd.set('motivationDoc', f);
    if (hp?.value) fd.set('hp', hp.value);

    try {
      const res = await fetch((form.getAttribute('action') ?? '/api/submit-scholarship'), { method: 'POST', body: fd });
      const data: any = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        form.classList.add('hidden');
        successBlock?.classList.remove('hidden');
        if (statusEl) statusEl.textContent = '';
        form.reset();        
      } else {
        if (statusEl) statusEl.textContent = 'Помилка при відправці. Спробуйте ще раз.';
        console.error('submit failed:', data);
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = 'Помилка мережі. Спробуйте пізніше.';
      console.error(err);
    }
  });
}

document.addEventListener('DOMContentLoaded', setupHubForm);