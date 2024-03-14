'use client';

import PageHeader from '@/app/shared/page-header';
import InvoiceForm from './InvoiceForm';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const pageHeader = {
  title: 'Customers',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Current',
    },
    {
      name: 'Send invoice',
    },
  ],
};

function SendInvoice() {
  const [cusId, setCusId] = useState('');
  const [cusCompanyName, setCompanyName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const stu_id = localStorage.getItem('stu_id');
    const stu_name = localStorage.getItem('stu_name');

    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }

    setCusId(stu_id);
    setCompanyName(stu_name);
  }, [cusCompanyName]);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <InvoiceForm cusId={cusId} cusCompanyName={cusCompanyName} />
    </div>
  );
}

export default SendInvoice;
