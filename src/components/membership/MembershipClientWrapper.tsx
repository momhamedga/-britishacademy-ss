"use client";

import { useState } from 'react';
import PlansHero from './MembershipHero';
import PricingSection from './MembershipCore';


export default function MembershipClientWrapper() {
  // الحالة المركزية اللي بتتحكم في الكومبوننتس
  const [planType, setPlanType] = useState<'Corporate' | 'Individual'>('Individual');

  return (
    <>
      <PlansHero activeType={planType} setType={setPlanType} />
      <PricingSection activeType={planType} />
    </>
  );
}