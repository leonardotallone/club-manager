import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const signInContext = createContext(null);

interface SignIn {
  email: string;
  password: string;
}
const SignInProvider = ({ children }) => {
  const [signInUser, setSignInUser] =  useState<SignIn>();
  const [signInSuccess, setSignInSuccess] = useState([])
  const [signInError, setSignInError] = useState([])
  const [loading, setLoading] = useState(false)




  useEffect(() => {
    setLoading(true); // Show ActivityIndicator when action starts
    axios
      .post("http://10.25.14.90:3001/lotes/crearLote", signInUser)
      .then((response) => {
        setSignInSuccess(response.data);
      })
      .catch((error) => {
        setSignInError(error.message);
        console.error("Error al obtener Usuarios:", error.message);
      });
    setLoading(false); // Show ActivityIndicator when action starts
  }, [signInUser]);

  return (
    <signInContext.Provider value={{ setSignInUser, signInSuccess, signInError, loading }}>
      {children}
    </signInContext.Provider>
  );
};
export default SignInProvider;
