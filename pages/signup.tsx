import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import React, { useState } from "react";
import ErrorBox from "../components/ErrorBox";
import SuccessBox from "../components/SuccessBox";
import checkIfEmailExists from "../utils/checkIfEmailExists";
import { supabase } from "../utils/supabase";

const Signup: NextPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailExists = await checkIfEmailExists(email);
    console.log(emailExists);
    if (emailExists) {
      setError("Email already in use!");
    } else {
      setDisabled(true);
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setError(null);
        setSuccess("Confirmation email sent!");
      }
    }
  };

  return (
    <div>
      <div className="border rounded-lg p-12 w-4/12 mx-auto my-48">
        <h1 className="font-extrabold text-3xl">Sign Up</h1>
        {error && <ErrorBox message={error} />}
        {success && <SuccessBox message={success} />}
        <form onSubmit={handleSignup}>
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
              <FontAwesomeIcon
                icon={
                  passwordVisible
                    ? (faEye as IconProp)
                    : (faEyeSlash as IconProp)
                }
              />
            </button>
          </div>
          <button
            className="bg-indigo-500 text-white w-full p-3 rounded-lg mt-6 hover:bg-indigo-700 disabled:bg-indigo-200"
            disabled={disabled}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
