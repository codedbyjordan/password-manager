import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { VaultContext } from "../contexts/VaultContext";
import { supabase } from "../utils/supabase";

const Navbar: React.FC = () => {
  const [user, setUser] = useContext(UserContext);
  const [vault, setVault] = useContext(VaultContext);
  const { push } = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setVault("");
    push("/");
  };

  useEffect(() => {}, []);
  return (
    <nav className="px-2 py-4 shadow-md mb-4">
      <ul className="flex">
        <li className="px-2 hover:underline">
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className="px-2 hover:underline">
              <Link href="/dashboard">My Vault</Link>
            </li>
            <li className="px-2">
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="px-2 hover:underline">
              <Link href="/login">Login</Link>
            </li>
            <li className="px-2 hover:underline">
              <Link href="/signup">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
