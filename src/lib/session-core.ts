// Signed, expiring session tokens using Web Crypto (HMAC-SHA256).
// No Node-only APIs here on purpose — this file is imported by proxy.ts,
// which runs in the middleware runtime.

export const STUDENT_SESSION_MAX_AGE = 60 * 60 * 24; // 24h
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24; // 24h

type TokenType = "student" | "admin";

function getSecretKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is missing from environment variables");
  }
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

async function sign(type: TokenType, subject: string, maxAgeSeconds: number): Promise<string> {
  const expires = Date.now() + maxAgeSeconds * 1000;
  const payload = `${type}.${subject}.${expires}`;
  const key = await getSecretKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

async function verify(type: TokenType, token: string | undefined | null): Promise<string | null> {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [tokenType, subject, expiresStr, signature] = parts;

  if (tokenType !== type || !subject) return null;

  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return null;

  try {
    const key = await getSecretKey();
    const payload = `${tokenType}.${subject}.${expiresStr}`;
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      new TextEncoder().encode(payload)
    );
    return valid ? subject : null;
  } catch {
    return null;
  }
}

export function createStudentSessionToken(studentId: string): Promise<string> {
  return sign("student", studentId, STUDENT_SESSION_MAX_AGE);
}

export function verifyStudentSessionToken(token: string | undefined | null): Promise<string | null> {
  return verify("student", token);
}

export async function createAdminSessionToken(): Promise<string> {
  return sign("admin", "authorized", ADMIN_SESSION_MAX_AGE);
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  return (await verify("admin", token)) === "authorized";
}
