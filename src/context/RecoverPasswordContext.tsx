// RecoverPasswordProvider.tsx
import React, { useState, createContext, useContext } from "react";
import { FIREBASE_AUTH } from "../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { getAllUsersContext } from "../Context/GetAllUsersContext";

type RecoverCtxType = {
  // solo exponemos lo necesario
  loading: boolean;
  handlePasswordReset: (emailToSend: string) => Promise<{ ok: boolean; message?: string }>;
};

export const recoverPasswordContext = createContext<RecoverCtxType | null>(null);

const RecoverPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { allUsers } = useContext(getAllUsersContext);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handlePasswordReset = async (emailToSend: string) => {
    // Limpiado local (no usamos resetError en el provider)
    // Verificamos existencia:
    const exists = allUsers?.some((user: { email: string }) => user.email === emailToSend);

    if (!exists) {
      return { ok: false, message: "No hay usuario registrado con el correo ingresado" };
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, emailToSend);
      return { ok: true, message: "Correo de recuperación enviado correctamente" };
    } catch (error: any) {
      // Estandarizo el mensaje
      const msg = error?.message ? `Error al enviar el correo: ${error.message}` : "Error al enviar el correo";
      return { ok: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <recoverPasswordContext.Provider value={{ loading, handlePasswordReset }}>
      {children}
    </recoverPasswordContext.Provider>
  );
};

export default RecoverPasswordProvider;
