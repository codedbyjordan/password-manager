import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import { supabase } from "../utils/supabase";

const ProtectedPage = ({ children }) => {
  const { push } = useRouter();

  useLayoutEffect(() => {
    if (!supabase.auth.user()) push("/");
  }, []);

  return <>{children}</>;
};

export default ProtectedPage;
