'use client';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import StudentsFilters from '@/app/shared/students/student-filters';
import { metaObject } from '@/config/site.config';
import { useAuth } from '../../../../hooks/useAuth';
import { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';

// export const metadata = {
//   ...metaObject('Students'),
// };

const pageHeader = {
  title: 'Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      // href: routes.searchAndFilter.realEstate,
      name: 'Current',
    },
  ],
};

function StudentCurrent() {
  const { isLoggedIn, accessToken } = useAuth();

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      redirect('/auth/sign-in');
    }
  }, []);

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StudentsFilters className="mb-6" />
      {/* <ProductsGrid /> */}
    </div>
  );
}

export default StudentCurrent;
