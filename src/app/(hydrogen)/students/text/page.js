'use client';

import PageHeader from '@/app/shared/page-header';
import StudentText from './StudenText';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const pageHeader = {
  title: 'Text Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Text',
    },
  ],
};

function StudentTextPage() {
  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }
  }, []);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StudentText />;
    </div>
  );
}

export default StudentTextPage;
