"use client";
import { useActionState } from 'react';
import { registerStudent } from '@/actions/portal-auth';
import RegisterFormView from './RegisterFormView';

export function RegisterFormWrapper({ callbackUrl }: { callbackUrl: string }) {
  // ملحوظة: registerStudent بينفذ redirect() بنفسه عند النجاح (Server-side)،
  // فمفيش أبدًا state.success يوصل هنا — الـ state دايمًا إما null أو { error }
  const [state, formAction, isPending] = useActionState(registerStudent, null);

  return (
    <RegisterFormView 
      formAction={formAction} 
      isPending={isPending} 
      state={state} 
      callbackUrl={callbackUrl} 
    />
  );
}