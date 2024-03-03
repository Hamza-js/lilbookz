'use client';

import PageHeader from '@/app/shared/page-header';
import StudentsFilters from './filterIndex';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { fetchAllWaitingStudents } from './queries';
import { fetchClasses } from '../current/queries';
import { useQuery } from '@tanstack/react-query';
import StudentList from './StudentList';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      name: 'Waiting',
    },
  ],
};

function WaitingList() {
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    classGenre: '',
    classType: '',
    class: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('tokenLilBookz');
    const parsedToken = JSON.parse(storedToken);
    if (!parsedToken) {
      redirect('/auth/sign-in');
    }
  }, []);

  const {
    isLoading: isLoading2,
    error: error2,
    data: allStudents,
    isFetching: isFetching2,
  } = useQuery({
    queryKey: ['fetchAllWaitingStudents'],
    queryFn: fetchAllWaitingStudents,
  });

  const {
    isLoading: isLoading4,
    error: error4,
    data: classes,
    isFetching: isFetching4,
  } = useQuery({
    queryKey: ['fetchClasses'],
    queryFn: fetchClasses,
  });

  let studentsToDisplay = [];
  if (selectedFilters?.class) {
    studentsToDisplay = allStudents?.filter(
      (student) => student?.class_venue === selectedFilters?.class?.value
    );
  } else {
    studentsToDisplay = allStudents;
  }

  // console.log('filtersApplied', filtersApplied);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {isLoading2 || isLoading4 ? (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      ) : (
        <>
          <StudentsFilters
            className="mb-6"
            classes={classes}
            onFiltersChange={setSelectedFilters}
            studentsToDisplay={studentsToDisplay}
            setFiltersApplied={setFiltersApplied}
            filtersApplied={filtersApplied}
          />
          <StudentList
            studentsToDisplay={studentsToDisplay}
            filtersApplied={filtersApplied}
          />
        </>
      )}
    </div>
  );
}

export default WaitingList;
