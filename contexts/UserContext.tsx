import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { getCookie, removeCookies } from "cookies-next";

export const UserContext = createContext<any[]>([]);

const UserContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(supabase.auth.user());
  useEffect(() => {
    if (user && !getCookie(`${user.id}:key`)) {
      supabase.auth.signOut().then(() => {
        setUser(null);
        removeCookies(`${user.id}:key`);
        removeCookies(`${user.id}:iv`);
      });
    }
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session ? session.user : null);
  });

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
