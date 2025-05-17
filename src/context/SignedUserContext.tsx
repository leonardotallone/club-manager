import React, { useState, createContext, useEffect } from "react";

export const signedUserContext = createContext(null);


interface SignIn {
    email: string;
    password: string;
}

const SignedUserContext = ({ children }) => {
    const [signedUser, setSignedUser] = useState<SignIn>();
    const [loading, setLoading] = useState(false);
    const [signedUserError, setSignedUserError] = useState();
    const [loguedUser, setLoguedUser] = useState({
        token: "",
        email: "",
        uid: "",
    });

    console.log("USUARIO CONECTADO", signedUser)

    //   useEffect(() => {
    //     const signIn = async () => {
    //       try {
    //         if (signInUser) {
    //           setLoading(true);
    //           const response = await signInWithEmailAndPassword(auth, signInUser.email, signInUser.password);
    //           const userWithAccessToken = response.user as unknown as { accessToken: string; email: string; uid: string };
    //           // setLoguedUser({
    //           //   token: response.user.accessToken,
    //           //   email: response.user.email,
    //           //   uid: response.user.uid
    //           // });

    //           setLoguedUser({
    //             token: userWithAccessToken.accessToken,
    //             email: userWithAccessToken.email,
    //             uid: userWithAccessToken.uid
    //           });
    //         }
    //       } catch (error) {
    //         setSignInError(error.message);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     signIn();
    //   }, [signInUser]);

    return (
        <signedUserContext.Provider
            value={{ signedUser, signedUserError, loguedUser, setLoguedUser, loading }}
        >
            {children}
        </signedUserContext.Provider>
    );
};
export default SignedUserContext;
