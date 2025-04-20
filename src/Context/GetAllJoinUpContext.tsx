import React, { useState, createContext, useEffect, useContext } from "react";
import {
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
} from "firebase/firestore";
import { FIREBASE_APP } from "../Firebase/Firebase";

export const getAllJoinUpContext = createContext(null);

const GetAllJoinUpProvider = ({ children }) => {
    const [allJoinUp, setAllJoinUp] = useState([]);
    const [loadingJoinUp, setLoadingJoinUp] = useState(false);



    const db = getFirestore(FIREBASE_APP);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const collectionRef = collection(db, "joinUp");
                const querySnapshot = await getDocs(collectionRef);

                const documentsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllJoinUp(documentsData);
            } catch (error) {
                console.error("Error fetching documents:", error.message);
            }
        };
        fetchDocuments();

        const unsubscribe = onSnapshot(collection(db, "joinUp"), (snapshot) => {
            const documentsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllJoinUp(documentsData);
        });

        return () => unsubscribe();
    }, [db]);





    return (
        <getAllJoinUpContext.Provider
            value={{
                allJoinUp,
                loadingJoinUp
            }}
        >
            {children}
        </getAllJoinUpContext.Provider>
    );
};
export default GetAllJoinUpProvider;