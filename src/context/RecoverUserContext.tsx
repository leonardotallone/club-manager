import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const recoverUserContext = createContext(null);

interface SignIn {
    dni: string;
}
const RecoverUserProvider = ({ children }) => {

    const [dni, setDni] = useState<SignIn | null>();
    const [recoverUserSuccess, setRecoverUserSuccess] = useState("")
    const [recoverUserError, setRecoverUserError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (dni) {
            setLoading(true); // Show ActivityIndicator when action starts
            setRecoverUserError("");
            axios
                .post("https://masterclub.com.ar/api/Auth/recover-username", dni)
                .then((response) => {
                    setRecoverUserSuccess(response.data.message)
                    console.log("Response", response.data.message)
                })
                .catch((error) => {
                    setRecoverUserError(error.response.data.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [dni]);

    return (
        <recoverUserContext.Provider value={{ dni, setDni, recoverUserError,setRecoverUserError, recoverUserSuccess, loading }}>
            {children}
        </recoverUserContext.Provider>
    );
};
export default RecoverUserProvider;
