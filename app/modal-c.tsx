// @ts-nocheck
'use client';
import React, { useRef } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import useStore from '@/lib/store';

export default function ModalC({
  children,
  editMode,
  data,
}: {
  children: React.ReactNode;
  editMode?: boolean;
  data?: Object;
}) {
  console.log('🛑 ~ data:', data);

  const [open, setOpen] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { addMemberData, updateMemberData } = useStore();

  const handleOpen = () => setOpen(!open);
  function handleSubmit() {
    const form: any = formRef.current;
    if (editMode) {
      updateMemberData({
        name: form.name.value,
        email: form.email.value,
        img: form.img.value,
        position: form.position.value,
        dayLeft: form.dayLeft.value,
        school: form.school.value,
        location: form.location.value,
      });
    } else
      addMemberData({
        name: form.name.value,
        email: form.email.value,
        img: form.img.value,
        position: form.position.value,
        dayLeft: form.dayLeft.value,
        school: form.school.value,
        location: form.location.value,
      });
    handleOpen();
  }

  return (
    <React.Fragment>
      <span onClick={handleOpen}>{children}</span>
      <Dialog open={open} handler={handleOpen}>
        <div className='flex items-center justify-between'>
          <DialogHeader>Add new member</DialogHeader>
          <XMarkIcon className='w-5 h-5 mr-3' onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <form
            ref={formRef}
            className='grid grid-cols-2 gap-6 [&>div:has(.full)]:col-span-2'
          >
            <Input
              defaultValue={data?.name}
              name='name'
              label='Name'
              type='text'
            />
            <Input
              defaultValue={data?.email}
              name='email'
              label='Email'
              type='email'
            />
            <Input
              defaultValue={data?.img}
              name='img'
              className='full'
              label='Photo URL'
              type='text'
            />
            <Input
              defaultValue={data?.position}
              name='position'
              label='Position'
              type='number'
            />
            <Input
              defaultValue={data?.dayLeft}
              name='dayLeft'
              label='Day Left'
              type='number'
            />
            <Input
              defaultValue={data?.location}
              name='location'
              label='Location'
              type='text'
            />
            <Input
              defaultValue={data?.school}
              name='school'
              label='School'
              type='text'
            />
          </form>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='outlined' color='red' onClick={handleOpen}>
            close
          </Button>
          <Button variant='gradient' color='green' onClick={handleSubmit}>
            {editMode ? 'Update' : ' Add Member'}
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
