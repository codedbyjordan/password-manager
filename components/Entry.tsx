import React, { useState } from "react";
import VaultEntry from "../types/VaultEntry";
import EntryEditor from "./EntryEditor";

type Props = {
  entry: VaultEntry;
  decryptedVault: VaultEntry[] | any[];
  vaultKey: string;
  iv: string;
};

const Entry: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rounded-lg border-2 border-gray-200 shadow-md m-4 p-4 ">
        <div className="flex items-center">
          <h1 className="font-semibold text-3xl mr-4">{props.entry.name}</h1>
          <p>{props.entry.url}</p>
        </div>
        <div className="text-right">
          <button onClick={() => setOpen(true)}>Edit</button>
        </div>
      </div>

      {open && (
        <EntryEditor
          entry={props.entry}
          hide={() => setOpen(false)}
          decryptedVault={props.decryptedVault}
          vaultKey={props.vaultKey}
          iv={props.iv}
        ></EntryEditor>
      )}
    </>
  );
};

export default Entry;
