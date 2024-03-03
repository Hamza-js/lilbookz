import { PiSliders, PiXBold } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/text';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon } from '@/components/ui/action-icon';
import ClassesFilter from './ClassesFilter';

export default function StudentsFilters({
  className,
  classes,
  onFiltersChange,
  studentsToDisplay,
  filtersApplied,
  setFiltersApplied,
}) {
  const { openDrawer, closeDrawer } = useDrawer();

  const handleClassFilterChange = (value) => {
    closeDrawer();
    onFiltersChange((prevFilters) => ({
      ...prevFilters,
      class: value,
    }));
    setFiltersApplied(true);
  };

  const handleResetFilters = () => {
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
        <p>Filter students by class</p>
      </div>
      <div>
        {filtersApplied && ( // Show reset filter button only when filters are applied
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
              view: (
                <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
                  <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
                    <Title as="h5" className="font-semibold">
                      Filters by class
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

                  <ClassesFilter
                    classes={classes}
                    onFilterChange={handleClassFilterChange}
                  />
                </div>
              ),
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
