'use client';

import PageHeader from '@/app/shared/page-header';
import ShowForm from './showForm';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

const pageHeader = {
  title: 'Shows',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Shows',
    },
    {
      name: 'Add Show',
    },
  ],
};

function AddShows() {
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

      <ShowForm />
    </div>
  );
}

export default AddShows;
