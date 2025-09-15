import type { APIRoute } from "astro";
import nodemailer, { type Transporter } from "nodemailer";
import { google } from "googleapis";
import { TELEGRAM_CHAT_IDS } from "@/constants";

export const prerender = false;

function need(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

/** Telegram */

const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string | undefined;
// const TG_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN as string | undefined;


// console.log("[TG] token present:", Boolean(process.env.TELEGRAM_BOT_TOKEN));

function pickTelegramChatId(branchRaw: string): number {
  const key = (branchRaw || "default").toLowerCase() as keyof typeof TELEGRAM_CHAT_IDS;
  return TELEGRAM_CHAT_IDS[key] ?? TELEGRAM_CHAT_IDS.default;
}

type MessageParams = { 
  // id: string;
  parentName: string;
  childFirstName: string;
  childLastName: string;
  childAge: string;
  addressStreet: string;
  phone: string;
  itCourse: string;
  wantEnglish: string;
  referral: string
};

const getMessageTemplate = ({ parentName, phone, childFirstName, childLastName, childAge, addressStreet, itCourse, wantEnglish, referral }: MessageParams) => `
  📩 Нова заявка (IT курси)
👤  Ім'я батьків: ${parentName}
🧒  Ім’я дитини: ${childFirstName}
🧒  Прізвище дитини: ${childLastName}
🎂  Вік: ${childAge}
🏠  Адреса: ${addressStreet}
📞  Телефон: ${phone}
💻  IT курс: ${itCourse}
🇬🇧  Англійська: ${wantEnglish}
👥  Звідки дізнались: ${referral}
`.trim();

async function sendTelegramMessage(chatId: number, text: string) {
  const url =
    `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage` +
    `?chat_id=${chatId}` +
    `&text=${encodeURIComponent(text)}`; 

  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data && data.ok === false)) {
    throw new Error(`Telegram error: ${res.status} ${JSON.stringify(data)}`);
  }
}



