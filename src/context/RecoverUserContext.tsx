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
                    setRecoverUserSuccess(response.data)
                    // console.log("Response", response.data)
                })
                .catch((error) => {
                    setRecoverUserError(error.response.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [dni]);

    return (
        <recoverUserContext.Provider value={{ dni, setDni, recoverUserError, recoverUserSuccess, loading }}>
            {children}
        </recoverUserContext.Provider>
    );
};
export default RecoverUserProvider;
