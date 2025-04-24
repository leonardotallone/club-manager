import { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const joinUpContext = createContext(null);

interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
}
const JoinUpProvider = ({ children }) => {
  const [joinUpUser, setJoinUpUser] = useState<User | null>(null);
  const [joinUpSuccess, setJoinUpSuccess] = useState("")
  const [joinUpError, setJoinUpError] = useState("")
  const [loadingJU, setLoadingJU] = useState(false)

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

  return (
    <joinUpContext.Provider value={{ setJoinUpUser, joinUpSuccess, setJoinUpError, joinUpError, loadingJU, }}>
      {children}
    </joinUpContext.Provider>
  );
};
export default JoinUpProvider;
