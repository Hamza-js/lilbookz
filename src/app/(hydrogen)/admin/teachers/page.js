'use client';

import PageHeader from '@/app/shared/page-header';
import ListTeachers from './ListTeachers';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getTeachers } from './queries';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Teachers',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Teachers',
    },
  ],
};

function Teachers() {
  const [teachersData, setTeachersData] = useState([]);

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
    data: teachers,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getTeachers'],
    queryFn: getTeachers,
  });

  useEffect(() => {
    if (!isLoading1 && teachers) {
      setTeachersData(teachers);
    }
  }, [isLoading1, teachers]);

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
          <ListTeachers teachers={teachersData} setTeachersData={setTeachersData}/>
        </>
      )}
    </div>
  );
}

export default Teachers;
