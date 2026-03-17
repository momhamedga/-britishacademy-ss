import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    // تحديث القائمة لتشمل الجودة 100 كما طلب الـ Error
    // أضفنا الـ 100 في البداية لضمان الوضوح الأقصى (Cinematic Quality)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    qualities: [100, 75, 70], 
    
    // إعدادات إضافية لضمان عدم البكسلة في البيئات المختلفة
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // إعدادات تحسين الأداء للـ Cinematic UI
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;