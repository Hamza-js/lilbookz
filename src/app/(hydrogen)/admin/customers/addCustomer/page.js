'use client';

import PageHeader from '@/app/shared/page-header';
import CustomerForm from './customerForm';
import { useEffect } from 'react';
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
      name: 'Add Customer',
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

      <CustomerForm />
    </div>
  );
}

export default AddShows;
