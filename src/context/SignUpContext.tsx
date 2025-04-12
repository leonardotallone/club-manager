import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const signUpContext = createContext(null);

const SignUpProvider = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState();
  const [signUpSuccess, setSignUpSuccess] = useState([])
  const [signUpError, setSignUpError] = useState([])
  const [loading, setLoading] = useState(false)

  console.log("SIGNUP EN CONTEXT",signUpUser)

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://10.25.14.90:3001/lotes/crearLote", signUpUser)
      .then((response) => {
        setSignUpSuccess(response.data);
      })
      .catch((error) => {
        setSignUpError(error.message);
        console.error("Error al obtener Usuarios:", error.message);
      });
    setLoading(false);
  }, [signUpUser]);

  return (
    <signUpContext.Provider value={{ setSignUpUser, signUpSuccess, signUpError, loading }}>
      {children}
    </signUpContext.Provider>
  );
};
export default SignUpProvider;
