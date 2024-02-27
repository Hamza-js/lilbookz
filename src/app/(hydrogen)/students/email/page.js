'use client';

import PageHeader from '@/app/shared/page-header';
import StudentEmail from './StudentEmail';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const pageHeader = {
  title: 'Email Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Email',
    },
  ],
};

function StudentEmails() {
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
      <StudentEmail />;
    </div>
  );
}

export default StudentEmails;