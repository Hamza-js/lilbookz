'use client';

import PageHeader from '@/app/shared/page-header';
import ListShows from './ListShows';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getShows } from './queries';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Shows',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Shows',
    },
  ],
};

function Shows() {
  const [showsData, setshowsData] = useState([]);

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
    data: shows,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getShows'],
    queryFn: getShows,
  });

  useEffect(() => {
    if (!isLoading1 && shows) {
      setshowsData(shows);
    }
  }, [isLoading1, shows]);

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
          <ListShows showsData={showsData} setshowsData={setshowsData} />
        </>
      )}
    </div>
  );
}

export default Shows;
