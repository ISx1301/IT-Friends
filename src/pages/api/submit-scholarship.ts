import type { APIRoute } from "astro";
import nodemailer, { type Transporter } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

export const prerender = false;

/* ───────── helpers ───────── */
const C = {
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  red:  (s: string) => `\x1b[31m${s}\x1b[0m`,
};

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getTransport(): Transporter {
  const host   = need("SMTP_HOST");
  const port   = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true"; // true for 465
  const user   = need("SMTP_USER");
  const pass   = need("SMTP_PASS");
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

function isDocOrDocx(filename: string): boolean {
  return /\.docx?$/i.test(filename);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ───────── handler ───────── */
export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    // honeypot
    const hp = String(form.get("hp") ?? "").trim();
    if (hp) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // form parts
    const fullName      = String(form.get("fullName") ?? "").trim();
    const phoneRaw      = String(form.get("phone") ?? "").trim();
    const branch        = String(form.get("branch") ?? "").trim();
    const ageYearsStr   = String(form.get("ageYears") ?? "").trim();
    const courseTitle   = String(form.get("courseTitle") ?? "").trim();
    const yearsStudying = String(form.get("yearsStudying") ?? "").trim();
    const file          = form.get("motivationDoc") as File | null;

    // server-side 
    const errors: string[] = [];

    if (!fullName) errors.push("fullName");

    const phoneDigits = phoneRaw.replace(/\D/g, "");
    if (phoneDigits.length < 10) errors.push("phone");

    const ageYears = Number(ageYearsStr);
    if (!ageYearsStr || Number.isNaN(ageYears) || ageYears < 3 || ageYears > 120) {
      errors.push("ageYears");
    }

    if (!courseTitle) errors.push("courseTitle");

    const ys = Number(yearsStudying);
    if (!yearsStudying || Number.isNaN(ys) || ys < 0 || ys > 20) {
      errors.push("yearsStudying");
    }

    if (file) {
      if (!isDocOrDocx(file.name)) errors.push("motivationDoc_ext");
      if (file.size > 5 * 1024 * 1024) errors.push("motivationDoc_size");
    }

    if (errors.length) {
      return new Response(JSON.stringify({ ok: false, error: "validation", fields: errors }), { status: 400 });
    }

    const timestamp = new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });

    const mailFrom = need("MAIL_FROM");
    const mailTo   = need("MAIL_TO");

    const subject = `Заявка IT FRIENDS HUB — ${fullName}`;

    const message =
      `📩 Нова заявка
      👤 ПІБ: ${fullName}
      🏢 Філія: ${branch || "—"}
      📞 Телефон: ${phoneDigits}
      🎂 Повних років: ${ageYears}
      📚 Курс: ${courseTitle}
      📆 Років навчається в IT Friends: ${ys}
      ⏰ Дата: ${timestamp}
    `;

    const text = message;
    const html =
      `<div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji';font-size:14px;line-height:1.5">` +
      `<pre style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</pre>` +
      `</div>`;

    // motivation file
    const attachments: Mail.Attachment[] = [];
    if (file) {
      const buf = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buf,
        contentType:
          file.type ||
          (file.name.toLowerCase().endsWith(".docx")
            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "application/msword"),
      });
    }

    const transport = getTransport();
    const info = await transport.sendMail({
      from: mailFrom,
      to:   mailTo,
      subject,
      text,
      html,
      attachments,
    } satisfies Mail.Options);

    console.log(C.cyan("[MAIL] sent id:"), info.messageId);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error(C.red("[SCHOLARSHIP] ERROR:"), err?.message || err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "unknown" }), { status: 500 });
  }
};