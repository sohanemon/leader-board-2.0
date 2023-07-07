'use client';
import Btn from '@/components/ui/btn';
import { createUser, googleLogin, signIn } from '@/lib/firebase';
import useStore from '@/lib/store';
import { Input } from '@material-tailwind/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const { promptDescription } = useStore();
  const formRef = useRef<HTMLFormElement>(null);
  const signUp = searchParams.get('signup');

  function handleSubmit() {
    const form: any = formRef.current;
    signUp
      ? createUser(form?.name.value, form.email.value, form?.password.value)
      : signIn(form.email.value, form?.password.value);
  }

  return (
    <section className='grid min-h-[calc(100vh-200px)] place-content-center'>
      <form ref={formRef} className='flex flex-col max-w-3xl gap-5 sm:w-96 '>
        <h1 className='text-2xl font-bold text-center text-blue-500'>
          {signUp ? ' Create a new account ' : ' Login to your account'}
        </h1>
        {signUp && <Input name='name' size='lg' type='name' label='Name' />}
        <Input name='email' size='lg' type='email' label='Email' />
        <Input name='password' size='lg' type='password' label='Password' />
        <Btn onClick={handleSubmit}> {signUp ? 'Sign Up' : 'Sign In'}</Btn>
        {!signUp ? (
          <p className='text-sm text-center'>
            Do not have an account?{' '}
            <Link href={'?signup=true'} className='text-blue-600'>
              Create one
            </Link>
          </p>
        ) : (
          <p className='text-sm text-center'>
            Already have an account?{' '}
            <Link href={'/login'} className='text-blue-600'>
              Login
            </Link>
          </p>
        )}
        <Btn onClick={() => googleLogin()}>Login with Google</Btn>
      </form>
    </section>
  );
}
