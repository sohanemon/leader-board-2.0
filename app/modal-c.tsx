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

export default function ModalC({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { addMemberData } = useStore();

  const handleOpen = () => setOpen(!open);
  function handleSubmit() {
    const form: any = formRef.current;
    addMemberData({
      name: form.name.value,
      email: form.email.value,
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
          <form ref={formRef} className='grid grid-cols-2 gap-6'>
            <Input name='name' label='Name' type='text' />
            <Input name='email' label='Email' type='email' />
            <Input
              name='img'
              className='col-span-full'
              label='Photo URL'
              type='text'
            />
            <Input name='position' label='Position' type='number' />
            <Input name='dayLeft' label='Day Left' type='number' />
            <Input name='location' label='Location' type='text' />
            <Input name='school' label='School' type='text' />
          </form>
        </DialogBody>
        <DialogFooter className='space-x-2'>
          <Button variant='outlined' color='red' onClick={handleOpen}>
            close
          </Button>
          <Button variant='gradient' color='green' onClick={handleSubmit}>
            Add Member
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
