'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import { TbUsersGroup } from 'react-icons/tb';
import { LuUser } from 'react-icons/lu';
import { MdOutlineAccountBalanceWallet, MdHelpOutline } from 'react-icons/md';
import { IoDocumentsOutline } from 'react-icons/io5';

const getUserData = () => {
  if (typeof window !== 'undefined') {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  }
  return null;
};

const MenuItems = () => {
  const [userData, setUserData] = useState<any>(getUserData());

  useEffect(() => {
    if (!userData) {
      setUserData(getUserData());
    }
  }, [userData]);

  if (!userData) {
    // Handle case where userData is not available (e.g., return null or a loading state)
    return null;
  }

  return [
    {
      name: 'Overview',
    },
    // label end
    {
      name: 'Students',
      href: '#',
      icon: <TbUsersGroup />,
      dropdownItems: [
        {
          name: 'Current',
          href: routes.students.current,
          badge: '',
          disabled: true,
        },
        {
          name: 'Email',
          href:
            userData.sms == '1' ? routes.students.email : routes.accessDenied,
          disabled: true,
        },
        {
          name: 'Text (SMS)',
          href:
            userData.sms == '1' ? routes.students.text : routes.accessDenied,
          disabled: true,
        },
        {
          name: 'Cancelled',
          href: routes.students.cancelled,
          disabled: true,
        },
        {
          name: 'Waiting List',
          href: routes.students.waitingList,
          disabled: true,
        },
      ],
    },
    {
      name: 'Admin',
      href: '#',
      icon: <IoDocumentsOutline />,
      dropdownItems: [
        {
          name: 'Classes',
          href: routes.admin.classes,
          disabled: true,
        },
        {
          name: 'Teachers',
          href: routes.admin.teachers,
          disabled: true,
        },
        {
          name: 'Shows',
          href: routes.admin.shows,
          disabled: true,
        },
        {
          name: 'Customers',
          href: routes.admin.customers,
          disabled: true,
        },
      ],
    },
    {
      name: 'Accounts',
      href: '#',
      icon: <MdOutlineAccountBalanceWallet />,
      dropdownItems: [
        {
          name: 'Invoicing',
          href: routes.accounts.invoicing,
          disabled: true,
        },
      ],
    },
    {
      name: 'Documents',
      href: '#',
      icon: <MdOutlineAccountBalanceWallet />,
      dropdownItems: [
        {
          name: 'General',
          href: routes.documents.General,
          disabled: true,
        },
        {
          name: 'Ballet',
          href: routes.documents.Ballet,
          disabled: userData.ballet_dance === '1',
        },
        {
          name: 'Music & MOVE IT!',
          href: routes.documents['Music & MOVE IT!'],
          disabled: userData.music_movement === '1',
        },
        {
          name: 'Street/Hip Hop',
          href: routes.documents['Street/Hip Hop'],
          disabled: userData.street_dance === '1',
        },
        {
          name: 'Tap',
          href: routes.documents.Tap,
          disabled: userData.tap_dance === '1',
        },
      ],
    },
    {
      name: 'Social/Print',
      href: '#',
      icon: <MdOutlineAccountBalanceWallet />,
      dropdownItems: [
        {
          name: 'General',
          href: routes.socials.General,
          disabled: true,
        },
        {
          name: 'Ballet & Tap',
          href: routes.socials['Ballet & Tap'],
          disabled: userData.ballet_dance === '1',
        },
        {
          name: 'Music & MOVE IT!',
          href: routes.socials['Music & MOVE IT!'],
          disabled: userData?.music_movement === '1',
        },
        {
          name: 'Street/Hip Hop',
          href: routes.socials['Street/Hip Hop'],
          disabled: userData?.street_dance === '1',
        },
      ],
    },
    {
      name: 'Support',
      href: routes.supportt,
      icon: <MdHelpOutline />,
    },
  ];
};

export default MenuItems;
