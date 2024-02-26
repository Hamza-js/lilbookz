'use client';

import PageHeader from '@/app/shared/page-header';
import ListCanceledStudents from './ListCanceledStudents';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { fetchAllCancelledStudents } from './queries';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Cancelled Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Cancelled',
    },
  ],
};

function StudentCancelled() {
  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }
  }, []);

  const {
    isLoading: isLoading,
    error: error,
    data: allCancelledStudents,
    isFetching: isFetching,
  } = useQuery({
    queryKey: ['fetchAllStudents'],
    queryFn: fetchAllCancelledStudents,
  });

  // if (allCancelledStudents) {
  //   console.log('allCancelledStudents:', allCancelledStudents);
  // }

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isLoading ? (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      ) : (
        <ListCanceledStudents allCancelledStudents={allCancelledStudents} />
      )}
    </div>
  );
}

export default StudentCancelled;
