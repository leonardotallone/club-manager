import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import signedUserContext from "./SignedUserContext";

export const getAllUsersContext = createContext(null);

const GetAllUsersProvider = ({ children }) => {

  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(false)
  //  Filters from all users...



  useEffect(() => {
    setLoading(true);
    axios
      .get("http://10.25.14.90:3001/lotes/findEnReserva")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener Usuarios:", error.message);
      });
    setLoading(false);
  }, [allUsers]);

  return (
    <getAllUsersContext.Provider value={{ allUsers, loading }}>
      {children}
    </getAllUsersContext.Provider>
  );
};
export default GetAllUsersProvider;
