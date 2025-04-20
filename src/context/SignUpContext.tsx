// import { useState, createContext, useEffect } from "react";
// import axios from "axios";

// export const signUpContext = createContext(null);

// const SignUpProvider = ({ children }) => {
//   const [signUpUser, setSignUpUser] = useState();
//   const [signUpSuccess, setSignUpSuccess] = useState([])
//   const [signUpError, setSignUpError] = useState([])
//   const [loading, setLoading] = useState(false)

//   console.log("SIGNUP EN CONTEXT",signUpUser)

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .post("http://10.25.14.90:3001/lotes/crearLote", signUpUser)
//       .then((response) => {
//         setSignUpSuccess(response.data);
//       })
//       .catch((error) => {
//         setSignUpError(error.message);
//         console.error("Error al obtener Usuarios:", error.message);
//       });
//     setLoading(false);
//   }, [signUpUser]);

//   return (
//     <signUpContext.Provider value={{ setSignUpUser, signUpSuccess, signUpError, loading }}>
//       {children}
//     </signUpContext.Provider>
//   );
// };
// export default SignUpProvider;

import { useState, createContext, useEffect } from "react";
import { FIREBASE_AUTH } from "../Firebase/Firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {FIREBASE_APP} from "../Firebase/Firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const signUpContext = createContext(null);

interface User {
  email: string;
  password: string;
  name: string;
  lastName: string;
  birthday: string;
  gender: string;
  location: string;
  geometryLocation: object;
  phone: string;
  motorcycle: { make: string };
  avatarURL: string;
}

const SignUpProvider = ({ children }) => {
  const [signUpUser, setSignUpUser] = useState<User | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState("")
  const [signUpError, setSignUpError] = useState("")
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH;
  const db = getFirestore(FIREBASE_APP);

console.log("USER",signUpUser)

  useEffect(() => {
    const createUserAndAddDoc = async () => {
      try {
        setLoading(true); // Show ActivityIndicator when action starts
        if (signUpUser) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            signUpUser.email,
            signUpUser.password,
          );

          // If user creation is successful
          setSignUpSuccess("User created successfully");

          // const userData = {
          //   email: signUpUser.email,
          //   name: signUpUser.name,
          //   lastName: signUpUser.lastName,
          //   birthday: signUpUser.birthday,
          //   gender: signUpUser.gender,
          //   location: signUpUser.location,
          //   geometryLocation: signUpUser.geometryLocation,
          //   realTimeLocation:"",
          //   admin: false,
          //   phone: signUpUser.phone,
          //   motorcycle:{make:"Harley-Davidson"},
          //   avatarURL:"",
          // };

          // // Add user data to Firestore only if user creation is successful
          // const docRef = await addDoc(collection(db, "users"), userData);
          // // console.log("Document written with ID: ", docRef.id);
        }
      } catch (error) {
        // If user creation is not successful
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

  return (
    <signUpContext.Provider value={{ setSignUpUser, signUpSuccess, signUpError, loading }}>
      {children}
    </signUpContext.Provider>
  );
};
export default SignUpProvider;


