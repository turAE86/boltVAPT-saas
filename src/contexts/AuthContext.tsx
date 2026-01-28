import React, { createContext, useContext } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface AuthContextType {
  user: { id: string; email: string } | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
  };

  const contextValue: AuthContextType = {
    user: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
        }
      : null,
    loading: !isLoaded,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
