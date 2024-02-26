import React from 'react';
import { Select } from 'rizzui';

export default function ClassesFilter({ classes, onFilterChange }) {
  let formattedClasses = [];

  formattedClasses = classes.map((type) => ({
    label: `${type.day} @ ${type.time}, ${type.street}`,
    value: type.id,
  }));

  return (
    <div className="">
      <Select
        selectClassName="w-full"
        label="Select a Class"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 font-lexend"
        placeholder="Classes"
        options={formattedClasses}
        // value={value}
        onChange={(value) => {
          onFilterChange(value);
        }}
        inPortal={false}
      />
    </div>
  );
}
