"use client";

import { Target } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';

export default function CertificationsHero() {
  return (
    <PageHero
      icon={Target}
      eyebrow="Certifications"
      title="Our Internationally"
      highlight="Accredited Certifications"
      description={`"Certificates recognized by leading global professional organizations"`}
    />
  );
}
