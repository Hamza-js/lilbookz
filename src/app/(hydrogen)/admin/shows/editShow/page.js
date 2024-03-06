'use client';

import PageHeader from '@/app/shared/page-header';
import ShowEditForm from './showEditForm';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const pageHeader = {
  title: 'Customers',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Customers',
    },
    {
      name: 'Edit Show',
    },
  ],
};

function EditShow() {
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    const show = localStorage.getItem('show');
    const parsedShow = show ? JSON.parse(show) : null;

    if (!parsedToken) {
      redirect('/auth/sign-in');
    }

    setShowData(parsedShow);
  }, []);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <ShowEditForm showData={showData} />
    </div>
  );
}

export default EditShow;
