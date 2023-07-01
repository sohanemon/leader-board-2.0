'use client';
import { ThemeProvider as TP } from '@material-tailwind/react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TP>{children}</TP>;
}
