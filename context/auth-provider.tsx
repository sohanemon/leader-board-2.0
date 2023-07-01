'use client';

import { getCurrentUser } from '@/lib/firebase';
import { useEffect } from 'react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    getCurrentUser();
  }, []);

  return <>{children}</>;
}
