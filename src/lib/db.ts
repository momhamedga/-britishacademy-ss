// src/lib/db.ts
import { neon, neonConfig } from '@neondatabase/serverless';

// 🚀 تسريع الاتصال في بيئة التطوير (Edge-compatible fetch)
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from environment variables');
}

// إنشاء اتصال واحد فقط ومشاركته (Singleton Pattern)
const sql = neon(process.env.DATABASE_URL);

export { sql };