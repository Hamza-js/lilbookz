import { Select } from '@/components/ui/select';

export default function GenreFilter({ classGenres, onFilterChange }: any) {
  const formattedClassGenres = classGenres.map((type: any) => ({
    label: `${type.name} ${type.age_range}`,
    value: type.id,
  }));

  return (
    <div className="">
      <Select
        selectClassName="w-full"
        label="Select a Class Genre"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 font-lexend"
        placeholder="Class Genres"
        options={formattedClassGenres}
        onChange={(value: string) => {
          onFilterChange({ filterType: 'classType', value });
        }}
        // getOptionValue={(option) => option.id}
        inPortal={false}
      />
    </div>
  );
}
