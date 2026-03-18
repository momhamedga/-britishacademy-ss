"use server"

import { z } from 'zod';

const ContactSchema = z.object({
  user_name: z.string().min(2),
  user_email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function sendContactEmail(formData: FormData) {
const rawData = {
    user_name: formData.get('user_name'),
    user_email: formData.get('user_email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  // السطر ده هيعرفك السيرفر استلم إيه بالظبط
  console.log("Raw Data Received:", rawData);

  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    // السطر ده هو "المفتاح" .. هيطبع لك في الـ VS Code Terminal الغلط فين
    console.error("Zod Error Details:", validatedFields.error.flatten().fieldErrors);
    
    return {
      success: false,
      message: "Validation Failed", // دي اللي بتطلع لك في المتصفح
    };
  }
  try {
    // التعديل هنا: استخدام المتغيرات مباشرة للتأكد من قراءتها
    const payload = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, // ده الـ Public Key
      template_params: {
        user_name: validatedFields.data.user_name,   // اتأكد إن دي نفس الأسامي في Template EmailJS
        user_email: validatedFields.data.user_email,
        subject: validatedFields.data.subject,
        message: validatedFields.data.message,
      },
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000' // مهم جداً لـ EmailJS في بعض الأحيان
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("EmailJS API Error:", errorResponse);
      return { success: false, message: `EmailJS Error: ${errorResponse}` };
    }

    return { success: true, message: "Transmitted" };

  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, message: "System Offline" };
  }
}