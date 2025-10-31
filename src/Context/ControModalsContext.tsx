import { useState, createContext } from "react";

export const controlModalsContext = createContext(null);

const ControlModalsProvider = ({ children }) => {

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [openLogin, setOpenLogin] = useState(false)
    const [openRecoverPassword, setOpenRecoverPassword] = useState(false)
    const [openRecoverEmail, setOpenRecoverEmail] = useState(false)

    const [openJoinUp, setOpenJoinUp] = useState(false);

    return (
        <controlModalsContext.Provider value={{
            openAdd,
            openEdit,
            openLogin,
            openRecoverPassword,
            openRecoverEmail,
            openJoinUp,

            setOpenLogin,
            setOpenRecoverPassword,
            setOpenRecoverEmail,
            setOpenAdd,
            setOpenEdit,
            setOpenJoinUp
        }}>
            {children}
        </controlModalsContext.Provider>
    );
};
export default ControlModalsProvider;