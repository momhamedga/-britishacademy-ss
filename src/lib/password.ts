import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;
const PREFIX = "scrypt";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${PREFIX}:${salt}:${hash}`;
}

// Supports legacy plaintext rows so existing accounts keep working; callers
// should rehash and persist the result after a successful legacy match.
export function verifyPassword(password: string, stored: string): boolean {
  if (!stored) return false;

  if (!stored.startsWith(`${PREFIX}:`)) {
    return stored === password;
  }

  const [, salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const storedHash = Buffer.from(hash, "hex");
  const candidateHash = scryptSync(password, salt, KEY_LENGTH);
  return storedHash.length === candidateHash.length && timingSafeEqual(storedHash, candidateHash);
}

export function isLegacyPlaintext(stored: string): boolean {
  return !stored?.startsWith(`${PREFIX}:`);
}
