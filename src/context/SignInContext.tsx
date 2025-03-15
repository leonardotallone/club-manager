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
  const [userRole, setUserRole] = useState("");
  const [signInError, setSignInError] = useState("")
  const [loading, setLoading] = useState(false)

  // console.log("CREDENTIALS", credentials)
  // console.log("ACCESS TOKEN", accessToken)
  // console.log("User Role", userRole)
  // console.log("ERROR", signInError)

  function decodeJWT(token: string) {
    const tokenParts = token.split('.');// Split the token into parts
    const payload = tokenParts[1]; // Extract the payload
    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/'); // Extract the payload
    const decodedPayload = atob(base64Payload);
    const payloadData = JSON.parse(decodedPayload);// Parse JSON
    return payloadData;
  }

  useEffect(() => {
    if(credentials) {
      
    setLoading(true); // Show ActivityIndicator when action starts
    axios
      .post("https://masterclub.com.ar/api/Auth/login", credentials)
      .then((response) => {

        const decodedToken = decodeJWT(response.data.accessToken);
        setUserRole(decodedToken.role);

        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        // localStorage.setItem("userRole", JSON.stringify(userRole));
      })
      .catch((error) => {
        setSignInError(error);
      })
      .finally(() => {
        setLoading(false); // Oculta ActivityIndicator cuando la acción termina
      });}
  }, [credentials]);

  return (
    <signInContext.Provider value={{ setCredentials, setSignInError, setAccessToken,setUserRole, accessToken, userRole, signInError, loading }}>
      {children}
    </signInContext.Provider>
  );
};
export default SignInProvider;
