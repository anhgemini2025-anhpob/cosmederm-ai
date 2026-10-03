export const ACCESS_DAYS = 14;
export const AUTH_EVENT = "cosmederm-auth-change";

const DAY_MS = 24 * 60 * 60 * 1000;
const ACCOUNTS_KEY = "cosmederm_accounts_v1";
const SESSION_KEY = "cosmederm_session_v1";
const PBKDF2_ITERATIONS = 100_000;

export type AuthStatus = "none" | "expired" | "authed";
export type AuthResult = { ok: true } | { ok: false; error: string };

export interface RegisterInput {
  name: string;
  phone: string;
  email: string;
  password: string;
}

interface Account {
  id: string;
  name: string;
  phone: string;
  email: string;
  salt: string;
  hash: string;
  createdAt: number;
  expiresAt: number;
}

const fail = (error: string): AuthResult => ({ ok: false, error });

function isAccount(value: unknown): value is Account {
  if (!value || typeof value !== "object") return false;
  const a = value as Record<string, unknown>;
  return (
    typeof a.id === "string" &&
    typeof a.name === "string" &&
    typeof a.phone === "string" &&
    typeof a.email === "string" &&
    typeof a.salt === "string" &&
    typeof a.hash === "string" &&
    typeof a.createdAt === "number" &&
    typeof a.expiresAt === "number"
  );
}

function readAccounts(): Account[] {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isAccount) : [];
  } catch {
    return [];
  }
}

function writeAccounts(list: Account[]): boolean {
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

function readSession(): string | null {
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function writeSession(id: string | null) {
  try {
    if (id) window.localStorage.setItem(SESSION_KEY, id);
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // storage unavailable: nothing to persist
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function normalizePhone(raw: string): string {
  let p = raw.replace(/[^\d+]/g, "");
  if (p.startsWith("+84")) p = "0" + p.slice(3);
  else if (p.startsWith("0084")) p = "0" + p.slice(4);
  else if (/^84\d{9,10}$/.test(p)) p = "0" + p.slice(2);
  return p;
}

const isValidPhone = (p: string) => /^\+?\d{8,15}$/.test(p);
const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

function randomBytes(length: number): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function toBase64(bytes: Uint8Array | ArrayBuffer): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  view.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

function fromBase64(b64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

async function derive(password: string, salt: Uint8Array<ArrayBuffer>): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return toBase64(bits);
}

const hasCrypto = () => typeof crypto !== "undefined" && !!crypto.subtle;
const NO_CRYPTO = "Trình duyệt này chưa hỗ trợ đăng nhập. Vui lòng mở bằng Chrome hoặc Safari.";

// Access always lasts at least ACCESS_DAYS from registration, so a longer period also covers accounts
// created earlier (their stored expiresAt still reflects the old period).
const accessUntil = (a: Account) => Math.max(a.expiresAt, a.createdAt + ACCESS_DAYS * DAY_MS);

export function getStatus(): AuthStatus {
  const id = readSession();
  if (!id) return "none";
  const account = readAccounts().find((a) => a.id === id);
  if (!account) return "none";
  return Date.now() < accessUntil(account) ? "authed" : "expired";
}

export async function registerAccount(input: RegisterInput): Promise<AuthResult> {
  const name = input.name.trim().replace(/\s+/g, " ");
  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);

  if (name.length < 2) return fail("Vui lòng nhập họ và tên.");
  if (!isValidPhone(phone)) return fail("Số điện thoại chưa đúng. Ví dụ: 0908 095 693.");
  if (!isValidEmail(email)) return fail("Email chưa đúng định dạng.");
  if (input.password.length < 6) return fail("Mật khẩu cần tối thiểu 6 ký tự.");
  if (!hasCrypto()) return fail(NO_CRYPTO);

  const accounts = readAccounts();
  if (accounts.some((a) => a.email === email)) return fail("Email này đã được đăng ký. Hãy chuyển sang Đăng nhập.");
  if (accounts.some((a) => a.phone === phone)) {
    return fail("Số điện thoại này đã được đăng ký. Hãy chuyển sang Đăng nhập.");
  }

  const salt = randomBytes(16);
  const hash = await derive(input.password, salt);
  const now = Date.now();
  const account: Account = {
    id: toBase64(randomBytes(12)).replace(/[^a-zA-Z0-9]/g, ""),
    name,
    phone,
    email,
    salt: toBase64(salt),
    hash,
    createdAt: now,
    expiresAt: now + ACCESS_DAYS * DAY_MS,
  };

  if (!writeAccounts([...accounts, account])) {
    return fail("Không lưu được tài khoản (trình duyệt có thể đang ở chế độ riêng tư). Vui lòng thử ở chế độ thường.");
  }
  writeSession(account.id);
  return { ok: true };
}

export async function loginAccount(identifier: string, password: string): Promise<AuthResult> {
  const id = identifier.trim();
  if (!id || !password) return fail("Vui lòng nhập email/số điện thoại và mật khẩu.");
  if (!hasCrypto()) return fail(NO_CRYPTO);

  const byEmail = id.includes("@");
  const key = byEmail ? normalizeEmail(id) : normalizePhone(id);
  const account = readAccounts().find((a) => (byEmail ? a.email === key : a.phone === key));
  if (!account) {
    return fail("Chưa tìm thấy tài khoản này trên thiết bị. Hãy kiểm tra lại hoặc bấm Đăng ký.");
  }

  const hash = await derive(password, fromBase64(account.salt));
  if (hash !== account.hash) return fail("Mật khẩu chưa đúng.");

  writeSession(account.id);
  return { ok: true };
}

export function logoutAccount() {
  writeSession(null);
}
