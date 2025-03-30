import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const newPasswordContext = createContext(null);

interface PasswordObject {
    email: string;
    token: string;
    newPassword: string;
}
const NewPasswordProvider = ({ children }) => {

    const [resetPasswordObject, setResetPassworObject] = useState<PasswordObject | null>(null);
    const [newPasswordSuccess, setNewPasswordSuccess] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [loadingNp, setLoadingNp] = useState(false)

    console.log("PASSWORD OBJECT", resetPasswordObject)

    useEffect(() => {
        if (resetPasswordObject) {
            setLoadingNp(true);
            setNewPasswordError("");
            axios
                .post("https://masterclub.com.ar/api/Auth/reset-password", resetPasswordObject)
                .then((response) => {
                    console.log("RESPUESTA", response.data);
                    setNewPasswordSuccess(response.data);
                })
                .catch((error) => {
                    console.log("ERROR", error)
                    setNewPasswordError("La contraseña no pudo ser restablecida");
                })
                .finally(() => {
                    setLoadingNp(false);
                });
        }
    }, [resetPasswordObject]);

    return (
        <newPasswordContext.Provider value={{ setResetPassworObject, setNewPasswordError, newPasswordError, newPasswordSuccess, loadingNp }}>
            {children}
        </newPasswordContext.Provider>
    );
};
export default NewPasswordProvider;
