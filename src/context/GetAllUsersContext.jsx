import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const getAllUsersContext = createContext(null);

const GetAllUsers = ({ children }) => {
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    axios
      .get("http://10.25.14.90:3001/lotes/findEnReserva")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener Usuarios:", error.message);
      });
  }, []);

  return (
    <getAllUsersContext.Provider value={{ allUsers }}>
      {children}
    </getAllUsersContext.Provider>
  );
};
export default GetAllUsers;
