import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const joinUpContext = createContext(null);

const JoinUpProvider = ({ children }) => {
  const [joinUpUser, setJoinUpUser] = useState();
  const [joinUpSuccess, setJoinUpSuccess] = useState("")
  const [joinUpError, setJoinUpError] = useState("")
  const [loadingJU, setLoadingJU] = useState(false)

  // console.log("JoinUp", joinUpUser)

  // useEffect(() => {
  //   if (joinUpUser) {
  //     setLoadingJU(true);
  //     axios
  //       .post("http://10.25.14.90:3001/lotes/crearLote", joinUpUser)
  //       .then((response) => {
  //         setJoinUpSuccess(response.data);
  //       })
  //       .catch((error) => {
  //         setJoinUpError(error.message);
  //         console.error("Error al obtener Usuarios:", error.message);
  //       }).finally(() => {
  //         setLoadingJU(false);
  //       });
  //   }
  // }, [joinUpUser]);

  return (
    <joinUpContext.Provider value={{ setJoinUpUser, joinUpSuccess, setJoinUpError, loadingJU }}>
      {children}
    </joinUpContext.Provider>
  );
};
export default JoinUpProvider;
