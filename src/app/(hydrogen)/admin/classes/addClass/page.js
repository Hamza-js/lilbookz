'use client';

import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Classes',
  breadcrumb: [
    {
      name: 'Admin',
    },
    {
      name: 'Classes',
    },
    {
      name: 'Add class',
    },
  ],
};

function Classes() {
  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </div>
  );
}

export default Classes;
