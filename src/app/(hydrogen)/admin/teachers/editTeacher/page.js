'use client';

import PageHeader from '@/app/shared/page-header';
import TeacherEditForm from './teacherEditForm';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const pageHeader = {
  title: 'Teachers',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Teachers',
    },
    {
      name: 'Edit Teacher',
    },
  ],
};

function EditTeacher() {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    const teacher = localStorage.getItem('teacher');
    const parsedTeacher = teacher ? JSON.parse(teacher) : null;

    if (!parsedToken) {
      redirect('/auth/sign-in');
    }

    setTeacherData(parsedTeacher);
  }, []);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <TeacherEditForm teacherData={teacherData} />
    </div>
  );
}

export default EditTeacher;
