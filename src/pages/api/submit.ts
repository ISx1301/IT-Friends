import type { APIRoute } from "astro";
import nodemailer, { type Transporter } from "nodemailer";
import { google } from "googleapis";

export const prerender = false;

const DIRECTION_TITLE = "IT заняття";

// env
function need(name: keyof ImportMetaEnv): string {
  const v = import.meta.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const BRANCH_TITLES: Record<string, string> = {
  borshchahivka: "ЖМ Борщагівка — Б-р, Кольцова 14",
  kharkivska_poznyaky: "ЖМ Харківська-Позняки — Вул. Кошиця 9Б",
  poznyaky: "ЖМ Позняки — Пр-т, Григоренко 16",
  troieshchyna: "ЖМ Троєщина — Пр-т, Маяковського 91в",
  voskresenka: "ЖМ Воскресенка — Вул. Курнатовського 22",
};


const BRANCH_SHEETS: Record<string, string | undefined> = {
  borshchahivka:       import.meta.env.G_SHEETS_ID_BORSHCHAHIVKA,
  kharkivska_poznyaky: import.meta.env.G_SHEETS_ID_KHARKIVSKA_POZNYAKY,
  poznyaky:            import.meta.env.G_SHEETS_ID_POZNYAKY,
  troieshchyna:        import.meta.env.G_SHEETS_ID_TROIESHCHYNA,
  voskresenka:         import.meta.env.G_SHEETS_ID_VOSKRESENKA,
};


function getTransport(): Transporter {
  const host = need("SMTP_HOST");
  const port = Number(import.meta.env.SMTP_PORT || 587);
  const secure = String(import.meta.env.SMTP_SECURE || "false") === "true";
  const user = need("SMTP_USER");
  const pass = need("SMTP_PASS");
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

function getSheets() {
  const email = need("G_SERVICE_EMAIL");
  const keyRaw = need("G_SERVICE_KEY");
  const privateKey = keyRaw.replace(/\\n/g, "\n");
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function appendToSheetRow(spreadsheetId: string, values: (string | null)[]) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "A:J",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const form = await request.formData();

    // honeypot
    if ((form.get("hp") as string)?.trim()) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const branch          = String(form.get("branch") ?? "").trim();
    const parentName      = String(form.get("parentName") ?? "").trim();
    const childFirstName  = String(form.get("childFirstName") ?? "").trim();
    const childLastName   = String(form.get("childLastName") ?? "").trim();
    const childAge        = String(form.get("childAge") ?? "").trim();
    const addressStreet   = String(form.get("addressStreet") ?? "").trim();
    const phone           = String(form.get("phone") ?? "").trim();
    const itCourse        = String(form.get("itCourse") ?? "").trim();
    const wantEnglish     = String(form.get("wantEnglish") ?? "").trim();
    const referral        = String(form.get("referral") ?? "").trim();

    
    if (!branch || !parentName || !childFirstName || !childLastName || !childAge || !addressStreet || !phone) {
      return new Response(JSON.stringify({ ok: false, error: "required" }), { status: 400 });
    }

    const fallbackSheet = import.meta.env.G_SHEETS_ID!;
    const sheetId = BRANCH_SHEETS[branch] || fallbackSheet;

    const MAIL_TO = need("MAIL_TO");
    const MAIL_FROM = import.meta.env.MAIL_FROM || import.meta.env.SMTP_USER!;
    const transporter = getTransport();

    const branchTitle = BRANCH_TITLES[branch] ?? "—";
    const subject = `Школа: ${branchTitle}. Напрям: ${DIRECTION_TITLE}. Нова заявка: ${childFirstName} ${childLastName}`;

    const info = await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      text:
        `Школа: ${branchTitle}
        Напрям: ${DIRECTION_TITLE}
        Ім’я батьків: ${parentName}
        Ім’я дитини: ${childFirstName}
        Прізвище дитини: ${childLastName}
        Вік дитини: ${childAge}
        Вулиця: ${addressStreet}
        Телефон: ${phone}
        Курс IT (бажаний): ${itCourse || "—"}
        Англ. додатково: ${wantEnglish || "—"}
        Звідки дізнались: ${referral || "—"}`,
      html: `
        <div>
          <p><b>Школа:</b> ${branchTitle}</p>
          <p><b>Напрям:</b> ${DIRECTION_TITLE}</p>
          <p><b>Ім’я батьків:</b> ${parentName}</p>
          <p><b>Ім’я дитини:</b> ${childFirstName}</p>
          <p><b>Прізвище дитини:</b> ${childLastName}</p>
          <p><b>Вік дитини:</b> ${childAge}</p>
          <p><b>Вулиця:</b> ${addressStreet}</p>
          <p><b>Телефон:</b> ${phone}</p>
          <p><b>Курс IT (бажаний):</b> ${itCourse || "—"}</p>
          <p><b>Англ. додатково:</b> ${wantEnglish || "—"}</p>
          <p><b>Звідки дізнались:</b> ${referral || "—"}</p>
        </div>
      `,
    });
    // console.log("[mail] sent:", info.messageId);

    if (sheetId) {
      const ts = new Date().toLocaleString("uk-UA", {
        timeZone: "Europe/Kyiv",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      await appendToSheetRow(sheetId, [
        parentName,
        childFirstName,
        childLastName,
        childAge,
        addressStreet,
        phone,
        itCourse || null,
        wantEnglish || null,
        referral || null,
        ts,
      ]);
    }

    if (request.headers.get("accept")?.includes("text/html")) {
      return redirect("/thanks", 303);
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("[submit] error:", err);
    const message = err?.response?.toString?.() || err?.message || "unknown";
    return new Response(JSON.stringify({ ok: false, error: message }), { status: 500 });
  }
};
