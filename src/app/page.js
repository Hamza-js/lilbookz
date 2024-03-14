'use client';

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import Spinner from '@/components/ui/spinner';

const Pagedfd = () => {
  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    } else {
      redirect('/students/current');
    }
  }, []);
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Pagedfd;
