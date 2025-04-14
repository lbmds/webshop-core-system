
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch user roles when session changes
        if (currentSession?.user) {
          fetchUserRoles(currentSession.user.email);
        } else {
          setUserRoles([]);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Fetch user roles for existing session
      if (currentSession?.user) {
        fetchUserRoles(currentSession.user.email);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to fetch user roles
  const fetchUserRoles = async (email: string | undefined) => {
    if (!email) return;
    
    // For demonstration purposes, we'll just set the admin role for the specified email
    if (email === 'legol24854@insfou.com') {
      setUserRoles(['admin']);
    } else {
      setUserRoles(['customer']);
    }
    
    // In a real application, you would fetch roles from your database
    // const { data, error } = await supabase
    //   .from('user_roles')
    //   .select('role')
    //   .eq('user_id', userId);
    
    // if (data && !error) {
    //   setUserRoles(data.map(item => item.role));
    // }
  };

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserRoles([]);
  };

  const value = {
    user,
    session,
    isLoading,
    signOut,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
