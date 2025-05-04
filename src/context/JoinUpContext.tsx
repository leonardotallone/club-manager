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
  const [deleteSuccess, setDeleteSuccess] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [loadingDelete, setLoadingDelete] = useState(false)

  const db = getFirestore(FIREBASE_APP);

  console.log("Delete Request", deleteApplication)
  console.log("Application", joinUpUser)

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
      const deleteApplicationDoc = async () => {
        try {
          setLoadingDelete(true);
          const docRef = doc(db, "joinUp", deleteApplication.id);
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
  }, [deleteApplication, db]);

  return (
    <joinUpContext.Provider value={{
      setJoinUpUser,
      joinUpSuccess,
      setJoinUpError,
      joinUpError,
      loadingJU,

      setDeleteApplication,
      deleteSuccess,
      deleteError,
      loadingDelete

    }}>
      {children}
    </joinUpContext.Provider>
  );
};
export default JoinUpProvider;
