import React, { useState, createContext, useEffect } from "react";
import {
    collection,
    getDocs,
    getFirestore,
    onSnapshot,
} from "firebase/firestore";
import { FIREBASE_APP } from "../Firebase/Firebase";

export const getAllJoinUpContext = createContext(null);

const GetAllJoinUpProvider = ({ children }) => {
    const [allApplications, setAllApplications] = useState<{} | undefined>(undefined);
    const [loadingApplications, setLoadingApplications] = useState(false);

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
                setAllApplications(documentsData);
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
            setAllApplications(documentsData);
        });

        return () => unsubscribe();
    }, [db]);





    return (
        <getAllJoinUpContext.Provider
            value={{
                allApplications,
                loadingApplications
            }}
        >
            {children}
        </getAllJoinUpContext.Provider>
    );
};
export default GetAllJoinUpProvider;