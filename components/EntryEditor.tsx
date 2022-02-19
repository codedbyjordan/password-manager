import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { VaultContext } from "../contexts/VaultContext";
import encrypt from "../utils/encryptVault";
import VaultEntry from "../types/VaultEntry";

type Props = {
  entry?: VaultEntry;
  decryptedVault: VaultEntry[] | any[];
  hide: any;
  vaultKey: string;
  iv: string;
};

const EntryEditor: React.FC<Props> = (props) => {
  const [name, setName] = useState(props.entry?.name);
  const [url, setUrl] = useState(props.entry?.url);
  const [username, setUsername] = useState(props.entry?.username);
  const [password, setPassword] = useState(props.entry?.password);
  const [vault, setVault] = useContext(VaultContext);

  const addToVault = (e: any) => {
    e.preventDefault();
    console.log("test");
    if (props.decryptedVault) {
      if (props.entry) {
        props.decryptedVault[props.entry.id - 1] = {
          name,
          url,
          username,
          password,
          id: props.entry.id,
        };
      } else {
        const newEntry: VaultEntry = {
          name,
          url,
          username,
          password,
          id: props.decryptedVault.length + 1,
        };
        props.decryptedVault.push(newEntry);
      }

      setVault(
        encrypt(JSON.stringify(props.decryptedVault), props.vaultKey, props.iv)
      );
    }
  };

  const removeEntry = () => {
    const newDecryptedVault = props.decryptedVault.filter(
      (entry) => entry.id != props.entry?.id
    );
    console.log(newDecryptedVault);
    setVault(
      encrypt(JSON.stringify(newDecryptedVault), props.vaultKey, props.iv)
    );
  };

  return (
    <div
      className="bg-black bg-opacity-30 fixed z-40 top-0 w-screen h-screen flex justify-center items-center"
      onClick={props.hide}
    >
      <form
        className="w-7/12 bg-white rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onSubmit={addToVault}
      >
        <h1 className="text-white text-center bg-indigo-500 p-2 font-bold">
          Add Password
        </h1>
        <div className="grid grid-cols-2 p-2">
          <input
            type="text"
            placeholder="URL"
            value={url}
            className="rounded-md p-1 border border-gray-400 col-span-2 my-2"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="rounded-md p-1 border border-gray-400 col-span-2 my-2"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Email/Username"
            value={username}
            className="rounded-md p-1 border border-gray-400 my-2 mr-4"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="rounded-md p-1 border border-gray-400 my-2"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {props.entry && (
            <button
              className="bg-red-500 text-white rounded-lg p-2 mr-4 mt-12"
              type="button"
              onClick={removeEntry}
            >
              Remove
            </button>
          )}
          <button
            className={
              props.entry
                ? `bg-indigo-500 text-white rounded-lg p-2 mt-12`
                : `bg-indigo-500 text-white rounded-lg p-2 mt-12 col-span-2`
            }
            type="submit"
          >
            Save
          </button>
          {props.entry?.id}
        </div>
      </form>
    </div>
  );
};

export default EntryEditor;
