import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import StudentsFilters from '@/app/shared/students/student-filters';
import { metaObject } from '@/config/site.config';
import StudentEmail from '@/app/shared/students/email';

export const metadata = {
  ...metaObject('Students'),
};

const pageHeader = {
  title: 'Email Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      // href: routes.searchAndFilter.realEstate,
      name: 'Email',
    },
  ],
};

function StudentEmails() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <StudentEmail />;
    </div>
  );
}

export default StudentEmails;
