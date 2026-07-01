"use server"
import { sql } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export async function upsertCourse(formData: FormData) {
  const id = formData.get('id') as string;
  let imageUrl = formData.get('image_url') as string;
  const imageFile = formData.get('image_file') as File;
  
  let certificateTemplateUrl = formData.get('certificate_template_url') as string;
  const certificateFile = formData.get('certificate_file') as File;

  const lessonsDataRaw = formData.get('lessons_json') as string;
  const lessonsList = lessonsDataRaw ? JSON.parse(lessonsDataRaw) : [];

  if (imageFile && imageFile.size > 0) {
    try {
      const blob = await put(`course-assets/${Date.now()}-${imageFile.name}`, imageFile, { access: 'public' });
      imageUrl = blob.url;
    } catch (e) { console.error(e); }
  }

  if (certificateFile && certificateFile.size > 0) {
    try {
      const certBlob = await put(`certificate-templates/${Date.now()}-${certificateFile.name}`, certificateFile, { access: 'public' });
      certificateTemplateUrl = certBlob.url;
    } catch (e) { console.error(e); }
  }

  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    duration: formData.get('duration'),
    level: formData.get('level'),
    instructor_name: formData.get('instructor_name'),
    price: parseFloat(formData.get('price') as string) || 0,
    image_url: imageUrl || '/logo.webp',
    certificate_template_url: certificateTemplateUrl || null,
    is_sia: formData.get('is_sia') === 'on' || formData.get('is_sia') === 'true',
    full_content: formData.get('full_content'),
  };

  try {
    let targetCourseId = id;

    if (id) {
      await sql`
        UPDATE courses SET 
          title=${data.title}, slug=${data.slug}, category=${data.category}, duration=${data.duration}, level=${data.level}, 
          instructor_name=${data.instructor_name}, price=${data.price}, image_url=${data.image_url}, 
          certificate_template_url=${data.certificate_template_url}, is_sia_accredited=${data.is_sia}, full_content=${data.full_content} 
        WHERE id::text = ${id}
      `;

      if (data.certificate_template_url) {
        await sql`UPDATE public.certificates SET certificate_url = ${data.certificate_template_url} WHERE course_id::text = ${id}`;
      }
    } else {
      const inserted = await sql`
        INSERT INTO courses (title, slug, category, duration, level, instructor_name, price, image_url, certificate_template_url, is_sia_accredited, full_content) 
        VALUES (${data.title}, ${data.slug}, ${data.category}, ${data.duration}, ${data.level}, ${data.instructor_name}, ${data.price}, ${data.image_url}, ${data.certificate_template_url}, ${data.is_sia}, ${data.full_content})
        RETURNING id
      `;
      targetCourseId = inserted[0].id;
    }
    
    await sql`DELETE FROM public.lessons WHERE course_id::text = ${targetCourseId}`;
    
    if (lessonsList.length > 0) {
      for (const lesson of lessonsList) {
        await sql`
          INSERT INTO public.lessons (course_id, title, description, video_url, duration)
          VALUES (${targetCourseId}::uuid, ${lesson.title}, ${lesson.description || null}, ${lesson.video_url || null}, ${lesson.duration || '15 mins'})
        `;
      }
    }
    
    revalidatePath('/admin/courses');
    revalidatePath('/dashboard/certificates');
    revalidatePath('/academy'); 
    return { success: true };
  } catch (e) { 
    console.error(e);
    return { error: "DB_SYNC_FAILED" }; 
  }
}

export async function deleteCourse(id: string) {
  try {
    await sql`DELETE FROM courses WHERE id::text = ${id}`;
    revalidatePath('/admin');
    revalidatePath('/academy');
    revalidatePath('/dashboard/certificates');
    return { success: true };
  } catch (e) { return { error: "DELETE_FAILED" }; }
}

export async function getCourseLessonsForAdmin(courseId: string) {
  try {
    return await sql`SELECT title, description, video_url, duration FROM public.lessons WHERE course_id::text = ${courseId} ORDER BY created_at ASC`;
  } catch (e) { return []; }
}

export async function updateUserRank(userId: string, newRank: 'AGENT' | 'INSTRUCTOR' | 'ADMIN') {
  try {
    await sql`UPDATE students SET rank = ${newRank} WHERE id::text = ${userId}`;
    revalidatePath('/admin/users');
    return { success: true };
  } catch (e) { return { error: "RANK_UPDATE_FAILED" }; }
}

export async function issueCertificate(studentId: string, courseId: string, code: string) {
  try {
    await sql`INSERT INTO certificates (student_id, course_id, certificate_code, issued_at) VALUES (${studentId}::uuid, ${courseId}::uuid, ${code}, NOW())`;
    revalidatePath('/admin/certificates');
    return { success: true };
  } catch (e) { return { error: "CERTIFICATE_ISSUE_FAILED" }; }
}