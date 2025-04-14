
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  hasRole: (role: string) => boolean;
  userRoles: string[];
  refreshUserRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  // Function to fetch user roles from database
  const fetchUserRoles = async (userId: string) => {
    if (!userId) return;
    
    try {
      console.log('Fetching roles for user:', userId);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error fetching user roles:', error);
        return;
      }
      
      if (data && data.length > 0) {
        const roles = data.map(item => item.role);
        console.log('User roles:', roles);
        setUserRoles(roles);
      } else {
        console.log('No specific roles found for user, using default customer role');
        setUserRoles(['customer']); // Default role
      }
    } catch (error) {
      console.error('Error in fetchUserRoles:', error);
    }
  };

  const refreshUserRoles = async () => {
    if (user) {
      await fetchUserRoles(user.id);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth event:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch user roles when session changes
        if (currentSession?.user) {
          fetchUserRoles(currentSession.user.id);
          if (event === 'SIGNED_IN') {
            toast.success(`Bem-vindo, ${currentSession.user.email}!`);
          }
        } else {
          setUserRoles([]);
          if (event === 'SIGNED_OUT') {
            toast.info('Você saiu do sistema');
          }
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
        fetchUserRoles(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserRoles([]);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Erro ao sair do sistema');
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signOut,
    hasRole,
    userRoles,
    refreshUserRoles,
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
