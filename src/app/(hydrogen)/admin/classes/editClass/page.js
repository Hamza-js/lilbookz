'use client';

import PageHeader from '@/app/shared/page-header';
import ClassForm from './classForm';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {
  fetchClassGenres,
  fetchClassTypes,
} from '../../../students/current/queries';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Classes',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Classes',
    },
    {
      name: 'Add class',
    },
  ],
};

function EditClass() {
  const [classData, setClassData] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    const singleClass = localStorage.getItem('class');
    const parsedClass = singleClass ? JSON.parse(singleClass) : null;
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }

    setClassData(parsedClass);

  }, []);

  const {
    isLoading: isLoading1,
    error: error1,
    data: classGenres,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getClassGenres'],
    queryFn: fetchClassGenres,
  });

  const {
    isLoading: isLoading2,
    error: error2,
    data: classTypes,
    isFetching: isFetching2,
  } = useQuery({
    queryKey: ['fetchClassTypes'],
    queryFn: fetchClassTypes,
  });

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading1 || isLoading2 || isFetching1 || isFetching2) && (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      )}
      {!isLoading1 && !isLoading2 && !isFetching1 && !isFetching2 && (
        <>
          <ClassForm classGenres={classGenres} classTypes={classTypes} classData={classData}/>
        </>
      )}
    </div>
  );
}

export default EditClass;
