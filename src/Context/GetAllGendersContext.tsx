import { useState, createContext, useEffect, ReactNode } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";

export interface GenderDocument {
    id: string;
    genders: string[];
}

interface GendersContextType {
    genders: string[] | undefined;
    loadingGenders: boolean;
}

export const getAllGendersContext = createContext<GendersContextType | null>(null);

interface Props {
    children: ReactNode;
}

const GetAllGendersProvider = ({ children }: Props) => {
    const [genders, setGenders] = useState<string[] | undefined>(undefined);
    const [loadingGenders, setLoadingGenders] = useState(false);

    const db = getFirestore(FIREBASE_APP);

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoadingGenders(true);
            try {
                const collectionRef = collection(db, "genders");
                const querySnapshot = await getDocs(collectionRef);

                const documentsData: GenderDocument[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as { genders: string[] }),
                }));

                setGenders(documentsData[0]?.genders);
            } catch (error: any) {
                console.error("Error fetching documents:", error.message);
            } finally {
                setLoadingGenders(false);
            }
        };
        fetchDocuments();

        const unsubscribe = onSnapshot(collection(db, "genders"), (snapshot) => {
            const documentsData: GenderDocument[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as { genders: string[] }),
            }));

            setGenders(documentsData[0]?.genders);
        });

        return () => unsubscribe();
    }, [db]);

    return (
        <getAllGendersContext.Provider value={{ genders, loadingGenders }}>
            {children}
        </getAllGendersContext.Provider>
    );
};

export default GetAllGendersProvider;
