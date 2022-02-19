import { createDecipheriv } from "crypto";

const decrypt = (toDecrypt: string, key: string, iv: string) => {
  const decrypter = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let decrypted = decrypter.update(toDecrypt, "hex", "utf8");
  if (toDecrypt) {
    decrypted += decrypter.final("utf8");
    return decrypted;
  }
  return "[]";
};
export default decrypt;
