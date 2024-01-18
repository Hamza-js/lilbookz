import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import StudentsFilters from '@/app/shared/students/student-filters';
import { metaObject } from '@/config/site.config';
import TextNote from './text-note';

export const metadata = {
  ...metaObject('Students'),
};

const pageHeader = {
  title: 'Text Students',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      // href: routes.searchAndFilter.realEstate,
      name: 'Text',
    },
  ],
};

function StudentTexts() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TextNote />;
    </div>
  );
}

export default StudentTexts;
