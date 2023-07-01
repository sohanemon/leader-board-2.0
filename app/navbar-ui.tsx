// @ts-nocheck
'use client';

import useStore from '@/lib/store';
import {
  Bars2Icon,
  ChevronDownIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

import { logOut } from '@/lib/firebase';
import Link from 'next/link';
// profile menu component
const profileMenuItems = [
  {
    label: 'Sign Out',
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const user = useStore((s) => s.user);
  console.log('🛑 ~ ProfileMenu ~ user:', user);

  const closeMenu = () => {
    logOut();
    setIsMenuOpen(false);
  };

  return (
    <Menu
      open={isMenuOpen}
      handler={user?.uid && setIsMenuOpen}
      placement='bottom-end'
    >
      <MenuHandler>
        {user?.uid ? (
          <Button
            variant='text'
            color='blue-gray'
            className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
          >
            <Avatar
              variant='circular'
              size='sm'
              alt='candice wu'
              className='  p-0.5'
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
            />
            <p>{user?.displayName}</p>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>
        ) : (
          <Link href={'/login'} className='ml-auto'>
            <Button className='rounded-full'>Login</Button>
          </Link>
        )}
      </MenuHandler>
      <MenuList className='p-1'>
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as='span'
                variant='small'
                className='font-normal'
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function NavbarUi() {
  return (
    <Navbar className='max-w-screen-xl p-2 mx-auto mt-2 lg:rounded-full lg:pl-6'>
      <div className='relative flex items-center mx-auto text-blue-gray-900'>
        <Link href='/' className='mr-4 ml-2 cursor-pointer py-1.5 font-medium'>
          Leader Board
        </Link>

        <IconButton
          size='sm'
          color='blue-gray'
          variant='text'
          className='ml-auto mr-2 lg:hidden'
        >
          <Bars2Icon className='w-6 h-6' />
        </IconButton>
        <ProfileMenu />
      </div>
    </Navbar>
  );
}
