"use client"
import { useEffect } from "react";

export default function AnimatedFavicon() {
  useEffect(() => {
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    
    // إنشاء عنصر الرابط إذا لم يكن موجوداً
    if (!favicon) {
      const link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    let step = 0;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, 32, 32);

      // حساب قيمة النبض (قيمة تتأرجح بين 0.4 و 1.0)
      const pulse = 0.7 + Math.sin(step) * 0.3;
      const glowOpacity = (Math.sin(step) + 1) / 2;

      // 1. رسم التوهج الخلفي (Back Glow)
      const gradient = ctx.createRadialGradient(16, 16, 2, 16, 16, 14);
      gradient.addColorStop(0, `rgba(212, 175, 55, ${0.3 * glowOpacity})`);
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      // 2. رسم الدرع التكتيكي (Shield Path)
      ctx.beginPath();
      // نقطة البداية (أعلى المنتصف)
      ctx.moveTo(16, 6); 
      // الضلع العلوي الأيمن
      ctx.lineTo(26, 8); 
      // الانحناء للأسفل
      ctx.quadraticCurveTo(26, 20, 16, 28);
      // الانحناء للأعلى (الجانب الأيسر)
      ctx.quadraticCurveTo(6, 20, 6, 8);
      ctx.closePath();

      // 3. تلوين الدرع بالذهب
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(212, 175, 55, ${pulse})`; // النبض في شفافية الحدود
      ctx.stroke();

      // إضافة إضاءة داخلية خفيفة للدرع
      ctx.fillStyle = `rgba(212, 175, 55, ${0.1 * pulse})`;
      ctx.fill();

      // 4. رسم نقطة "الرادار" النشطة في زاوية الدرع
      ctx.beginPath();
      ctx.arc(22, 12, 2 * glowOpacity, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();

      // تحديث رابط الفافيكون بالصورة الجديدة
      const faviconLink = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (faviconLink) {
        faviconLink.href = canvas.toDataURL('image/png');
      }

      step += 0.04; // سرعة النبض
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return null; 
}