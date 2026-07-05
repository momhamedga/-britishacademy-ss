import { cookies } from "next/headers";
import {
  STUDENT_SESSION_MAX_AGE,
  ADMIN_SESSION_MAX_AGE,
  createStudentSessionToken,
  verifyStudentSessionToken,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "./session-core";

export { STUDENT_SESSION_MAX_AGE, ADMIN_SESSION_MAX_AGE, createStudentSessionToken, createAdminSessionToken };

export const AUTH_COOKIE = "auth_token";
export const ADMIN_COOKIE = "admin_session";

// Reads and verifies the signed session cookie set at login — the only
// trusted source of the caller's identity. Never trust a client-supplied
// studentId/userId for authorization decisions.
export async function getCurrentStudentId(): Promise<string | null> {
  const cookieStore = await cookies();
  return verifyStudentSessionToken(cookieStore.get(AUTH_COOKIE)?.value);
}

export async function isAdminAuthorized(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}
