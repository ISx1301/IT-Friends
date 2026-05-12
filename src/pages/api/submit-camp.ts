import type { APIRoute } from "astro";
import nodemailer, { type Transporter } from "nodemailer";
import { CAMPS, CAMP_MAIL_TO, TELEGRAM_CHAT_IDS_CAMPS, type CampId } from "@/constants";

export const prerender = false;

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string | undefined;

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getTransport(): Transporter {
  const host   = need("SMTP_HOST");
  const port   = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const user   = need("SMTP_USER");
  const pass   = need("SMTP_PASS");
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

async function sendTelegramMessage(chatId: number, text: string) {
  const url =
    `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage` +
    `?chat_id=${chatId}` +
    `&text=${encodeURIComponent(text)}`;
  const res  = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data && data.ok === false)) {
    throw new Error(`Telegram error: ${res.status} ${JSON.stringify(data)}`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const hp = String(form.get("hp") ?? "").trim();
    if (hp) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    const campRaw      = String(form.get("camp") ?? "").trim() as CampId;
    const campInfo     = CAMPS[campRaw];
    const campLabel    = campInfo?.label ?? campRaw;

    const parentName      = String(form.get("parentName")      ?? "").trim();
    const childFirstName  = String(form.get("childFirstName")  ?? "").trim();
    const childLastName   = String(form.get("childLastName")   ?? "").trim();
    const childAge        = String(form.get("childAge")        ?? "").trim();
    const addressStreet   = String(form.get("addressStreet")   ?? "").trim();
    const phone           = String(form.get("phone")           ?? "").replace(/\D/g, "");
    const referral        = String(form.get("referral")        ?? "").trim();
    const timestamp       = new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });

    const textMessage =
      `🏕️ Нова заявка (ТАБІР)\n\n` +
      `🏕️ Табір: ${campLabel}\n` +
      `👤 Ім'я батьків: ${parentName}\n` +
      `🧒 Ім'я дитини: ${childFirstName}\n` +
      `🧒 Прізвище дитини: ${childLastName}\n` +
      `🎂 Вік: ${childAge}\n` +
      `🏠 Адреса: ${addressStreet}\n` +
      `📞 Телефон: ${phone}\n` +
      `👥 Звідки дізнались: ${referral || "—"}\n` +
      `⏰ Дата: ${timestamp}`;

    // 1) Telegram
    if (TG_BOT_TOKEN) {
      try {
        const chatId = TELEGRAM_CHAT_IDS_CAMPS[campRaw] ?? TELEGRAM_CHAT_IDS_CAMPS.karpaty;
        await sendTelegramMessage(chatId, textMessage);
        console.log("[Camp/Telegram] sent OK to", chatId);
      } catch (tgErr: any) {
        console.error("[Camp/Telegram] FAILED:", tgErr?.message || tgErr);
      }
    }

    // 2) Email
    const hasSMTP =
      !!process.env.SMTP_HOST &&
      !!process.env.SMTP_USER &&
      !!process.env.SMTP_PASS &&
      !!process.env.MAIL_FROM;

    if (hasSMTP) {
      try {
        const transport = getTransport();
        const mailFrom  = need("MAIL_FROM");
        const mailTo    = process.env.CAMP_MAIL_TO || CAMP_MAIL_TO;

        await transport.sendMail({
          from:    mailFrom,
          to:      mailTo,
          subject: `Нова заявка (Табір — ${campLabel})`,
          text:    textMessage,
        });
        console.log("[Camp/Mail] sent OK");
      } catch (mailErr: any) {
        console.error("[Camp/Mail] FAILED:", mailErr?.message || mailErr);
      }
    } else {
      console.warn("[Camp/Mail] skipped: missing SMTP envs");
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err: any) {
    console.error("[submit-camp] error:", err?.message || err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "unknown" }), { status: 500 });
  }
};
