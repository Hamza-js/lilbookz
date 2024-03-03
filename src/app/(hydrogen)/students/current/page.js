'use client';

import PageHeader from '@/app/shared/page-header';
import StudentsFilters from '@/app/shared/students/student-filters';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {
  fetchClassGenres,
  fetchAllStudents,
  fetchClassTypes,
  fetchClasses,
} from './queries';
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
      name: 'Current',
    },
  ],
};

function StudentCurrent() {
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

  let studentsToDisplay = [];
  if (selectedFilters?.class) {
    studentsToDisplay = allStudents?.filter(
      (student) => student?.classid === selectedFilters?.class?.value
    );
  } else {
    studentsToDisplay = allStudents;
  }

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {(isLoading1 ||
        isLoading2 ||
        isLoading3 ||
        isLoading4 ||
        isFetching1 ||
        isFetching2 ||
        isFetching3 ||
        isFetching4) && (
        <div className="flex h-10 items-center justify-center">
          <Loader size="xl" />
        </div>
      )}
      {!isLoading1 &&
        !isLoading2 &&
        !isLoading3 &&
        !isLoading4 &&
        !isFetching1 &&
        !isFetching2 &&
        !isFetching3 &&
        !isFetching4 && (
          <>
            <StudentsFilters
              className="mb-6"
              classGenres={classGenres}
              classTypes={classTypes}
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

export default StudentCurrent;
