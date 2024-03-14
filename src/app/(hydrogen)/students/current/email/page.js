'use client';

import PageHeader from '@/app/shared/page-header';
const StudentEmail = dynamic(() => import('./StudentEmail'), { ssr: false });
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const pageHeader = {
  title: 'Email Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Current',
    },
    {
      name: 'Email',
    },
  ],
};

function StudentEmails() {
  const [stuId, setStuId] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('tokenLilBookz');
      const stu_id = localStorage.getItem('stu_id');
      const parsedToken = JSON.parse(storedToken);
      if (!parsedToken) {
        redirect('/auth/sign-in');
      }
      setStuId(stu_id);
    }
  }, [stuId]);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StudentEmail stuId={stuId} />;
    </div>
  );
}

export default StudentEmails;
