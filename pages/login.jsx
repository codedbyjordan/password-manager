import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import ErrorBox from "../components/ErrorBox";
import { UserContext } from "../contexts/UserContext";
import { supabase } from "../utils/supabase";
import { randomBytes } from "crypto";
import checkIfEmailExists from "../utils/checkIfEmailExists";
import encrypt from "../utils/encryptVault";
import { VaultContext } from "../contexts/VaultContext";
import keygen from "../utils/keygen";
import { setCookies } from "cookies-next";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);
  const [vault, setVault] = useContext(VaultContext);
  const { push } = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setError(error.message);
      setDisabled(false);
    } else {
      setLoading(true);
      const emailExists = await checkIfEmailExists(email);
      if (!emailExists) {
        const salt = randomBytes(16).toString("hex");
        const key = keygen(email + password, salt);
        const iv = randomBytes(16).toString("hex").slice(0, 16);
        const encrypted = encrypt("[]", key, iv);

        await supabase.from("vaults").insert([
          {
            email,
            salt,
            contents: encrypted,
            iv,
          },
        ]);
        setCookies(`${user.id}:key`, key);
        setCookies(`${user.id}:iv`, iv);
      } else {
        const { data, error } = await supabase
          .from("vaults")
          .select("*")
          .eq("email", email)
          .limit(1)
          .single();
        const key = keygen(email + password, data.salt);
        setCookies(`${user.id}:key`, key);
        setCookies(`${user.id}:iv`, data.iv);
      }
      setLoading(false);
      setError(null);
      setUser(user);
      push("/");
    }
  };

  return (
    <div>
      <div className="border rounded-lg p-12 w-4/12 mx-auto my-48">
        <h1 className="font-extrabold text-3xl">Login</h1>
        {error && <ErrorBox message={error} />}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            required
            placeholder="email@address.com"
            className="border w-full p-3 rounded-lg mt-4 focus:border-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex border w-full p-3 rounded-lg mt-4 focus-within:border-indigo-500 focus-within:border-[3px]">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setPasswordVisible(!passwordVisible);
              }}
            >
              <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
            </button>
          </div>
          <button
            className="bg-indigo-500 text-white w-full p-3 rounded-lg mt-6 hover:bg-indigo-700  disabled:cursor-not-allowed disabled:bg-indigo-200"
            disabled={disabled}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
