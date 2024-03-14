'use client';

import PageHeader from '@/app/shared/page-header';
import ListCostumersInvoices from './ListCostumersInvoices';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getInvoicesData } from './queries';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Current',
    },
    {
      name: 'Invoices',
    },
  ],
};

function Invoices() {
  const [customersInvoicesData, setcustomesrInvoicesData] = useState([]);
  const [stuId, setStuId] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const stu_id = localStorage.getItem('stu_id');
    const parsedToken = JSON.parse(storedToken);

    if (!parsedToken) {
      redirect('/auth/sign-in');
    }
    setStuId(stu_id);
  }, [stuId]);

  const {
    isLoading: isLoading1,
    error: error1,
    data: invoices,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getInvoicesData'],
    queryFn: getInvoicesData,
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
            customersInvoicesData={customersInvoicesData}
            setcustomesrInvoicesData={setcustomesrInvoicesData}
          />
        </>
      )}
    </div>
  );
}

export default Invoices;
