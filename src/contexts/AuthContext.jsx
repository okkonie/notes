import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../../supabaseClient";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(undefined)

  const signUpNewUser = async (email, password) => {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password
    })

    if (error) {
      console.error('Signup error:', error)
      return {success: false, error: error.message || "Unknown error"};
    }
    if (data?.user === null) {
      // Supabase may require email confirmation
      return { success: false, error: "Check your email for a confirmation link." };
    }
    return { success: true, data };
  }

  useEffect(() => {
    supabase.auth.getSession().then(({data: { session }}) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const logIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message || "Unknown error" };
      }
      return { success: true, data };
    } catch (error) {
      console.log('Unexpected error:', error);
      return { success: false, error: error.message || "Unexpected error" };
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
      return { success: false, error: error.message || "Unknown error" };
    } else {
      console.log("Signed out successfully");
      return { success: true };
    }
  };

  return (
    <AuthContext.Provider value={{session, signUpNewUser, signOut, logIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext);
}