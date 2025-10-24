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

  const [deleteApplication, setDeleteApplication] = useState<string | null>(null);
  const [deleteRejectedApplication, setDeleteRejectedApplication] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);


  console.log("DELETE APPLICATION CONTEXT", deleteApplication)
  console.log("DELETE ERROR", deleteError)

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
    if (!deleteApplication) return;

    const deleteApplicationDoc = async () => {
      try {
        setLoadingDelete(true);
        const docRef = doc(db, "joinUp", deleteApplication);
        await deleteDoc(docRef);
        setDeleteSuccess("Application deleted successfully");
        setDeleteApplication(null); // Clear id after successful delete to allow future deletes
      } catch (error: any) {
        setDeleteError(error.message || "An error occurred");
        console.error("Error deleting document:", error);
      } finally {
        setLoadingDelete(false);
      }
    };

    deleteApplicationDoc();
  }, [deleteApplication, db]);

  useEffect(() => {
    if (!deleteRejectedApplication) return;

    const deleteApplicationDoc = async () => {
      try {
        setLoadingDelete(true);
        const docRef = doc(db, "rejectedApplications", deleteRejectedApplication);
        await deleteDoc(docRef);
        setDeleteSuccess("Application deleted successfully");
        setDeleteRejectedApplication(null); // Clear id after successful delete to allow future deletes
      } catch (error: any) {
        setDeleteError(error.message || "An error occurred");
        console.error("Error deleting document:", error);
      } finally {
        setLoadingDelete(false);
      }
    };

    deleteApplicationDoc();
  }, [deleteRejectedApplication, db]);








  return (
    <joinUpContext.Provider value={{
      setJoinUpUser,
      joinUpSuccess,
      setJoinUpError,
      joinUpError,
      loadingJU,

      setDeleteApplication,
      setDeleteRejectedApplication,
      deleteSuccess,
      deleteError,
      loadingDelete,


    }}>
      {children}
    </joinUpContext.Provider>
  );
};
export default JoinUpProvider;
