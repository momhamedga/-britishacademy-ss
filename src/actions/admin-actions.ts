"use server"
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob"; // <--- دي اللي كانت ناقصة يا وحش!

// --- 1. COURSES MODULE ---
export async function upsertCourse(formData: FormData) {
  const id = formData.get('id') as string;
  let imageUrl = formData.get('image_url') as string;
  const imageFile = formData.get('image_file') as File;

  // 1. تكتيك الرفع لـ Vercel Blob
  // لو فيه ملف حقيقي تم رفعه من الكمبيوتر
  if (imageFile && imageFile.size > 0) {
    try {
      // الرفع المباشر للسحابة باستخدام التوكن اللي حطيته في الـ .env
      const blob = await put(`course-assets/${Date.now()}-${imageFile.name}`, imageFile, {
        access: 'public',
      });
      imageUrl = blob.url; // هناimageUrl بتتحول للينك الرسمي بتاع فيرسيل
      console.log("SUCCESSFUL_DEPLOYMENT_TO_BLOB:", imageUrl);
    } catch (e) {
      console.error("BLOB_UPLOAD_FAILED:", e);
      // لو الرفع فشل، بنخلي الـ imageUrl زي ما هي عشان السيستم ما يضربش
    }
  }

  // 2. تجهيز البيانات للقاعدة
  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    duration: formData.get('duration'),
    level: formData.get('level'),
    instructor_name: formData.get('instructor_name'),
    price: parseFloat(formData.get('price') as string) || 0,
    image_url: imageUrl, // اللينك الجديد بتاع فيرسيل هيتسيف هنا
    is_sia: formData.get('is_sia') === 'on' || formData.get('is_sia') === 'true',
    full_content: formData.get('full_content'),
  };

  try {
    if (id) {
      await sql`
        UPDATE courses SET 
          title=${data.title}, 
          slug=${data.slug}, 
          category=${data.category}, 
          duration=${data.duration}, 
          level=${data.level}, 
          instructor_name=${data.instructor_name}, 
          price=${data.price}, 
          image_url=${data.image_url}, 
          is_sia_accredited=${data.is_sia}, 
          full_content=${data.full_content} 
        WHERE id = ${id}`;
    } else {
      await sql`
        INSERT INTO courses 
          (title, slug, category, duration, level, instructor_name, price, image_url, is_sia_accredited, full_content) 
        VALUES 
          (${data.title}, ${data.slug}, ${data.category}, ${data.duration}, ${data.level}, ${data.instructor_name}, ${data.price}, ${data.image_url}, ${data.is_sia}, ${data.full_content})`;
    }
    
    revalidatePath('/admin/courses');
    revalidatePath('/academy'); // عشان التغيير يظهر للطلاب فوراً
    return { success: true };
  } catch (e) { 
    console.error("DATABASE_SYNC_ERROR:", e);
    return { error: "DB_SYNC_FAILED" }; 
  }
}


// --- 2. DELETE COURSE ACTION (الأكشن المطلوب للحذف) ---
export async function deleteCourse(id: string) {
  try {
    // حذف الكورس بناءً على الـ ID
    await sql`DELETE FROM courses WHERE id = ${id}`;
    
    // تحديث الكاش للصفحات المتأثرة
    revalidatePath('/admin');
    revalidatePath('/academy');
    
    return { success: true };
  } catch (e) {
    console.error("DELETE_ERROR:", e);
    return { error: "DELETE_SEQUENCE_ABORTED" };
  }
}

// --- 3. STUDENTS & INSTRUCTORS MODULE ---
export async function updateUserRank(userId: string, newRank: 'AGENT' | 'INSTRUCTOR' | 'ADMIN') {
  try {
    await sql`UPDATE students SET rank = ${newRank} WHERE id = ${userId}`;
    revalidatePath('/admin/users');
    return { success: true };
  } catch (e) { return { error: "RANK_UPDATE_FAILED" }; }
}

// --- 4. CERTIFICATES MODULE ---
export async function issueCertificate(studentId: string, courseId: string, code: string) {
  try {
    await sql`
      INSERT INTO certificates (student_id, course_id, certificate_code, issued_at)
      VALUES (${studentId}, ${courseId}, ${code}, NOW())
    `;
    revalidatePath('/admin/certificates');
    return { success: true };
  } catch (e) { return { error: "CERTIFICATE_ISSUE_FAILED" }; }
}