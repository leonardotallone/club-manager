import React, { useState, createContext, useContext } from "react";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAllUsersContext } from "../Context/GetAllUsersContext";

export const recoverPasswordContext = createContext(null);

const RecoverPasswordProvider = ({ children }) => {
  const { allUsers } = useContext(getAllUsersContext);
  const [loading, setLoading] = useState(false);
  const [recoverPasswordSuccess, setRecoverPasswordSuccess] = useState("");
  const [recoverPasswordError, setRecoverPasswordError] = useState("");

  const auth = FIREBASE_AUTH;

  // ✅ Función que maneja toda la lógica de envío
  const handleRecoverPassword = async (email: string) => {
    setRecoverPasswordError("");
    setRecoverPasswordSuccess("");
    setLoading(true);

    try {
      // 🔍 Verificamos si el email existe en Firestore
      const exists = allUsers?.some((user: { email: string }) => user.email === email);

      if (!exists) {
        setRecoverPasswordError("No hay usuario registrado con el correo ingresado");
        return false;
      }

      // 📤 Si existe, enviamos el correo de recuperación
      await sendPasswordResetEmail(auth, email);
      setRecoverPasswordSuccess("Correo enviado exitosamente, controle su casilla de correo");
      return true;
    } catch (error: any) {
      setRecoverPasswordError("Ocurrió un error al enviar el correo, intentelo nuevamente mas tarde");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <recoverPasswordContext.Provider
      value={{
        loading,
        recoverPasswordSuccess,
        setRecoverPasswordSuccess,
        recoverPasswordError,
        setRecoverPasswordError,
        handleRecoverPassword, // 👈 exportamos la función lista para usar
      }}
    >
      {children}
    </recoverPasswordContext.Provider>
  );
};

export default RecoverPasswordProvider;
