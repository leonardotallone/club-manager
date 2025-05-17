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
  
  const db = getFirestore(FIREBASE_APP);


  type User = {
    id: string;
    name: string;
    lastName: string;
    email: string;
    // add other fields you expect from the "users" collection
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, "users");
        const querySnapshot = await getDocs(collectionRef);

        const documentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">),
        }));
        const sortedUsers = documentsData.sort((a, b) => {
          const lastNameComparison = a.lastName.localeCompare(b.lastName);
          if (lastNameComparison !== 0) {
            return lastNameComparison;
          }
          // Si los apellidos son iguales, ordenar por nombre
          return a.name.localeCompare(b.name);
        });
        setAllUsers(sortedUsers);
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
          ...(doc.data() as Omit<User, "id">),
        }));
        const sortedUsers = documentsData.sort((a, b) => {
          const lastNameComparison = a.lastName.localeCompare(b.lastName);
          if (lastNameComparison !== 0) {
            return lastNameComparison;
          }
          // Si los apellidos son iguales, ordenar por nombre
          return a.name.localeCompare(b.name);
        });
        setAllUsers(sortedUsers);
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

