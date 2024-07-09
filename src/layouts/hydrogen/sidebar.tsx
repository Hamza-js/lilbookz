'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from '@/components/ui/text';
import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';
import MenuItems from '@/layouts/hydrogen/menu-items';
import Logo from '@/components/logo';
import StatusBadge from '@/components/get-status-badge';

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const items = MenuItems();

  const handleSupportClick = () => {
    const emailAddress = 'support@lilbeatz.com';
    window.open(`mailto:${emailAddress}`);
  };

  const handleDocumentsClick = () => {
    const dropboxLink =
      'https://www.dropbox.com/scl/fo/2hc0egpzdas9xx3bpv20o/h?rlkey=kyyrvbjhg13ybz4mxow0t6jnp&dl=0';
    window.open(dropboxLink);
  };

  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-black 2xl:w-72 ',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-black px-6 pb-5 pt-5 2xl:px-8 2xl:pt-6">
        <Link
          href={'/students/current'}
          aria-label="Site Logo"
          className="text-black hover:text-black"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <SimpleBar className="h-[calc(100%-80px)] pb-10">
        <div className="mt-4 pb-3 3xl:mt-6">
          {// @ts-ignore
          items?.map((item, index) => {
            const isActive = pathname === (item?.href as any);
            const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
              // @ts-ignore
              (dropdownItem: any) => dropdownItem?.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

            return (
              <Fragment key={item.name + '-' + index}>
                {item?.href ? (
                  <>
                    {item?.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                              isDropdownOpen
                                ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary hover:bg-gray-100 hover:text-black 2xl:before:-start-5'
                                : 'text-white transition-colors duration-200 hover:bg-gray-100 hover:text-black dark:text-white dark:hover:text-white'
                            )}
                          >
                            <span className="flex items-center">
                              {item?.icon && (
                                <span
                                  className={cn(
                                    'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                    isDropdownOpen
                                      ? 'text-white'
                                      : 'text-white group-hover:text-black dark:text-white dark:group-hover:text-gray-700'
                                  )}
                                >
                                  {item?.icon}
                                </span>
                              )}
                              {item.name}
                            </span>

                            <PiCaretDownBold
                              strokeWidth={3}
                              className={cn(
                                'h-3.5 w-3.5 -rotate-90 text-white transition-transform duration-200 rtl:rotate-90',
                                open && 'rotate-0 rtl:rotate-0'
                              )}
                            />
                          </div>
                        )}
                      >
                        {// @ts-ignore
                        item?.dropdownItems?.map((dropdownItem, index) => {
                          const isChildActive =
                            pathname === (dropdownItem?.href as string);
                          const isDisabled =
                            // @ts-ignore
                            dropdownItem?.disabled && dropdownItem?.disabled;
                          console.log('isDisabled', isDisabled);

                          return (
                            <Link
                              href={!isDisabled ? '#' : dropdownItem?.href}
                              key={dropdownItem?.name + index}
                              className={cn(
                                'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                                isChildActive
                                  ? 'text-white'
                                  : !isDisabled
                                    ? 'cursor-not-allowed text-white line-through '
                                    : 'text-white transition-colors duration-200 hover:bg-gray-100 hover:text-black'
                              )}
                              onClick={(e) => !isDisabled && e.preventDefault()}
                            >
                              <div className="flex items-center truncate">
                                <span
                                  className={cn(
                                    'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                    isChildActive
                                      ? 'bg-primary ring-[1px] ring-primary'
                                      : 'opacity-40'
                                  )}
                                />{' '}
                                <span className="truncate">
                                  {dropdownItem?.name}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </Collapse>
                    ) : (
                      <div
                        onClick={
                          item.name === 'Support'
                            ? handleSupportClick
                            : item.name === 'Documents'
                              ? handleDocumentsClick
                              : undefined
                        }
                        className={cn(
                          'group relative mx-3 my-0.5 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                          isActive
                            ? 'before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                            : 'text-white transition-colors duration-200 hover:bg-gray-100 hover:text-black dark:text-white'
                        )}
                      >
                        <div className="flex items-center truncate">
                          {item?.icon && (
                            <span
                              className={cn(
                                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                isActive
                                  ? 'text-white'
                                  : 'text-white group-hover:text-black dark:text-white dark:group-hover:text-gray-700'
                              )}
                            >
                              {item?.icon}
                            </span>
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-white 2xl:px-8',
                      index !== 0 && 'mt-6 3xl:mt-7'
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
