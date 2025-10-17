import { useState, createContext, useEffect } from "react";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signInUserContext = createContext(null);

interface SignIn {
  email: string;
  password: string;
}
const SignInUserProvider = ({ children }) => {

  const [credentials, setCredentials] = useState<SignIn>();
  const [loguedUser, setLoguedUser] = useState(JSON.parse(localStorage.getItem("LoguedUser")));
  const [signInError, setSignInError] = useState("")
  const [loading, setLoading] = useState(false)

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const signIn = async () => {
      try {
        if (credentials) {
          setLoading(true);
          const response = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const userWithAccessToken = response.user as unknown as { accessToken: string; email: string; uid: string };

          const user = {
            token: userWithAccessToken.accessToken,
            email: userWithAccessToken.email,
            uid: userWithAccessToken.uid
          }
          localStorage.setItem("LoguedUser", JSON.stringify(user));
          setLoguedUser({
            token: userWithAccessToken.accessToken,
            email: userWithAccessToken.email,
            uid: userWithAccessToken.uid
          });
        }
      } catch (error) {
        setSignInError(error.message);
      } finally {
        setLoading(false);
      }
    };

    signIn();
  }, [credentials,auth]);

  return (
    <signInUserContext.Provider value={{ setCredentials, setSignInError, signInError, loading, loguedUser, setLoguedUser }}>
      {children}
    </signInUserContext.Provider>
  );
};
export default SignInUserProvider;


