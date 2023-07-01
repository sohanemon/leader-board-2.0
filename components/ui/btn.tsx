'use client';

import { cn } from '@/lib/utils';
import { Button } from '@material-tailwind/react';
import { HtmlHTMLAttributes } from 'react';

interface CompType {}

export default function Btn({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLButtonElement> & CompType) {
  // @ts-ignore
  return <Button {...props} className={cn('', {}, className)} />;
}
