import crypto from "crypto";

export const getCodeVerifier = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const getCodeChallenge = (verifier) => {
  return crypto
    .createHash("sha256")
    .update(verifier)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};
