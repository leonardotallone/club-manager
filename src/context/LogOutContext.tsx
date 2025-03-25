import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const logOutContext = createContext(null);

interface SignIn {
    userID: Number;
}
const LogOutProvider = ({ children }) => {

    const [userID, setUserID] = useState<SignIn | null>();
    const [logOutSuccess, setLogOutSuccess] = useState("")
    const [logOutError, setLogOutError] = useState("")
    const [loading, setLoading] = useState(false)

    console.log("USER ID",userID)

    useEffect(() => {
        if (userID) {
            setLoading(true); // Show ActivityIndicator when action starts
            setLogOutError("");
            axios
                .post("https://masterclub.com.ar/api/Auth/logout", userID)
                .then((response) => {
                    setLogOutSuccess(response.data)
                    // console.log("LOGOUT MESSAGE",logOutSuccess)
                })
                .catch((error) => {
                    setLogOutError(error.response.data);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userID]);

    return (
        <logOutContext.Provider value={{ setUserID, logOutSuccess, logOutError, loading }}>
            {children}
        </logOutContext.Provider>
    );
};
export default LogOutProvider;
