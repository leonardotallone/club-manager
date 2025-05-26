import { useState, createContext, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_APP } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const signUpContext = createContext(null);

interface User {
  name: string;
  lastName: string;
  address: string;
  birthDate: Date;
  dni: string;
  contactNumber: string;
  avatarURL: string;
  gender: string;
  email: string;
  admin: boolean;
  disciplines: object;
  category: object;
  blockade: boolean;
  admition: boolean;
  groupHead: boolean;
  familyGroup: object;
}

const SignUpProvider = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState<User | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    if (!signUpUser) return; // No hacer nada si es null

    const createUserAndAddDoc = async () => {
      setLoading(true);
      setSignUpSuccess("");
      setSignUpError("");
      try {
        // Crear usuario en Firebase Auth
        await createUserWithEmailAndPassword(auth, signUpUser.email, signUpUser.dni);

        // Preparar datos para Firestore
        const userData = {
          name: signUpUser.name,
          lastName: signUpUser.lastName,
          address: signUpUser.address,
          birthDate: signUpUser.birthDate,
          dni: signUpUser.dni,
          contactNumber: signUpUser.contactNumber,
          avatarURL: signUpUser.avatarURL || "",
          gender: signUpUser.gender,
          email: signUpUser.email,
          admin: false,
          disciplines: signUpUser.disciplines,
          category: signUpUser.category,
          blockade: false,
          admition: true,
          groupHead: signUpUser.groupHead,
          familyGroup: signUpUser.familyGroup,
        };

        // Agregar documento a Firestore
        await addDoc(collection(db, "users"), userData);

        setSignUpSuccess("User created successfully");
      } catch (error: any) {
        setSignUpError(error.message || "Error creating user");
      } finally {
        setLoading(false);
        setSignUpUser(null); // Limpiar para evitar duplicados
      }
    };

    createUserAndAddDoc();
  }, [signUpUser, auth, db]);

  return (
    <signUpContext.Provider value={{ setSignUpUser, signUpSuccess, signUpError, loading }}>
      {children}
    </signUpContext.Provider>
  );
};

export default SignUpProvider;

