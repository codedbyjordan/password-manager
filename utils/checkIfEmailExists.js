import { supabase } from "./supabase";

const checkIfEmailExists = async (email) => {
  const { data } = await supabase
    .from("emails")
    .select("email")
    .eq("email", email);
  if (data && data.length > 0) return true;
  return false;
};

export default checkIfEmailExists;
