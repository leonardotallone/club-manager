// import { useState, createContext, useEffect } from "react";
// import axios from "axios";

// export const getAllCategoriesContext = createContext(null);

// const GetAllCategoriesProvider = ({ children }) => {

//   const [accessToken] = useState(JSON.parse(localStorage.getItem('accessToken')));
//   const [categorias, setCategorias] = useState("")
//   const [loading, setLoading] = useState(false)

//   // console.log("CATEGORIAS EN CONTEXT", categorias)

//   useEffect(() => {
//     if (accessToken) {
//       axios.get(`https://masterclub.com.ar/api/socio/categorias`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // Add the Authorization header
//         },
//       })
//         .then((response) => {
//           setCategorias(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         })
//     }
//   }, [accessToken]);

//   return (
//     <getAllCategoriesContext.Provider value={{ categorias }}>
//       {children}
//     </getAllCategoriesContext.Provider>
//   );
// };
// export default GetAllCategoriesProvider;


import { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

export const getAllCategoriesContext = createContext(null);

const GetAllCategoriesProvider = ({ children }) => {

  const [categories, setCategories] = useState<{} | undefined>(undefined);
  const [loadingCategories, setLoadingCategories] = useState(false)

  console.log("CATEGORIAS", categories)

  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoadingCategories(true);
      try {
        const collectionRef = collection(db, "categories");
        const querySnapshot = await getDocs(collectionRef);

        const documentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(documentsData);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchDocuments();

    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const documentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(documentsData);
      }
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <getAllCategoriesContext.Provider value={{ categories, loadingCategories }}>
      {children}
    </getAllCategoriesContext.Provider>
  );
};
export default GetAllCategoriesProvider;