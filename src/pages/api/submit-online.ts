import type { APIRoute } from "astro";
import nodemailer, { type Transporter } from "nodemailer";
import { google } from "googleapis";

export const prerender = false;

const C = {
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
};

/* ───────────── ENV helpers ───────────── */
function envGet(name: string): string | undefined { return process.env[name]; }
function envNeed(name: string): string {
  const v = envGet(name);
  if (!v) { console.error(C.red(`[ENV] Missing ${name}`)); throw new Error(`Missing env: ${name}`); }
  console.log(C.cyan(`[ENV] ${name} ✓`));
  return v;
}
function envKeysWithPrefix(prefix: string): string[] {
  return Object.keys(process.env).filter((k) => k.startsWith(prefix));
}
function normalizeKeyMultiline(raw: string): string {
  let v = String(raw ?? "").trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  return v.replace(/\\n/g, "\n");
}

/* ───────────── SMTP ───────────── */
function getTransport(): Transporter {
  console.log(C.magenta("[MAIL] init transport…"));
  const host = envNeed("SMTP_HOST");
  const port = Number(envGet("SMTP_PORT") || 587);
  const secure = String(envGet("SMTP_SECURE") || "false") === "true";
  const user = envNeed("SMTP_USER");
  const pass = envNeed("SMTP_PASS");
  console.log("[MAIL] config", { host, port, secure, user });
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

/* ───────────── Google Sheets auth ───────────── */
function getSheetsAuth() {
  console.log(C.magenta("[SHEETS] init auth…"));
  const email = envNeed("G_SERVICE_EMAIL");
  const key = normalizeKeyMultiline(envNeed("G_SERVICE_KEY"));
  return new google.auth.JWT({ email, key, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
}

/* ───────────── Sheets helpers ───────────── */
async function listSheets(spreadsheetId: string) {
  console.log("[SHEETS] list sheets in", spreadsheetId);
  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.get({ spreadsheetId });
  const titles = res.data.sheets?.map((s) => s.properties?.title) ?? [];
  console.log("[SHEETS] tabs →", titles);
  return titles;
}

async function appendRowAppendAPI(
  spreadsheetId: string,
  sheetName: string,
  values: (string | null)[]
) {
  console.log("[SHEETS] append (INSERT_ROWS) START", { spreadsheetId, sheetName });

  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await listSheets(spreadsheetId); 

  const range = `${sheetName}!A:L`;
  console.log("[SHEETS] append →", { range, values });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });

  console.log("[SHEETS] append result:", res.status, res.statusText);
}

type BranchConfig = { idEnv: string; tabEnv?: string; sheetId: string; sheetTab: string };

function resolveBranchStrict(branchRaw: string): BranchConfig | null {
  const branch = branchRaw.toUpperCase().trim(); // → ONLINE_IT | ONLINE_ENG
  const idEnv = `G_SHEETS_ONLINE_ID_${branch}`;
  const tabEnv = `G_SHEETS_ONLINE_TAB_${branch}`;
  const sheetId = envGet(idEnv) || "";
  const sheetTab = envGet(tabEnv) || "Заявки";
  return sheetId ? { idEnv, tabEnv, sheetId, sheetTab } : null;
}

function listConfiguredBranches(): string[] {
  return envKeysWithPrefix("G_SHEETS_ONLINE_ID_").map((k) => k.replace("G_SHEETS_ONLINE_ID_", ""));
}

/* ───────────── Handler ───────────── */
export const POST: APIRoute = async ({ request }) => {
  console.log(C.magenta("=== [ONLINE Form] submit START ==="));

  try {
    const form = await request.formData();
    console.log("[FORM] raw entries:", Array.from(form.entries()));

    // honeypot
    const hp = String(form.get("hp") ?? "").trim();
    if (hp) {
      console.warn(C.yellow("[FORM] honeypot triggered, skip processing]"));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // branch
    const branchRaw = String(form.get("branch") || "").trim();
    const branch = branchRaw.toUpperCase();
    console.log("[FORM] branch resolved:", { branchRaw, branch });

    const cfg = resolveBranchStrict(branch);
    const configured = listConfiguredBranches();
    console.log("[SHEETS] configured branches from ENV:", configured);

    if (!cfg) {
      console.error(C.red("[SHEETS] Missing per-branch env for"), branch);
      return new Response(
        JSON.stringify({
          ok: false,
          error: `No per-branch env found for "${branch}". Expected G_SHEETS_ONLINE_ID_${branch} (and optional G_SHEETS_ONLINE_TAB_${branch}). Configured branches: ${configured.join(", ") || "(none)"}`,
        }),
        { status: 400 }
      );
    }

    console.log("[SHEETS] resolve (STRICT)", {
      branch,
      idEnv: cfg.idEnv,
      tabEnv: cfg.tabEnv,
      sheetId: "FOUND",
      sheetTab: cfg.sheetTab,
    });

    
    const parentName     = String(form.get("parentName") ?? "").trim();
    const childFirstName = String(form.get("childFirstName") ?? "").trim();
    const childLastName  = String(form.get("childLastName") ?? "").trim();
    const childAge       = String(form.get("childAge") ?? "").trim();
    const addressStreet  = String(form.get("addressStreet") ?? "").trim();
    const city           = String(form.get("city") ?? "").trim();
    const country        = String(form.get("country") ?? "").trim();
    const phone          = String(form.get("phone") ?? "").trim();
    const itCourse       = (String(form.get("itCourse") ?? "").trim() || null);
    const wantEnglish    = String(form.get("wantEnglish") ?? "").trim();
    const wantIt         = String(form.get("wantIt") ?? "").trim();
    const wantCombined   = (wantEnglish || wantIt || "") || null; 
    const referral       = (String(form.get("referral") ?? "").trim() || null);
    const timestamp      = new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" });

    
    const colA = parentName || `${childFirstName} ${childLastName}`.trim() || timestamp;

    // A..L
    const values: (string | null)[] = [
      colA,                // A 
      childFirstName,      // B
      childLastName,       // C
      childAge,            // D
      addressStreet,       // E
      city,                // F
      (country || null),   // G
      phone,               // H
      itCourse,            // I
      wantCombined,        // J
      referral,            // K
      timestamp,           // L
    ];
    console.log("[FORM] prepared values:", values);

    // 1) Google Sheets 
    try {
      await appendRowAppendAPI(cfg.sheetId, cfg.sheetTab, values);
      console.log(C.cyan("[SHEETS] append OK"));
    } catch (e: any) {
      console.error(C.red("[SHEETS] append ERROR:"), e?.message || e);
      throw e;
    }

    // 2) Email 
    const transport = getTransport();
    const mailFrom = envNeed("MAIL_FROM");
    const mailTo = envNeed("MAIL_TO");

    const textMessage =
      `📩 Нова заявка (ОНЛАЙН, ${branch})\n\n` +
      `👤 Ім'я батьків: ${parentName || "—"}\n` +
      `🧒 Ім’я дитини: ${childFirstName} ${childLastName}\n` +
      `🎂 Вік: ${childAge || "—"}\n` +
      `🏠 Адреса: ${addressStreet || "—"}\n` +
      `🏙️ Місто: ${city || "—"}\n` +
      `🌍 Країна: ${country || "—"}\n` +
      `📞 Телефон: ${phone || "—"}\n` +
      `💻 IT курс: ${itCourse || "—"}\n` +
      `➕ Додатково (англ/IT): ${wantCombined || "—"}\n` +
      `👥 Звідки дізнались: ${referral || "—"}\n` +
      `⏰ Дата: ${timestamp}`;

    console.log("[MAIL] sending…", { mailFrom, mailTo });
    const info = await transport.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: `Нова заявка (Онлайн, ${branch})`,
      text: textMessage,
    });
    console.log(C.cyan("[MAIL] sent OK:"), info.messageId);

    console.log(C.magenta("=== [ONLINE Form] submit SUCCESS ==="));
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error(C.red("=== [ONLINE Form] ERROR ==="), err?.message || err);
    return new Response(JSON.stringify({ ok: false, error: err?.message || "unknown" }), { status: 500 });
  }
};