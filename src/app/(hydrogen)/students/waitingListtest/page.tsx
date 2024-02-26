'use client';

import PageHeader from '@/app/shared/page-header';
import ClassesFilter from '@/app/shared/students/waiting-list-filter/classes-filter';
import { initialState } from '@/app/shared/students/waiting-list-filter/filter-utils';
import { metaObject } from '@/config/site.config';
import { useFilterControls } from '@/hooks/use-filter-control';

// export const metadata = {
//   ...metaObject('Students Waiting List'),
// };

const pageHeader = {
  title: 'Students Waiting List',
  breadcrumb: [
    {
      name: 'Students',
    },
    {
      // href: routes.searchAndFilter.realEstate,
      name: 'Waiting List',
    },
  ],
};

function StudentWaitingList() {
  const { state, reset, applyFilter, clearFilter } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  return (
    <div className="@container">
      <div className="space-y-9 px-5">
        <ClassesFilter state={state} applyFilter={applyFilter} />
      </div>
    </div>
  );
}

export default StudentWaitingList;
