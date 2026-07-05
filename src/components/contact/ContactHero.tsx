"use client";

import { Mail } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';

export default function TacticalContactHero() {
  return (
    <PageHero
      icon={Mail}
      eyebrow="Get in touch"
      title="Contact"
      highlight="Us"
      description={`"We're here to answer your inquiries and provide professional support."`}
    />
  );
}
