import { PiSliders, PiXBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/text';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon } from '@/components/ui/action-icon';
import ClassTypeFilter from './classType-filter';
import ClassesFilter from './classes-filter';
import GenreFilter from './genre-filter';
import { useState } from 'react';

export default function StudentsFilters({
  className,
  classGenres,
  classTypes,
  classes,
  onFiltersChange,
  studentsToDisplay,
  filtersApplied,
  setFiltersApplied,
}: any) {
  const { openDrawer, closeDrawer } = useDrawer();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const generateDrawerContent = () => (
    <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
      <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
        <Title as="h5" className="font-semibold">
          More Filters
        </Title>
        <ActionIcon
          size="sm"
          rounded="full"
          variant="text"
          onClick={() => closeDrawer()}
        >
          <PiXBold className="h-4 w-4" />
        </ActionIcon>
      </div>

      <div className="mb-5 px-5">
        <GenreFilter
          classGenres={classGenres}
          onFilterChange={handleGenreFilterChange}
        />
      </div>

      <div className="mb-5 px-5">
        <ClassTypeFilter
          classTypes={classTypes}
          onFilterChange={handleClassTypeFilterChange}
          selectedGenre={selectedGenre}
        />
      </div>

      <div className="mb-5 px-5">
        <ClassesFilter
          classes={classes}
          onFilterChange={handleClassFilterChange}
          selectedType={selectedType}
        />
      </div>
    </div>
  );

  const handleGenreFilterChange = (value: any) => {
    setSelectedGenre(value.value.value);
    onFiltersChange((prevFilters: any) => ({
      ...prevFilters,
      classGenre: value,
    }));
    setFiltersApplied(true);
    // closeDrawer();
  };

  const handleClassTypeFilterChange = (value: any) => {
    setSelectedType(value.value.value);
    onFiltersChange((prevFilters: any) => ({
      ...prevFilters,
      classType: value,
    }));
    setFiltersApplied(true);
    // closeDrawer();
  };

  const handleClassFilterChange = (value: any) => {
    closeDrawer();
    onFiltersChange((prevFilters: any) => ({
      ...prevFilters,
      class: value,
    }));
    setFiltersApplied(true);
  };

  const handleResetFilters = () => {
    setSelectedGenre('');
    setSelectedType('');
    setFiltersApplied(false);
    onFiltersChange({
      classGenre: '',
      classType: '',
      class: '',
    });
    setFiltersApplied(false);
  };

  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <div className="relative flex flex-grow items-center gap-3">
        <h3>{studentsToDisplay.length} Students</h3>
      </div>
      <div>
        {filtersApplied && (
          <Button
            variant="outline"
            className="mr-4 flex-shrink-0 p-1 px-3"
            onClick={handleResetFilters}
          >
            Reset Filter
          </Button>
        )}
        <Button
          type="button"
          className="flex-shrink-0"
          onClick={() =>
            openDrawer({
              view: generateDrawerContent(),
              placement: 'right',
            })
          }
        >
          <PiSliders className="me-2 h-4 w-4 rotate-90" />
          Filters
        </Button>
      </div>
    </div>
  );
}
