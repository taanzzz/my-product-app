'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthTokenHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && (session as any).customToken) {
      
      localStorage.setItem('token', (session as any).customToken);
    }
  }, [session]);

  return null; 
}