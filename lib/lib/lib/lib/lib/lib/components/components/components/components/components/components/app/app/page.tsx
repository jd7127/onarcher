'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import ArchiChat from '@/components/ArchiChat';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [userType, setUserType] = useState<'broker' | 'customer'>('customer');

  const handleStart = (type: 'broker' | 'customer') => {
    setUserType(type);
    setStarted(true);
  };

  if (!started) {
    return <LandingPage onStart={handleStart} />;
  }

  return <ArchiChat userType={userType} />;
}