/** SMTP transport */
function getTransport(): Transporter {
  const host = need("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const user = need("SMTP_USER");
  const pass = need("SMTP_PASS");
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

/** Auth for Google Sheets */
function getAuth() {
  return new google.auth.JWT({
    email: need("G_SERVICE_EMAIL"),
    key: need("G_SERVICE_KEY").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}


async function listSheets(spreadsheetId: string) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.get({ spreadsheetId });
  const titles = res.data.sheets?.map((s) => s.properties?.title) || [];
  console.log("[Sheets] tabs →", titles);
  return titles;
}

async function appendToSheetRow(spreadsheetId: string, sheetName: string, values: (string | null)[]) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  console.log("[Sheets] target", { spreadsheetId, sheetName });
  await listSheets(spreadsheetId);

  const range = `${sheetName}!A:J`;
  console.log("[Sheets] append row →", { range, values });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });

  console.log("[Sheets] append OK");
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // --- DEBUG ENV VARS ---
    console.log("[ENV DEBUG]", {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      SMTP_USER: process.env.SMTP_USER ? "[exists]" : "[missing]",
      SMTP_PASS: process.env.SMTP_PASS ? "[exists]" : "[missing]",
      MAIL_FROM: process.env.MAIL_FROM,
      MAIL_TO: process.env.MAIL_TO,
      G_SHEETS_ID: process.env.G_SHEETS_ID,
      G_SHEETS_ID_BORSHCHAHIVKA: process.env.G_SHEETS_ID_BORSHCHAHIVKA,
      G_SHEETS_TAB_BORSHCHAHIVKA: process.env.G_SHEETS_TAB_BORSHCHAHIVKA,
      G_SERVICE_EMAIL: process.env.G_SERVICE_EMAIL,
      G_SERVICE_KEY: process.env.G_SERVICE_KEY ? "[exists]" : "[missing]",
    });

    const form = await request.formData();

    // honeypot
    const hp = String(form.get("hp") ?? "").trim();
    if (hp) {
      console.warn("[Form] honeypot triggered, skip processing");
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const branchRaw = String(form.get("branch") || "default");
    const branch = branchRaw.toUpperCase();

    const envIdKey = `G_SHEETS_ID_${branch}`;
    const envTabKey = `G_SHEETS_TAB_${branch}`;

    const sheetId = process.env[envIdKey] || process.env["G_SHEETS_ID"];
    const sheetName = process.env[envTabKey] || "Заявки";

    console.log("[Form Submit] resolve sheet", {
      branch,
      envIdKey,
      envTabKey,
      sheetId,
      sheetName,
      hasFallback: Boolean(process.env["G_SHEETS_ID"]),
    });

    // if (!sheetId) {
    //   throw new Error(`No sheet ID for branch=${branch} (expected ${envIdKey} or G_SHEETS_ID)`);
    // }

    const hasSheets = !!sheetId && !!process.env.G_SERVICE_EMAIL && !!process.env.G_SERVICE_KEY;

    const values: (string | null)[] = [
      String(form.get("parentName") ?? "").trim(),
      String(form.get("childFirstName") ?? "").trim(),
      String(form.get("childLastName") ?? "").trim(),
      String(form.get("childAge") ?? "").trim(),
      String(form.get("addressStreet") ?? "").trim(),
      String(form.get("phone") ?? "").trim(),
      (String(form.get("itCourse") ?? "").trim() || null),
      (String(form.get("wantEnglish") ?? "").trim() || null),
      (String(form.get("referral") ?? "").trim() || null),
      new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }),
    ];

    // 1) Google Sheets
    // try {
    //   await appendToSheetRow(sheetId, sheetName, values);
    // } catch (sheetsErr: any) {
    //   console.error("[Sheets] append FAILED:", sheetsErr?.message || sheetsErr);
    //   throw sheetsErr;
    // }
    if (hasSheets) {
      try {
        await appendToSheetRow(sheetId!, sheetName, values);
      } catch (sheetsErr: any) {
        console.error("[Sheets] append FAILED:", sheetsErr?.message || sheetsErr);
      }
    } else {
      console.warn("[Sheets] skipped: missing G_SHEETS_ID or service account creds");
    }

    // 2) Email

    const hasSMTP =
      !!process.env.SMTP_HOST &&
      !!process.env.SMTP_USER &&
      !!process.env.SMTP_PASS &&
      !!process.env.MAIL_FROM &&
      !!process.env.MAIL_TO;

    if (hasSMTP) {
      try {
        const transport = getTransport(); 
        const mailFrom = need("MAIL_FROM");
        const mailTo = need("MAIL_TO");

        const textMessage =
          `📩 Нова заявка (${branch})\n\n` +
          `👤 Ім'я батьків: ${values[0]}\n` +
          `🧒 Ім’я дитини: ${values[1]}\n` +
          `🧒 Прізвище дитини: ${values[2]}\n` +
          `🎂 Вік: ${values[3]}\n` +
          `🏠 Адреса: ${values[4]}\n` +
          `📞 Телефон: ${values[5]}\n` +
          `💻 IT курс: ${values[6] || "—"}\n` +
          `🇬🇧 Англійська: ${values[7] || "—"}\n` +
          `👥 Звідки дізнались: ${values[8] || "—"}\n` +
          `⏰ Дата: ${values[9]}`;

        const info = await transport.sendMail({
          from: mailFrom,
          to: mailTo,
          subject: `Нова заявка (IT-курси ${branch})`,
          text: textMessage,
        });
        console.log("[Mail] sent OK, id:", info.messageId);
      } catch (mailErr: any) {
        console.error("[Mail] FAILED:", mailErr?.message || mailErr);
      }
    } else {
      console.warn("[Mail] skipped: missing SMTP/Mail envs");
    }

    // 3) Telegram 
    try {
      const chatId = pickTelegramChatId(branchRaw);
      const message = getMessageTemplate({
        parentName: String(values[0] || ""),
        childFirstName: String(values[1] || ""),
        childLastName: String(values[2] || ""),
        childAge: String(values[3] || ""),
        addressStreet: String(values[4] || ""),
        phone: String(values[5] || ""),
        itCourse: String(values[6] || ""),
        wantEnglish: String(values[7] || ""),
        referral: String(values[8] || ""),
      });

      await sendTelegramMessage(chatId, message);
      console.log("[Telegram] sent OK to", chatId);
    } catch (tgErr: any) {
      console.error("[Telegram] FAILED:", tgErr?.message || tgErr);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err: any) {
    console.error("[submit] error:", err?.message || err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "unknown" }), { status: 500 });
  }
};