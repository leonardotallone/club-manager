import { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const joinUpContext = createContext(null);

interface User {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  date: string;
}

const JoinUpProvider = ({ children }) => {
  const [joinUpUser, setJoinUpUser] = useState<User | null>(null);
  const [joinUpSuccess, setJoinUpSuccess] = useState("");
  const [joinUpError, setJoinUpError] = useState("");
 
  const [loadingJU, setLoadingJU] = useState(false);

  const [deleteApplication, setDeleteApplication] = useState<string | null>(null);
  const [deleteRejectedApplication, setDeleteRejectedApplication] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);

  const db = getFirestore(FIREBASE_APP);

  // 🟢 Crear nuevo documento en "joinUp"
  useEffect(() => {
    if (!joinUpUser) return;

    const createUserAndAddDoc = async () => {
      try {
        setLoadingJU(true);

        // 🔍 Verificar si ya existe un usuario con el mismo email
        const q = query(collection(db, "joinUp"), where("email", "==", joinUpUser.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setJoinUpError("Ya existe una solicitud con este correo electrónico.");
          setJoinUpUser(null); // limpiar para evitar reintentos automáticos
          return;
        }

        // ✅ Si no existe, agregar el nuevo documento
        await addDoc(collection(db, "joinUp"), joinUpUser);
        setJoinUpSuccess("Solicitud enviada correctamente.");
        setJoinUpError(""); // limpiar errores previos
      } catch (error: any) {
        setJoinUpError(error.message || "Ocurrió un error al crear la solicitud.");
      } finally {
        setLoadingJU(false);
      }
    };

    createUserAndAddDoc();
  }, [joinUpUser, db]);

  // 🔴 Eliminar solicitudes activas
  useEffect(() => {
    if (!deleteApplication) return;

    const deleteApplicationDoc = async () => {
      try {
        setLoadingDelete(true);
        const docRef = doc(db, "joinUp", deleteApplication);
        await deleteDoc(docRef);
        setDeleteSuccess("Solicitud eliminada correctamente.");
        setDeleteApplication(null);
      } catch (error: any) {
        setDeleteError(error.message || "Error al eliminar la solicitud.");
      } finally {
        setLoadingDelete(false);
      }
    };

    deleteApplicationDoc();
  }, [deleteApplication, db]);

  // 🔴 Eliminar solicitudes rechazadas
  useEffect(() => {
    if (!deleteRejectedApplication) return;

    const deleteRejectedDoc = async () => {
      try {
        setLoadingDelete(true);
        const docRef = doc(db, "rejectedApplications", deleteRejectedApplication);
        await deleteDoc(docRef);
        setDeleteSuccess("Solicitud eliminada correctamente.");
        setDeleteRejectedApplication(null);
      } catch (error: any) {
        setDeleteError(error.message || "Error al eliminar la solicitud rechazada.");
      } finally {
        setLoadingDelete(false);
      }
    };

    deleteRejectedDoc();
  }, [deleteRejectedApplication, db]);

  return (
    <joinUpContext.Provider
      value={{
        setJoinUpUser,
        joinUpSuccess,
        setJoinUpSuccess,
        setDeleteSuccess,
        joinUpError,
        setJoinUpError,
        loadingJU,
        setDeleteApplication,
        setDeleteRejectedApplication,
        deleteSuccess,
        deleteError,
        loadingDelete,
      }}
    >
      {children}
    </joinUpContext.Provider>
  );
};

export default JoinUpProvider;
