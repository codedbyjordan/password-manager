import React from "react";
import Navbar from "./Navbar";
import UserContextProvider from "../contexts/UserContext";
import VaultContextProvider from "../contexts/VaultContext";

const Layout: React.FC = ({ children }) => {
  return (
    <UserContextProvider>
      <VaultContextProvider>
        <div>
          <Navbar />
          {children}
        </div>
      </VaultContextProvider>
    </UserContextProvider>
  );
};

export default Layout;
