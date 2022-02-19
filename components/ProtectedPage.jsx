import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const ProtectedPage = ({ children }) => {
  const [user, setUser] = useContext(UserContext);
  const { push } = useRouter();

  useLayoutEffect(() => {
    if (!user) push("/");
  }, []);

  return <>{children}</>;
};

export default ProtectedPage;
