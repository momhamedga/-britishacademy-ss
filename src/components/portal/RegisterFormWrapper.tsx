"use client";
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerStudent } from '@/actions/portal-auth';
import RegisterFormView from './RegisterFormView';

export function RegisterFormWrapper({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, isPending] = useActionState(registerStudent, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.refresh(); 
      setTimeout(() => router.push(callbackUrl), 1500);
    }
  }, [state, callbackUrl, router]);

  return (
    <RegisterFormView 
      formAction={formAction} 
      isPending={isPending} 
      state={state} 
      callbackUrl={callbackUrl} 
    />
  );
}