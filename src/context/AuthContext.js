'use client';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('pr_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('pr_user', JSON.stringify(data.user));
        router.push('/dashboard');
        return { success: true };
      }
      
      return { success: false, message: data.message || 'Invalid username or password' };
    } catch (e) {
      return { success: false, message: 'Failed to connect to the server' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pr_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
