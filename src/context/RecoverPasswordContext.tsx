import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const recoverPasswordContext = createContext(null);

interface SignIn {
    email: string;
}
const RecoverPasswordProvider = ({ children }) => {

    const [email, setEmail] = useState<SignIn | null>(null);
    const [recoverPasswordSuccess, setRecoverPasswordSuccess] = useState("")
    const [recoverPasswordError, setRecoverPasswordError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (email) {
            setLoading(true); // Show ActivityIndicator when action starts
            setRecoverPasswordError("");
            axios
                .post("https://masterclub.com.ar/api/Auth/forgot-password", email)
                .then((response) => {
                    setRecoverPasswordSuccess(response.data)
                    // console.log("Response", response.data)
                })
                .catch((error) => {
                    setRecoverPasswordError(error.response.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [email]);
    return (
        <recoverPasswordContext.Provider value={{ email, setEmail, recoverPasswordError, recoverPasswordSuccess, loading }}>
            {children}
        </recoverPasswordContext.Provider>
    );
};
export default RecoverPasswordProvider;
