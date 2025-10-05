import { useState, createContext, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_APP } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc } from "firebase/firestore";



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
  admition: string;
  groupHead: boolean;
  familyGroup: object;
}

const SignUpProvider = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState<User | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rejectApplication, setRejectApplication] = useState(false)
  const [acceptApplication, setAcceptApplication] = useState(false)


  const [idForDeleteApplication, setIdForDeleteApplication] = useState(null)

  // console.log("USER ID CONTEXT", idForDeleteApplication)
  // console.log("USER EN CONTEXT", signUpUser)
  // console.log("ERROR CONTEXT", signUpError)
  console.log("Rejected App", rejectApplication)
  console.log("SIGNUP USER", signUpUser)
  console.log("Loading ", loading)


  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    if (acceptApplication && signUpUser) {



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
            avatarURL: signUpUser.avatarURL,
            gender: signUpUser.gender,

            email: signUpUser.email,
            admin: false,
            disciplines: signUpUser.disciplines,
            category: signUpUser.category,
            blockade: false,
            admition: signUpUser.admition,
            familyGroup: signUpUser.familyGroup,
          };

          // Agregar documento a Firestore
          await addDoc(collection(db, "users"), userData);

          setSignUpSuccess("User created successfully");
        } catch (error: any) {
          setSignUpError(error.message || "Error creating user");
        } finally {

          const timeoutId = setTimeout(() => {
            const deleteDocAsync = async () => {
              try {
                if (!idForDeleteApplication) return; // Validar que id esté definido

                const docRef = doc(db, "joinUp", idForDeleteApplication);
                await deleteDoc(docRef);
              } catch (error: any) {
                console.log(error.message || "An error occurred");
              }
            };
            deleteDocAsync();
          }, 5000);
          setLoading(false);
          setSignUpUser(null); // Limpiar para evitar duplicados
          setAcceptApplication(false);
          return () => clearTimeout(timeoutId);
        }
      };

      createUserAndAddDoc();
    }
  }, [signUpUser, auth, db]);


useEffect(() => {
  if (rejectApplication && signUpUser) {
    setLoading(true);

    let timeoutId: NodeJS.Timeout | null = null;

    const rejectedApplication = async () => {
      try {
        const userData = {
          name: signUpUser.name,
          lastName: signUpUser.lastName,
          address: signUpUser.address,
          birthDate: signUpUser.birthDate,
          dni: signUpUser.dni,
          contactNumber: signUpUser.contactNumber,
          avatarURL: signUpUser.avatarURL,
          gender: signUpUser.gender,
          email: signUpUser.email,
          admin: false,
          disciplines: signUpUser.disciplines,
          category: signUpUser.category,
          blockade: false,
          admition: "rejected",
          familyGroup: signUpUser.familyGroup,
        };

        await addDoc(collection(db, "rejectedApplications"), userData);
      } catch (error: any) {
        console.log(error.message || "Error rejecting user");
      } finally {
        timeoutId = setTimeout(async () => {
          if (!idForDeleteApplication) return;

          const docRef = doc(db, "joinUp", idForDeleteApplication);
          try {
            await deleteDoc(docRef);
          } catch (error: any) {
            console.log(error.message || "An error occurred");
          }
        }, 5000);
        setLoading(false);
        setSignUpUser(null);
        setRejectApplication(false);
        return () => clearTimeout(timeoutId);
      }
    };

    rejectedApplication();

  }
}, [rejectApplication, signUpUser, db, idForDeleteApplication]);



















  return (
    <signUpContext.Provider value={{ setSignUpUser, setIdForDeleteApplication, setRejectApplication, setAcceptApplication, signUpSuccess, signUpError, loading }}>
      {children}
    </signUpContext.Provider>
  );
};

export default SignUpProvider;

