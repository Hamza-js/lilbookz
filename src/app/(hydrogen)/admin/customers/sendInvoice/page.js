'use client';

import PageHeader from '@/app/shared/page-header';
import InvoiceForm from './InvoiceForm';
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
      name: 'Send invoice',
    },
  ],
};

function SendInvoice() {
  const [cusId, setCusId] = useState('');
  const [cusCompanyName, setCompanyName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const cus_id = localStorage.getItem('cus_id');
    const cus_company_name = localStorage.getItem('cus_company_name');

    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }

    setCusId(cus_id);
    setCompanyName(cus_company_name);
  }, [cusCompanyName]);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <InvoiceForm cusId={cusId} cusCompanyName={cusCompanyName} />
    </div>
  );
}

export default SendInvoice;
