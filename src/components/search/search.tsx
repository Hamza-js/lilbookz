'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import SearchTrigger from '@/components/search/search-trigger';
import SearchList from '@/components/search/search-list';
import { useQuery } from '@tanstack/react-query';
import { fetchAllStudents } from '@/app/(hydrogen)/students/current/queries';

export default function SearchWidget({
  className,
  icon,
}: {
  className?: string;
  icon?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const pathname = usePathname();
  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  const {
    isLoading: isLoading4,
    error: error4,
    data: allStudents,
    isFetching: isFetching4,
  } = useQuery({
    queryKey: ['fetchAllStudents'],
    queryFn: fetchAllStudents,
  });

  return (
    <>
      <SearchTrigger
        icon={icon}
        className={className}
        onClick={() => setOpen(true)}
      />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
      >
        {!isFetching4 && (
          <SearchList
            allStudents={allStudents}
            onClose={() => setOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}
