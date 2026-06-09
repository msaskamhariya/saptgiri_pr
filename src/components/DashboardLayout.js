'use client';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="dashboard-layout" style={styles.layout}>
      <Sidebar />
      <main style={styles.main}>
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    padding: '20px',
    gap: '24px',
    maxWidth: '1440px',
    margin: '0 auto',
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: '40px',
  }
};
