import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from "../firebase/firebase.service"
import { useAuthState } from 'react-firebase-hooks/auth'

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: Error | null;
  users: User[];
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  users: [],
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingState, setLoading] = useState(true);
  const [errorState, setError] = useState<Error | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoading(loading);
    setError(error || null);
    if (!loading) {
      setCurrentUser(user || null);
    }
  }, [loading, error, user]);

  return (
    <AuthContext.Provider value={{ user: currentUser, loading: loadingState, error: errorState, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);