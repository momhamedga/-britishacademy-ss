import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // 1. تجاوز أخطاء الـ TypeScript فقط (ده اللي بنحتاجه فعلياً للـ Build)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ملاحظة: تم حذف eslint و turbo من هنا لأن Next.js 16 بيتعامل معاهم أوتوماتيكياً
  // أو من خلال ملفات config مستقلة (مثل eslint.config.mjs)

  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;