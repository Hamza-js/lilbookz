'use client';

import PageHeader from '@/app/shared/page-header';
import StudentsFilters from './StudentsFilters';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { fetchAllStudents, fetchClasses } from '../../students/current/queries';
import { useQuery } from '@tanstack/react-query';
import StudentList from './StudentList';
import { Loader } from '@/components/ui/loader';

const pageHeader = {
  title: 'Invoicing',
  breadcrumb: [
    {
      name: 'Account',
    },
    {
      name: 'Invoicing',
    },
  ],
};

function Invoicing() {
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
    isLoading: isLoading3,
    error: error3,
    data: classes,
    isFetching: isFetching3,
  } = useQuery({
    queryKey: ['fetchClasses'],
    queryFn: fetchClasses,
  });

  const {
    isLoading: isLoading4,
    error: error4,
    data: allStudents,
    isFetching: isFetching4,
  } = useQuery({
    queryKey: ['fetchAllStudents'],
    queryFn: fetchAllStudents,
  });

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
    setFiltersApplied(true);
  };
  // console.log(allStudents);

  let studentsToDisplay = [];
  if (selectedFilters?.class) {
    studentsToDisplay = allStudents?.filter((student) => {
      return (
        student?.classid === selectedFilters?.class?.value &&
        student?.trial_paid === '1' &&
        student?.membership_paid === '1' &&
        student?.setupDD === 'pending'
      );
    });
  }

  // console.log(studentsToDisplay);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading3 || isLoading4 || isFetching3 || isFetching4) && (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      )}
      {!isLoading3 && !isLoading4 && !isFetching3 && !isFetching4 && (
        <>
          <StudentsFilters
            className="mb-6"
            classes={classes}
            onFiltersChange={handleFiltersChange}
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

export default Invoicing;
