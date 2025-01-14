import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const signUpContext = createContext(null);

const SignUp = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState();
  const [signUpSuccess, setSignUpSuccess] = useState([])
  const [signUpError, setSignUpError] = useState([])

  useEffect(() => {
    axios
      .post("http://10.25.14.90:3001/lotes/crearLote", signUpUser)
      .then((response) => {
        setSignUpSuccess(response.data);
      })
      .catch((error) => {
        setSignUpError(error.message);
        console.error("Error al obtener Usuarios:", error.message);
      });
  }, [signUpUser]);

  return (
    <signUpContext.Provider value={{ setSignUpUser, signUpSuccess, signUpError }}>
      {children}
    </signUpContext.Provider>
  );
};
export default SignUp;
