'use client';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(username, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  if (user) return null; // prevent flash before redirect

  return (
    <div style={styles.container}>
      <div className="glass-panel animate-fade-in" style={styles.loginCard}>
        <div style={styles.header}>
          <div style={styles.logoPlaceholder}>🏥</div>
          <h1 style={styles.title}>Saptgiri Hospital</h1>
          <p style={styles.subtitle}>PR Agent Portal</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter username (agent01)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password (saptgiri2024)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={styles.submitBtn}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  loginCard: {
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoPlaceholder: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
  },
  error: {
    backgroundColor: 'rgba(255, 90, 90, 0.1)',
    color: 'var(--accent-red)',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    textAlign: 'center',
    border: '1px solid rgba(255, 90, 90, 0.2)',
  },
  submitBtn: {
    width: '100%',
    marginTop: '10px',
  }
};
