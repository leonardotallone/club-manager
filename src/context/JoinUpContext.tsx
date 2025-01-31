import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const joinUpContext = createContext(null);

const JoinUpProvider = ({ children }) => {
  const [joinUpUser, setJoinUpUser] = useState();
  const [joinUpSuccess, setJoinUpSuccess] = useState([])
  const [joinUpError, setJoinUpError] = useState([])
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    setLoading(true);
    axios
      .post("http://10.25.14.90:3001/lotes/crearLote", joinUpUser)
      .then((response) => {
        setJoinUpSuccess(response.data);
      })
      .catch((error) => {
        setJoinUpError(error.message);
        console.error("Error al obtener Usuarios:", error.message);
      });
      setLoading(false);
  }, [joinUpUser]);

  return (
    <joinUpContext.Provider value={{ setJoinUpUser, joinUpSuccess, joinUpError, loading }}>
      {children}
    </joinUpContext.Provider>
  );
};
export default JoinUpProvider;
