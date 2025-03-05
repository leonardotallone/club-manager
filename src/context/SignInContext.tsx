import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const signInContext = createContext(null);

interface SignIn {
  email: string;
  password: string;
}
const SignInProvider = ({ children }) => {

  const [credentials, setCredentials] = useState<SignIn>();
  const [accessToken, setAccessToken] = useState("");
  const [decodedToken, setDecodedToken] = useState("");
  const [signInError, setSignInError] = useState("")
  const [loading, setLoading] = useState(false)

  console.log("CREDENTIALS", credentials)
  // console.log("ACCESS TOKEN", accessToken)
  console.log("DECODED TOKEN", decodedToken)
  // console.log("ERROR", signInError)

  function decodeJWT(token: string) {
    // Split the token into parts
    const tokenParts = token.split('.');

    // Extract the payload
    const payload = tokenParts[1];

    // Decode base64 URL-safe
    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = atob(base64Payload);

    // Parse JSON
    const payloadData = JSON.parse(decodedPayload);

    return payloadData;
  }


  useEffect(() => {
    setLoading(true); // Show ActivityIndicator when action starts
    axios
      .post("https://masterclub.com.ar/api/Auth/login", credentials)
      .then((response) => {
        setSignInError("");

        setAccessToken(response.data);
      

        // Decodificacion de Token
        const decodedToken = decodeJWT(response.data.accessToken);
        setDecodedToken(decodedToken);

        // Puedes almacenar el token decodificado en el estado o local storage
        // localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      })
      .catch((error) => {
        setAccessToken("")
        setSignInError(error.response.data);
      })
      .finally(() => {
        setLoading(false); // Oculta ActivityIndicator cuando la acción termina
      });
  }, [credentials]);

  return (
    <signInContext.Provider value={{ setCredentials, setSignInError, setAccessToken,setDecodedToken, accessToken, decodedToken, signInError, loading }}>
      {children}
    </signInContext.Provider>
  );
};
export default SignInProvider;
