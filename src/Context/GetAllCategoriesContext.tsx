import { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";

export const getAllCategoriesContext = createContext(null);

const GetAllCategoriesProvider = ({ children }) => {

  const [categories, setCategories] = useState<{} | undefined>(undefined);
  const [loadingCategories, setLoadingCategories] = useState(false)

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