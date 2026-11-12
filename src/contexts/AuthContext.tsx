'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<any>(null);
  const [session] = useState<any>(null);
  const [loading] = useState(false);

  const value = {
    user,
    session,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
