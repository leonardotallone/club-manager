import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const getAllUsersContext = createContext(null);

const GetAllUsersProvider = ({ children }) => {

  const [accessToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
  const [sociosEnContext, setSociosEnContext] = useState();
  const [loading, setLoading] = useState(false)

  // console.log("SOCIOS EN CONTEXT", sociosEnContext)

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      axios.get(`https://masterclub.com.ar/api/socios`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the Authorization header
        },
      })
        .then((response) => {
          setSociosEnContext(response.data)
          // localStorage.setItem("socios", JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error("Error fetching socio data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [accessToken]);


  return (
    <getAllUsersContext.Provider value={{ loading, sociosEnContext }}>
      {children}
    </getAllUsersContext.Provider>
  );
};
export default GetAllUsersProvider;
