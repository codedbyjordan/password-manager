import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { UserContext } from "./UserContext";
export const VaultContext = createContext<any[]>([]);

const VaultContextProvider: React.FC = ({ children }) => {
  const [vault, setVault] = useState("");
  const [user, setUser] = useContext(UserContext);

  const getVault = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("vaults")
        .select("*")
        .eq("email", user.email)
        .limit(1)
        .single();

      setVault(data?.contents);
    }
  };

  const updateVault = async () => {
    if (user && vault) {
      await supabase
        .from("vaults")
        .update({ contents: vault })
        .eq("email", user.email);
    }
  };

  useEffect(() => {
    getVault();
  }, [user]);

  useEffect(() => {
    updateVault();
  }, [vault]);

  return (
    <VaultContext.Provider value={[vault, setVault]}>
      {children}
    </VaultContext.Provider>
  );
};

export default VaultContextProvider;
