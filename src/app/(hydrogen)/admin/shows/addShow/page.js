'use client';

import PageHeader from '@/app/shared/page-header';
import ShowForm from './showForm';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {
  fetchClassGenres,
  fetchClassTypes,
} from '../../../students/current/queries';
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
    {
      name: 'Add teacher',
    },
  ],
};

function Classes() {
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
          <ShowForm classGenres={classGenres} classTypes={classTypes} />
        </>
      )}
    </div>
  );
}

export default Classes;
