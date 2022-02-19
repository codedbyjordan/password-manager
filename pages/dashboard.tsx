import { NextPage } from "next";
import React, { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { VaultContext } from "../contexts/VaultContext";
import ProtectedPage from "../components/ProtectedPage";
import { getCookie } from "cookies-next";
import decrypt from "../utils/decryptVault";
import Entry from "../components/Entry";
import VaultEntry from "../types/VaultEntry";
import EntryEditor from "../components/EntryEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Dashboard: NextPage = () => {
  const [user] = useContext(UserContext);
  const [vault] = useContext(VaultContext);
  const [decryptedVault, setDecryptedVault] = useState<VaultEntry[] | []>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);

  const key = getCookie(`${user?.id}:key`)?.toString() || "";
  const iv = getCookie(`${user?.id}:iv`)?.toString() || "";

  useLayoutEffect(() => {
    if (key && iv) {
      setDecryptedVault(JSON.parse(decrypt(vault, key, iv)));
    }
  }, [vault]);
  return (
    <ProtectedPage>
      <h1 className="font-bold text-3xl">Your Vault</h1>
      <button onClick={() => setShowNewEntry(true)}>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="text-indigo-500 text-3xl"
        />
      </button>
      {showNewEntry && (
        <EntryEditor
          hide={() => {
            setShowNewEntry(false);
          }}
          decryptedVault={decryptedVault}
          vaultKey={key}
          iv={iv}
        />
      )}
      <div className="grid grid-cols-3">
        {decryptedVault &&
          decryptedVault.map((entry, i) => (
            <Entry
              entry={entry}
              decryptedVault={decryptedVault}
              vaultKey={key}
              iv={iv}
              key={entry.id}
            ></Entry>
          ))}
      </div>
    </ProtectedPage>
  );
};

export default Dashboard;
