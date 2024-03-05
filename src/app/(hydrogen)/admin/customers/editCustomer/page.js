'use client';

import PageHeader from '@/app/shared/page-header';
import CustomerForm from './customerForm';
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
      name: 'Edit Customer',
    },
  ],
};

function EditCus() {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    const customer = localStorage.getItem('cus');
    const parsedCustomer = customer ? JSON.parse(customer) : null;

    if (!parsedToken) {
      redirect('/auth/sign-in');
    }

    setCustomerData(parsedCustomer);
  }, []);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CustomerForm customerData={customerData} />
    </div>
  );
}

export default EditCus;
