'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Tooltip,
  Typography,
} from '@material-tailwind/react';

const TABS = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Monitored',
    value: 'monitored',
  },
  {
    label: 'Unmonitored',
    value: 'unmonitored',
  },
];

const TABLE_HEAD = ['Position', 'Name', 'Day Left', 'Location', 'School'];

const TABLE_ROWS = [
  {
    img: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg',
    name: 'Emon',
    email: 'emon@nobody.com',
    position: 'Manager',
    location: 'Dhaka',
    dayLeft: 23,
    school: 'Dhaka High School',
  },
];

export default function TableC() {
  return (
    <Card className='w-full h-full mt-10 shadow-none box'>
      <CardHeader floated={false} className='rounded-none shadow-none'>
        <div className='flex items-center justify-between gap-8 mb-8'>
          <div>
            <Typography variant='h5' color='blue-gray'>
              Members list
            </Typography>
            <Typography color='gray' className='mt-1 font-normal'>
              See information about all members
            </Typography>
          </div>
          <div className='flex flex-col gap-2 shrink-0 sm:flex-row'>
            <Button variant='outlined' color='blue-gray' size='sm'>
              view all
            </Button>
            <Button className='flex items-center gap-3' color='blue' size='sm'>
              <UserPlusIcon strokeWidth={2} className='w-4 h-4' /> Add member
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <Tabs value='all' className='w-full md:w-max'>
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72'>
            <Input
              label='Search'
              icon={<MagnifyingGlassIcon className='w-5 h-5' />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className='px-0 '>
        <table className='w-full mt-4 text-left table-auto min-w-max'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='p-4 border-y border-blue-gray-100 bg-blue-gray-50/50'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                { img, name, email, position, location, dayLeft, school },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal opacity-70'
                      >
                        {position}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='flex items-center gap-3'>
                        <Avatar src={img} alt={name} size='sm' />
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70'
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className='flex flex-col'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {dayLeft}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {location}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='w-max'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {school}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content='Edit User'>
                        <IconButton variant='text' color='blue-gray'>
                          <PencilIcon className='w-4 h-4' />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className='flex items-center justify-between p-4 border-t border-blue-gray-50'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Page 1 of 10
        </Typography>
        <div className='flex gap-2'>
          <Button variant='outlined' color='blue-gray' size='sm'>
            Previous
          </Button>
          <Button variant='outlined' color='blue-gray' size='sm'>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
