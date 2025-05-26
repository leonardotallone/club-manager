import { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

export const joinUpContext = createContext(null);

interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  date: string;
}
const JoinUpProvider = ({ children }) => {
  const [joinUpUser, setJoinUpUser] = useState<User | null>(null);
  const [joinUpSuccess, setJoinUpSuccess] = useState("")
  const [joinUpError, setJoinUpError] = useState("")
  const [loadingJU, setLoadingJU] = useState(false)

  const [deleteApplication, setDeleteApplication] = useState(null)
  const [deleteApplicationAfterRegister, setDeleteApplicationAfterRegister] = useState(null)
  const [deleteSuccess, setDeleteSuccess] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [loadingDelete, setLoadingDelete] = useState(false)

  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    if (joinUpUser) {
      const createUserAndAddDoc = async () => {
        try {
          setLoadingJU(true);
          await addDoc(collection(db, "joinUp"), joinUpUser);
          setJoinUpSuccess("User created successfully");
        } catch (error: any) {
          setJoinUpError(error.message || "An error occurred");
        } finally {
          setLoadingJU(false);
        }
      };
      createUserAndAddDoc();
    }
  }, [joinUpUser, db]);

  useEffect(() => {

    if (deleteApplication) {
      // Immediate deletion for regular case
      const deleteApplicationDoc = async () => {
        try {
          setLoadingDelete(true);
          const docRef = doc(db, "joinUp", deleteApplication);
          await deleteDoc(docRef);
          setDeleteSuccess("Application deleted successfully");
        } catch (error) {
          setDeleteError(error.message || "An error occurred");
        } finally {
          setLoadingDelete(false);
        }
      };
      deleteApplicationDoc();
    }
  }, [db, deleteApplication]);

  //Usado por si existe un delay en la creacion de usuario, antes de q se borre el documento.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const deleteDocAsync = async () => {
        try {
          setLoadingDelete(true);
          const docRef = doc(db, "joinUp", deleteApplicationAfterRegister);
          await deleteDoc(docRef);
          setDeleteSuccess("Application deleted successfully");
        } catch (error: any) {
          setDeleteError(error.message || "An error occurred");
        } finally {
          setLoadingDelete(false);
        }
      };
      deleteDocAsync();

    }, 5000); // 5 segundos

    return () => clearTimeout(timeoutId); // Limpieza
  }, [deleteApplicationAfterRegister, db]);

  return (
    <joinUpContext.Provider value={{
      setJoinUpUser,
      joinUpSuccess,
      setJoinUpError,
      joinUpError,
      loadingJU,

      setDeleteApplication,
      setDeleteApplicationAfterRegister,
      deleteSuccess,
      deleteError,
      loadingDelete

    }}>
      {children}
    </joinUpContext.Provider>
  );
};
export default JoinUpProvider;
