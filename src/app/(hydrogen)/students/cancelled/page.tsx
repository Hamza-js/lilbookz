import PageHeader from '@/app/shared/page-header';
import StudentsFilters from '@/app/shared/students/student-filters';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Cancelled students'),
};

const pageHeader = {
  title: 'Cancelled Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      // href: routes.searchAndFilter.realEstate,
      name: 'Cancelled',
    },
  ],
};

function StudentCancelled() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </div>
  );
}

export default StudentCancelled;
