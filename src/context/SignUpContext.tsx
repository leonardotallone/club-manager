import { useState, createContext, useEffect } from "react";
import { FIREBASE_AUTH } from "../Firebase/Firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_APP } from "../Firebase/Firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const signUpContext = createContext(null);

interface User {
  name: string;
  lastName: string;
  address: string;
  birthDate: Date,
  dni: string,
  contactNumber: string;
  avatarURL: string,
  gender: string;

  email: string;
  admin: boolean,
  
  disciplines: object,
  category: object,
  blockade: boolean,
  groupHead: boolean,
  familyGroup: object,
}

const SignUpProvider = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState<User | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState("")
  const [signUpError, setSignUpError] = useState("")
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const createUserAndAddDoc = async () => {
      try {
        setLoading(true); // Show ActivityIndicator when action starts
        if (signUpUser) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            signUpUser.email,
            signUpUser.dni,
          );

          // If user creation is successful
          setSignUpSuccess("User created successfully");

          const userData = {
            name: signUpUser.name,
            lastName: signUpUser.lastName,
            address: signUpUser.address,
            birthDate: signUpUser.birthDate,
            dni: signUpUser.dni,
            contactNumber: signUpUser.contactNumber,
            avatarURL: "",
            gender: signUpUser.gender,

            email: signUpUser.email,
            admin: false,
      
            disciplines: signUpUser.disciplines,
            category: signUpUser.category,
            blockade: false,
            groupHead: signUpUser.groupHead,
            familyGroup: signUpUser.familyGroup,
          };

          // Add user data to Firestore only if user creation is successful
          const docRef = await addDoc(collection(db, "users"), userData);
          // console.log("Document written with ID: ", docRef.id);
        }
      } catch (error) {
        console.log(error)
        setSignUpError(error.message);
      } finally {
        setLoading(false); // Hide ActivityIndicator when action finishes
      }
    };

    createUserAndAddDoc();

    return () => {
      // Cleanup function
      setSignUpUser(null);
    };
  }, [signUpUser, auth, db]);

  useEffect(() => {
    const AddDoc = async () => {
      try {
        setLoading(true); // Show ActivityIndicator when action starts
        if (signUpUser) {

          const userData = {
            name: signUpUser.name,
            lastName: signUpUser.lastName,
            address: signUpUser.address,
            birthDate: signUpUser.birthDate,
            dni: signUpUser.dni,
            contactNumber: signUpUser.contactNumber,
            avatarURL: "",
            gender: signUpUser.gender,

            email: signUpUser.email,
            admin: false,
      
            disciplines: signUpUser.disciplines,
            category: signUpUser.category,
            blockade: false,
            groupHead: signUpUser.groupHead,
            familyGroup: signUpUser.familyGroup,
          };

          // Add user data to Firestore only if user creation is successful
          const docRef = await addDoc(collection(db, "users"), userData);
          // console.log("Document written with ID: ", docRef.id);
        }
      } catch (error) {
        console.log(error)
        setSignUpError(error.message);
      } finally {
        setLoading(false); // Hide ActivityIndicator when action finishes
      }
    };

    AddDoc();

    return () => {
      // Cleanup function
      setSignUpUser(null);
    };
  }, [signUpUser, db]);

  return (
    <signUpContext.Provider value={{ setSignUpUser, signUpSuccess, signUpError, loading }}>
      {children}
    </signUpContext.Provider>
  );
};
export default SignUpProvider;


