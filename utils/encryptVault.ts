import { createCipheriv, randomBytes } from "crypto";

const encrypt = (toEncrypt: string, key: string, iv: string) => {
  const encrypter = createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
  let encrypted = encrypter.update(toEncrypt, "utf8", "hex");
  encrypted += encrypter.final("hex");

  return encrypted;
};

export default encrypt;
