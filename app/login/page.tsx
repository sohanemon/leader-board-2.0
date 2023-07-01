'use client';
import Btn from '@/components/ui/btn';
import { useSearchParams } from 'next/navigation';
import { Input, Typography } from '@material-tailwind/react';
import { createUser } from '@/lib/firebase';

export default function Page() {
  const searchParams = useSearchParams();

  const signUp = searchParams.get('signup');

  function handleSubmit() {
    createUser('rahim mia 2', 'email@fdasdfsgjk.com', 'rahim12345');
  }

  return (
    <section className='grid min-h-[calc(100vh-200px)] place-content-center'>
      <form className='flex flex-col max-w-3xl gap-5 sm:w-96 '>
        <h1 className='text-2xl font-bold text-center text-blue-500'>
          {signUp ? ' Create a new account ' : ' Login to your account'}
        </h1>
        <Input size='lg' type='email' label='Email' />
        <Input size='lg' type='password' label='Password' />
        <Btn onClick={handleSubmit}> {signUp ? 'Sign Up' : 'Sign In'}</Btn>
      </form>
    </section>
  );
}
