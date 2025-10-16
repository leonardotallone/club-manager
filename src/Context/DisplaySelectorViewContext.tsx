import { useState, createContext } from "react";

export const displaySelectorViewContext = createContext(null);

const DisplayAdminSelectorProvider = ({ children }) => {

    const [activeAdminView, setActiveAdminView] = useState("AdminDashboard");
    const [activeUserView, setActiveUserView] = useState("UserDashboard");

    return (
        <displaySelectorViewContext.Provider value={{
            activeAdminView,
            activeUserView,

            setActiveAdminView,
            setActiveUserView
        }}>
            {children}
        </displaySelectorViewContext.Provider>
    );
};
export default DisplayAdminSelectorProvider;