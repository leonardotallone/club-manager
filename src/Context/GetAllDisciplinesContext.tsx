import { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

export const getAllDisciplinesContext = createContext(null);

const GetAllDisciplinesProvider = ({ children }) => {

  const [disciplines, setDisciplines] = useState<{} | undefined>(undefined);
  const [loadingDisciplines, setLoadingDisciplines] = useState(false)

  console.log("DISCIPLINAS", disciplines)

  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const fetchDocuments = async () => {
        setLoadingDisciplines(true);
      try {
        const collectionRef = collection(db, "disciplines");
        const querySnapshot = await getDocs(collectionRef);

        const documentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDisciplines(documentsData);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      } finally {
        setLoadingDisciplines(false);
      }
    };
    fetchDocuments();

    const unsubscribe = onSnapshot(
      collection(db, "disciplines"),
      (snapshot) => {
        const documentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDisciplines(documentsData);
      }
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <getAllDisciplinesContext.Provider value={{ disciplines, loadingDisciplines }}>
      {children}
    </getAllDisciplinesContext.Provider>
  );
};
export default GetAllDisciplinesProvider;