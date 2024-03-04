'use client';

import PageHeader from '@/app/shared/page-header';
import ListClasses from './ListClasses';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { getFranchiseClasses, getClasses } from './queries';
import { fetchClassTypes } from '../../students/current/queries';
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
  ],
};

function Classes() {
  const [mergedData, setMergedData] = useState([]);
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
    data: getClassesData,
    isFetching: isFetching1,
  } = useQuery({
    queryKey: ['getClasses'],
    queryFn: getClasses,
  });

  const {
    isLoading: isLoading,
    error: error,
    data: franchiseClassesData,
    isFetching: isFetching,
  } = useQuery({
    queryKey: ['getFranchiseClasses'],
    queryFn: getFranchiseClasses,
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

  useEffect(() => {
    if (!isLoading1 && !isLoading && !isLoading2) {
      const mergedDataWithTypes = franchiseClassesData.result.map((fc) => {
        const classType = classTypes.find((ct) => ct.id === fc.classtype);

        const dates = franchiseClassesData.dates.filter(
          (d) => d.classid === fc.id
        );

        const mergedFcData = {
          ...fc,
          dates: dates,
          type: classType,
        };

        return mergedFcData;
      });
      setMergedData(mergedDataWithTypes);

      // console.log('mergedDataWithTypes', mergedDataWithTypes);
    }
  }, [franchiseClassesData, isLoading1, isLoading2, isLoading, classTypes]);

  // console.log('mergedData', mergedData);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isLoading1 && isLoading && isLoading2 && (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      )}
      {!isLoading1 && !isLoading && !isLoading2 && (
        <>
          <ListClasses mergedData={mergedData} setMergedData={setMergedData} />
        </>
      )}
    </div>
  );
}

export default Classes;
