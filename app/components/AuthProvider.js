'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Create context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    let authListener = null;

    const getUser = async () => {
      try {
        // Check if we have a user
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          if (error.name === 'AuthSessionMissingError') {
            // This is expected when not logged in, don't log as an error
            console.log('No active session found');
          } else {
            console.error('Error fetching user:', error);
          }
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }

        const authUser = data?.user;
        if (authUser) {
          setUser(authUser);

          // Fetch user profile
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .single();

            if (profileError) {
              if (profileError.code === 'PGRST116') {
                // Profile not found, might need to create one
                console.log('Profile not found for user:', authUser.id);
                // You could create a profile here if needed
              } else {
                console.error('Error fetching profile:', profileError);
              }
            } else {
              setProfile(profileData);
            }
          } catch (profileFetchError) {
            console.error('Exception fetching profile:', profileFetchError);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('Error in auth provider:', error);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    // Set up auth state change listener
    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session);

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            setUser(session.user);

            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

              if (profileError) {
                console.error('Error fetching profile:', profileError);
              } else {
                setProfile(profileData);
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
            }
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }

        setLoading(false);
      });

      authListener = data.subscription;
    } catch (listenerError) {
      console.error('Error setting up auth listener:', listenerError);
      setLoading(false);
    }

    return () => {
      if (authListener) {
        try {
          authListener.unsubscribe();
        } catch (error) {
          console.error('Error unsubscribing from auth listener:', error);
        }
      }
    };
  }, [supabase]);

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isInstructor: profile?.role === 'instructor',
    isRecruiter: profile?.role === 'recruiter',
    isVerified: profile?.verification_status === 'verified',
    isPending: profile?.verification_status === 'pending',
    isRejected: profile?.verification_status === 'rejected',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
