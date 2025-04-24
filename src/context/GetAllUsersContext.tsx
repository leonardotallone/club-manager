import React, { useState, createContext, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { signInContext } from "./SignInContext"

export const getAllUsersContext = createContext(null);

const GetAllUsersProvider = ({ children }) => {

  const { loguedUser } = useContext(signInContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loguedUserInformation, setLoguedUserInformation] = useState();

  const [loading, setLoading] = useState(false)

  // console.log("ALL USERS", allUsers)
  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, "users");
        const querySnapshot = await getDocs(collectionRef);

        const documentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(documentsData);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();

    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const documentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllUsers(documentsData);
      }
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    if (loguedUser && allUsers.length > 0) {
      setLoguedUserInformation(
        allUsers.find((user) => user.email === loguedUser.email) //Consider use "some" insted find
      );
    }
  }, [allUsers, loguedUser]);


  return (
    <getAllUsersContext.Provider value={{ loading, allUsers, loguedUserInformation, setLoguedUserInformation }}>
      {children}
    </getAllUsersContext.Provider>
  );
};
export default GetAllUsersProvider;

