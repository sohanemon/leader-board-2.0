'use client';
import useStore from '@/lib/store';
import { calculateDaysLeft } from '@/lib/utils';
import { Button, Input } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const { updateMemberData } = useStore();
  const { push } = useRouter();

  function handleSubmit() {
    const form: any = formRef.current;
    updateMemberData({
      name: form.name.value,
      email: form.email.value,
      img: form.img.value,
      dayLeft: calculateDaysLeft(form.dayLeft.value),
      school: form.school.value,
      location: form.location.value,
    });
    push('/');
  }
  return (
    <section className='p-4 mt-20 grid place-content-center'>
      <form
        ref={formRef}
        className='grid grid-cols-2 gap-6 [&>div:has(.full)]:col-span-2'
      >
        <Input name='name' label='Name' type='text' />
        <Input name='email' label='Email' type='email' />
        <Input name='img' className='full' label='Photo URL' type='text' />
        <Input name='dayLeft' label='Deadline' type='date' />
        <Input name='location' label='Location' type='text' />
        <Input name='school' label='School' type='text' className='full' />
        <Button
          variant='outlined'
          className='col-span-full'
          onClick={handleSubmit}
          color='green'
        >
          Submit
        </Button>
      </form>
    </section>
  );
}
