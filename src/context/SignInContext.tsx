import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const signInContext = createContext(null);

interface SignIn {
  email: string;
  password: string;
}
const SignInProvider = ({ children }) => {

  const [credentials, setCredentials] = useState<SignIn>();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [userRole, setUserRole] = useState("");
  const [signInError, setSignInError] = useState("")
  const [loading, setLoading] = useState(false)

  const [socioID, setSocioID] = useState<Number>();
  const [socio, setSocio] = useState(JSON.parse(localStorage.getItem('socio')) || null);



  function decodeJWT(token: string) {
    const tokenParts = token.split('.');// Split the token into parts
    const payload = tokenParts[1]; // Extract the payload
    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/'); // Extract the payload
    const decodedPayload = atob(base64Payload);
    const payloadData = JSON.parse(decodedPayload);// Parse JSON
    return payloadData;
  }

  useEffect(() => {
    if (credentials) {
      setLoading(true); // Show ActivityIndicator when action starts
      axios
        .post("https://masterclub.com.ar/api/Auth/login", credentials)
        .then((response) => {
          setSocioID(response.data.socioId)
          setAccessToken(response.data.accessToken)
          const decodedToken = decodeJWT(response.data.accessToken);
          setUserRole(decodedToken.role);
          localStorage.setItem("role", decodedToken.role);
          localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
        })
        .catch((error) => {
          setSignInError(error);
        })
        .finally(() => {
          setLoading(false); // Oculta ActivityIndicator cuando la acción termina
        });
    }
  }, [credentials]);

  useEffect(() => {
    if (socioID && accessToken) {
      axios.get(`https://masterclub.com.ar/api/socio/${socioID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the Authorization header
        },
      })
        .then((response) => {
          localStorage.setItem("socio", JSON.stringify(response.data));
          setSocio(JSON.parse(localStorage.getItem('socio')) || null);
        })
        .catch((error) => {
          console.error("Error fetching socio data:", error);
        });
    }
  }, [socioID, accessToken]);


  return (
    <signInContext.Provider value={{ setCredentials, setSignInError, setAccessToken, setUserRole, setSocio, accessToken, userRole, signInError, loading, socio }}>
      {children}
    </signInContext.Provider>
  );
};
export default SignInProvider;
