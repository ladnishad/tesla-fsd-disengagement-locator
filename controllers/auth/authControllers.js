import axios from "axios";
import dotenv from "dotenv";
import { getCodeVerifier, getCodeChallenge } from "./helpers";

dotenv.config();

export const getAuthPage = async (req, res) => {
  const codeVerifier = getCodeVerifier();
  const codeChallenger = getCodeChallenge(codeVerifier);

  const params = {
    client_id: process.env.TESLA_API_CLIENT_ID,
    code_challenge: codeChallenger,
    code_challenge_method: "S256",
    redirect_uri: process.env.TESLA_API_REDIRECT_URI,
    response_type: "code",
    scope: "openid email offline_access",
    state: process.env.TESLA_API_STATE,
    login_hint: process.env.TESLA_API_LOGIN_HINT,
  };

  try {
    const apiRes = await axios.get(
      "https://auth.tesla.com/oauth2/v3/authorize",
      { params }
    );

    res.send(apiRes.data);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
