'use client';

import PageHeader from '@/app/shared/page-header';
import ListCostumersInvoices from './ListCostumersInvoices';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getCustomersInvoices } from './queries';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';

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
      name: 'Invoices',
    },
  ],
};

function Invoices() {
  const [customersInvoicesData, setcustomesrInvoicesData] = useState([]);
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
  }, [cusCompanyName, cusId]);

  const {
    isLoading: isLoading1,
    error: error1,
    data: invoices,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getCustomersInvoices'],
    queryFn: getCustomersInvoices,
  });

  useEffect(() => {
    if (!isLoading1 && invoices) {
      setcustomesrInvoicesData(invoices);
    }
  }, [isLoading1, invoices]);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isLoading1 && (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      )}
      {!isLoading1 && (
        <>
          <ListCostumersInvoices
          cusCompanyName={cusCompanyName}
            customersInvoicesData={customersInvoicesData}
            setcustomesrInvoicesData={setcustomesrInvoicesData}
          />
        </>
      )}
    </div>
  );
}

export default Invoices;
