'use client';

import PageHeader from '@/app/shared/page-header';
import ListCostumers from './ListCostumers';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getCustomers } from './queries';
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
  ],
};

function Costumers() {
  const [customersData, setcustomesrData] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }
  }, []);

  const {
    isLoading: isLoading1,
    error: error1,
    data: customers,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getCustomers'],
    queryFn: getCustomers,
  });

  useEffect(() => {
    if (!isLoading1 && customers) {
      setcustomesrData(customers);
    }
  }, [isLoading1, customers]);

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
          <ListCostumers
            customersData={customersData}
            setcustomesrData={setcustomesrData}
          />
        </>
      )}
    </div>
  );
}

export default Costumers;
