import { Select } from '@/components/ui/select';
import { useEffect, useState } from 'react';

export default function ClassTypeFilter({
  classTypes,
  onFilterChange,
  selectedGenre,
}: any) {
  const [filteredClassTypes, setFilteredClassTypes] = useState([]);

  useEffect(() => {
    if (selectedGenre) {
      console.log('Selected Genre', selectedGenre);
      const filteredTypes = classTypes.filter(
        (type: any) => type.genre === selectedGenre
      );
      setFilteredClassTypes(
        filteredTypes.map((type: any) => ({
          label: type.name,
          value: type.id,
        }))
      );
    } else {
      setFilteredClassTypes(
        classTypes.map((type: any) => ({
          label: type.name,
          value: type.id,
        }))
      );
    }
  }, [selectedGenre, classTypes]);

  return (
    <div className="">
      <Select
        selectClassName="w-full"
        label="Select a Class Type"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 space-y-3 font-lexend"
        placeholder="Class Types"
        options={filteredClassTypes}
        onChange={(value: string) => {
          onFilterChange({ filterType: 'classType', value });
        }}
        inPortal={false}
      />
    </div>
  );
}
