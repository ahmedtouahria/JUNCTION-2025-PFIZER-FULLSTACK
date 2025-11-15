/**
 * Root Page - Redirect to Clinical Today
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/today');
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--clinical-background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'var(--clinical-text-secondary)'
      }}>
        Loading...
      </div>
    </div>
  );
}
