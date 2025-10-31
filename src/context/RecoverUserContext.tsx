import { useState, createContext, useEffect, useContext } from "react";
import { getAllUsersContext } from "../Context/GetAllUsersContext";

export const recoverUserContext = createContext(null);

const RecoverUserProvider = ({ children }) => {
    const { allUsers } = useContext(getAllUsersContext);


    const [dni, setDni] = useState<{ dni: string } | null>(null);
    const [recoverUserSuccess, setRecoverUserSuccess] = useState("");
    const [recoverUserError, setRecoverUserError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dni?.dni) { // ✅ accedemos correctamente al string
            setLoading(true);

            const userFound = allUsers.find(
                (user: { dni: any; }) => String(user.dni).trim() === String(dni.dni).trim()
            );

            if (!userFound) {
                setRecoverUserError("El Documento ingresado, no se encuentra registrado");
                setRecoverUserSuccess("");
            } else {
                setRecoverUserSuccess(userFound.email); // ✅ guardamos email
                setRecoverUserError("");
            }

            setLoading(false);
        }
    }, [dni, allUsers]);

    return (
        <recoverUserContext.Provider
            value={{
                dni,
                setDni,
                recoverUserError,
                setRecoverUserError,
                setRecoverUserSuccess,
                recoverUserSuccess,
                loading
            }}
        >
            {children}
        </recoverUserContext.Provider>
    );
};

export default RecoverUserProvider;
