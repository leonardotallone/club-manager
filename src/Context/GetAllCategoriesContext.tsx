import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const getAllCategoriesContext = createContext(null);

const GetAllCategoriesProvider = ({ children }) => {

  const [accessToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
  const [categorias, setCategorias] = useState("")
  const [loading, setLoading] = useState(false)

  // console.log("CATEGORIAS EN CONTEXT", categorias)

  useEffect(() => {
    if (accessToken) {
      axios.get(`https://masterclub.com.ar/api/socio/categorias`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the Authorization header
        },
      })
        .then((response) => {
          setCategorias(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [accessToken]);

  return (
    <getAllCategoriesContext.Provider value={{ categorias }}>
      {children}
    </getAllCategoriesContext.Provider>
  );
};
export default GetAllCategoriesProvider;
