import { pbkdf2Sync } from "crypto";

const keygen = (secret: string, salt: string) =>
  pbkdf2Sync(secret, salt, 100000, 32, "sha512").toString("hex");

export default keygen;
