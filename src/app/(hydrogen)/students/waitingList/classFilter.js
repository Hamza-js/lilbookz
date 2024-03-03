import React from 'react';
import { Select } from '@/components/ui/select';

export default function ClassesFilter({ classes, onFilterChange }) {
  let formattedClasses = [];

  formattedClasses = classes.map((type) => ({
    label: `${type?.day} @ ${type?.time} - ${type?.bulding_no}, ${type?.street}`,
    value: type?.id,
  }));

  return (
    <div className="">
      <Select
        selectClassName="w-full"
        label="Select a Class"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 font-lexend"
        placeholder="Classes"
        options={formattedClasses}
        onChange={(value) => {
          onFilterChange(value);
        }}
        inPortal={false}
      />
    </div>
  );
}
