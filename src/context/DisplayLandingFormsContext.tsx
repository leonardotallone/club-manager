import { useState, createContext } from "react";

export const displayLandingFormsContext = createContext(null);

const DisplayLandingFormsProvider = ({ children }) => {
    const [join, setJoin] = useState(false);

    return (
        <displayLandingFormsContext.Provider value={{ join, setJoin }}>
            {children}
        </displayLandingFormsContext.Provider>
    );
};
export default DisplayLandingFormsProvider;
