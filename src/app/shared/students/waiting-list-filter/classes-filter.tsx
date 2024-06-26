import { useEffect, useState } from 'react';
import { Select } from '@/components/ui/select';
import { InitialStateType, classesData } from './filter-utils';

export default function ClassesFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [selected, setSelected] = useState('any');

  useEffect(() => {
    if (state.parking_spots) setSelected(state.parking_spots);
  }, [state.parking_spots]);

  return (
    <div className="space-y-3">
      <Select
        selectClassName="w-full"
        label="Please select a Class"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 mb-1 font-lexend"
        placeholder="No min"
        options={classesData}
        value={selected}
        onChange={(value: string) => {
          setSelected(value);
          applyFilter('parking_spots', value);
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected) =>
          classesData?.find((prk) => prk.value === selected)?.label ?? ''
        }
        inPortal={false}
      />
    </div>
  );
}
