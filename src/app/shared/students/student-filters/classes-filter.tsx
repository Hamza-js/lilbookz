import React from 'react';
import { Select } from '@/components/ui/select';

export default function ClassesFilter({
  classes,
  onFilterChange,
  selectedType,
}: any) {
  let formattedClasses = [];
  // console.log('selectedType', selectedType);

  if (selectedType !== '') {
    const filteredClasses = classes.filter((type: any) => {
      // console.log('type', type);
      return type.classtype == selectedType;
    });
    // console.log('filteredClasses if', filteredClasses);

    formattedClasses = filteredClasses.map((type: any) => ({
      label: `${type?.day} @ ${type?.time} - ${type?.bulding_no}, ${type?.street}`,
      value: type.id,
    }));

    // console.log('formattedClasses if', formattedClasses);
  } else {
    formattedClasses = classes.map((type: any) => ({
      label: `${type.day} @ ${type.time}, ${type.street}`,
      value: type.id,
    }));
    // console.log('formattedClasses else', formattedClasses);
  }

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
