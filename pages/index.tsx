import type { NextPage } from "next";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Link from "next/link";

const Home: NextPage = () => {
  const [user] = useContext(UserContext);

  return (
    <>
      {user ? (
        <div>
          Hello!{" "}
          <span className="underline">
            <Link href="/dashboard">Open your vault here!</Link>
          </span>
        </div>
      ) : (
        <div>
          Hello!{" "}
          <span className="underline">
            <Link href="/login">Login</Link>
          </span>{" "}
          to see your vault
        </div>
      )}
    </>
  );
};

export default Home;
