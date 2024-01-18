'use client';

import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/text';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import { useFilterControls } from '@/hooks/use-filter-control';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { ActionIcon } from '@/components/ui/action-icon';
import { initialState } from './filter-utils';
import ParkingFilter from './genre-filter';
import { PiXBold } from 'react-icons/pi';
import hasSearchedParams from '@/utils/has-searched-params';
import ClassTypeFilter from './classType-filter';
import ClassesFilter from './classes-filter';

export default function FilterDrawerView() {
  const { state, reset, applyFilter, clearFilter } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  const isWide = useMedia('(min-width: 1537px)', false);
  const { closeDrawer } = useDrawer();

  return (
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

      <SimpleBar className="-mx-5 min-h-[calc(100%-10rem)]">
        <div className="space-y-9 px-5">
          <ParkingFilter state={state} applyFilter={applyFilter} />
        </div>

        <div className="space-y-9 px-5">
          <ClassTypeFilter state={state} applyFilter={applyFilter} />
        </div>

        <div className="space-y-9 px-5">
          <ClassesFilter state={state} applyFilter={applyFilter} />
        </div>
      </SimpleBar>

      <div className="sticky bottom-0 flex items-center justify-center gap-3 bg-white pb-3 pt-5 dark:bg-gray-50">
        {hasSearchedParams() ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              reset();
              closeDrawer();
            }}
            className="flex-shrink-0"
          >
            Reset All
          </Button>
        ) : null}
        <Button size="lg" className="w-full" onClick={() => closeDrawer()}>
          Show results
        </Button>
      </div>
    </div>
  );
}
