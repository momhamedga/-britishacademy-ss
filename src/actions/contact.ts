"use server"

import { Resend } from 'resend';
import { z } from 'zod';

// إعداد Resend بالمفتاح الخاص بك
const resend = new Resend(process.env.RESEND_API_KEY);

// التحقق من البيانات لمنع أي ثغرات برمجية
const ContactSchema = z.object({
  user_name: z.string().min(2),
  user_email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function sendContactEmail(formData: FormData) {
  // تجميع البيانات من الفورم
  const rawData = {
    user_name: formData.get('user_name'),
    user_email: formData.get('user_email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.error("❌ Validation Failed:", validatedFields.error.flatten().fieldErrors);
    return { success: false, message: "Please check your inputs." };
  }

  const { user_name, user_email, subject, message } = validatedFields.data;

  try {
    // إرسال الإيميل باستخدام HTML مباشر (نفس اللي حطيته في Dashboard Resend)
    const { data, error } = await resend.emails.send({
      // بما أن الدومين Verified، نستخدم البريد الرسمي
      from: 'British Academy <system@britishacademy-ss.com>', 
      to: ['info@britishacademy-ss.com'],
      subject: `New Inquiry: ${subject}`,
      reply_to: user_email, // للرد على العميل مباشرة
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e1e8ed; border-radius: 16px; overflow: hidden;">
          <div style="background-color: #001f3f; padding: 30px; text-align: center; border-bottom: 4px solid #D4AF37;">
            <h1 style="color: #ffffff; font-size: 18px; text-transform: uppercase; margin: 0;">Inquiry Received</h1>
          </div>
          <div style="padding: 40px; color: #333;">
            <p style="font-size: 10px; font-weight: bold; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px;">Objective</p>
            <p style="font-size: 18px; font-weight: bold; color: #001f3f; margin-top: 0;">${subject}</p>
            
            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
              <div>
                <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; margin: 0;">Sender</p>
                <p style="font-size: 14px; font-weight: bold; margin: 0;">${user_name}</p>
              </div>
            </div>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #001f3f;">
              <p style="font-size: 14px; line-height: 1.6; margin: 0;">${message}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${user_email}" style="background-color: #001f3f; color: #D4AF37; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 12px;">Respond to Sender</a>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Transmission Successful" };

  } catch (error) {
    console.error("❌ System Error:", error);
    return { success: false, message: "Connection lost. Please retry." };
  }
}