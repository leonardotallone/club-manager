import { useState, createContext } from "react";

export const controlModalsContext = createContext(null);

const ControlModalsProvider = ({ children }) => {

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    return (
        <controlModalsContext.Provider value={{ openAdd, openEdit, setOpenAdd, setOpenEdit }}>
            {children}
        </controlModalsContext.Provider>
    );
};
export default ControlModalsProvider;