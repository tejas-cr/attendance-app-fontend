"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, authService } from '../services/auth-service';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/sign-in') {
        router.push('/sign-in');
      } else if (user && pathname === '/sign-in') {
        router.push('/dashboard');
      }
    }
  }, [user, loading, pathname, router]);

  async function checkUser() {
    try {
      const { data } = await authService.getProfile();
      setUser(data);
    } catch (error) {
      // Not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials: { email: string; password: string }) {
    const { data } = await authService.login(credentials);
    setUser(data.user);
    router.push('/dashboard');
  }

  async function register(data: { name: string; email: string; password: string }) {
    const { data: responseData } = await authService.register(data);
    setUser(responseData.user);
    router.push('/dashboard');
  }

  async function logout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
    setUser(null);
    router.push('/sign-in');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
