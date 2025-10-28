import React, { useState, createContext, useEffect } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase"
import { getFirestore, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

export const updateUserProfileContext = createContext(null);

interface UserInformation {
  id: string;
}

interface FamilyMember {
  dni: string;
  [key: string]: any; // Add other properties as needed
}

const UpdateUserProfileProvider = ({ children }) => {

  const [userForEdit, setUserForEdit] = useState<any>()

  const [updateUserData, setUpdateUserData] = useState<any>()
  const [docId, setDocId] = useState<string | undefined>()
  console.log("DOC ID",docId)
  const [familyUser, setFamilyUser] = useState<FamilyMember | undefined>()
  const [UpdateFamilyUser, setUpdateFamilyUser] = useState<FamilyMember | undefined>()
  const [removeFamilyMember, setRemoveFamilyMember] = useState<any>()

  const [successmsj, setSuccessmsj] = useState<string>("");
  const [errormsj, setErrormsj] = useState<string>("");

  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);


  // const { loguedUserInformation } = useContext(getAllUsersContext);
  // const { loguedUserInformation } = useContext(getAllUsersContext) as unknown as { loguedUserInformation: UserInformation };

  // const { imageURL } = useContext(avatarUploaderContext);

  // const { subscription } = useContext( payPalSubscriptionSubscribeContext);
  // const { subscriptionDetails} = useContext( paypalSubscriptionDetailsContext);
  // const { subscriptionCancelSuccess } = useContext(paypalSubscriptionCancelContext);
  // console.log("UPDATE USER DATA EN CONTEXT", updateUserData)
  // console.log("DOC ID", docId)
  // console.log("FAMILY USER", familyUser)

  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const updateUserProfile = async () => {
      if (updateUserData && docId) {
        setLoading(true);
        const userDocRef = doc(db, "users", docId);
        try {
          await updateDoc(userDocRef, updateUserData);
          console.log("🔥 Actualización exitosa!");
          setSuccessmsj("User profile updated successfully!");
        } catch (error) {
          console.error("Error updating document: ", error);
          setErrormsj("Error updating user profile");
        } finally {
          setLoading(false);
        }
      }
    };
    updateUserProfile();
  }, [updateUserData, db, docId]);


  useEffect(() => {
    const addFamilyUser = async () => {
      if (familyUser && docId) {
        setLoading(true);
        const userDocRef = doc(db, "users", docId);

        try {
          await updateDoc(userDocRef, {
            familyGroup: arrayUnion(familyUser),
          });

          console.log("👨‍👩‍👧‍👦 Family user agregado correctamente!");
          setSuccessmsj("Family user added successfully!");
        } catch (error) {
          console.error("❌ Error agregando family user: ", error);
          setErrormsj("Error adding family user");
        } finally {
          setLoading(false);
        }
      }
    };

    addFamilyUser();
  }, [familyUser, docId, db]);


  useEffect(() => {
    const updateFamilyUser = async () => {
      if (UpdateFamilyUser && docId) {
        setLoading(true);
        const userDocRef = doc(db, "users", docId);

        try {
          // 1️⃣ Obtenemos el documento actual
          const docSnap = await getDoc(userDocRef);
          const data = docSnap.data();
          const currentFamily: FamilyMember[] = data.familyGroup || [];

          // 2️⃣ Buscamos el familiar por su DNI (o podrías usar `id` si lo tienen)
          const updatedFamily = currentFamily.map((member: FamilyMember) =>
            member.dni === UpdateFamilyUser!.dni
              ? { ...member, ...UpdateFamilyUser }
              : member
          );


          console.log("FAMILIAR ACTUALIZADO:", UpdateFamilyUser);
          console.log("FAMILIA COMPLETA ACTUALIZADA:", updatedFamily);
          // 3️⃣ Subimos el array actualizado a Firestore
          await updateDoc(userDocRef, { familyGroup: updatedFamily });

          console.log("👨‍👩‍👧‍👦 Familiar actualizado correctamente!");
          setSuccessmsj("Family user updated successfully!");
        } catch (error) {
          console.error("❌ Error actualizando family user:", error);
          setErrormsj("Error updating family user");
        } finally {
          setLoading(false);
        }
      }
    };

    updateFamilyUser();
  }, [UpdateFamilyUser, docId, db]);


  useEffect(() => {
    const handleDeleteMember = async () => {
      if (!removeFamilyMember || !docId) return;

      setLoading(true);
      const userRef = doc(db, "users", docId);

      try {
        // 1️⃣ Obtener el documento actual
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) throw new Error("Usuario no encontrado");

        const userData = userSnap.data();
        const currentFamily = userData.familyGroup || [];

        // 2️⃣ Filtrar el familiar a eliminar
        const updatedFamily = currentFamily.filter(
          (m: any) => m.dni !== removeFamilyMember.dni
        );

        // 3️⃣ Actualizar el documento en Firestore
        await updateDoc(userRef, { familyGroup: updatedFamily });

        console.log("🗑️ Familiar eliminado correctamente!");
        setSuccessmsj("Family member removed successfully!");
        setRemoveFamilyMember(undefined); // Limpiar estado
      } catch (error) {
        console.error("❌ Error eliminando familiar:", error);
        setErrormsj("Error removing family member");
      } finally {
        setLoading(false);
      }
    };

    handleDeleteMember();
  }, [removeFamilyMember, docId, db]);

  // useEffect(() => {
  //   const updateUserProfile = async () => {
  //     if (imageURL) {
  //       const avatar = {
  //         avatarURL: imageURL,
  //       };

  //       const userDocRef = doc(db, "users", loguedUserInformation.id);
  //       try {
  //         await updateDoc(userDocRef, avatar);
  //         // setSuccessmsj("User profile updated successfully!");
  //         setUpdatedUser(avatar); // Update updatedUser state with new data
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   updateUserProfile();
  // }, [imageURL]);

  // useEffect(() => {
  //   const updateUserProfile = async () => {
  //     if (
  //       realTimeLocation &&
  //       loguedUserInformation &&
  //       loguedUserInformation.id
  //     ) {
  //       const RTLocation = {
  //         realTimeLocation: realTimeLocation,
  //       };
  //       // console.log("location", RTLocation);

  //       const userDocRef = doc(db, "users", loguedUserInformation.id);
  //       try {
  //         await updateDoc(userDocRef, RTLocation);
  //         // setSuccessmsj("User profile updated successfully!");
  //         setUpdatedUser(RTLocation); // Update updatedUser state with new data
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   updateUserProfile();
  // }, [realTimeLocation, db,loguedUserInformation]);


  // Subscription
  // useEffect(() => {
  //   const updateUserProfile = async () => {
  //     if (subscription) {
  //       const Update = {
  //         subscription: {
  //           id: subscription.id,
  //           status: subscription.status,
  //         },
  //       };
  //       const userDocRef = doc(db, "users", loguedUserInformation.id);
  //       try {
  //         await updateDoc(userDocRef, Update);
  //         setUpdatedUser(Update);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     if (subscriptionCancelSuccess) {
  //       const Update = {
  //         subscription: {
  //           id: subscriptionDetails.id,
  //           status: "CANCELLED",
  //         },
  //       };
  //       const userDocRef = doc(db, "users", loguedUserInformation.id);
  //       try {
  //         await updateDoc(userDocRef, Update);
  //         setUpdatedUser(Update);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   updateUserProfile();
  // }, [
  //   subscription,
  //   subscriptionDetails,
  //   db,
  //   subscriptionCancelSuccess,
  // ]);



  return (
    <updateUserProfileContext.Provider
      value={{
        userForEdit,
        updatedUser,
        loading,
        successmsj,
        errormsj,

        setUpdateUserData,
        setDocId,
        setFamilyUser,
        setUpdateFamilyUser,
        setRemoveFamilyMember,
        setSuccessmsj,
        setErrormsj,
        setUserForEdit

      }}
    >
      {children}
    </updateUserProfileContext.Provider>
  );
};
export default UpdateUserProfileProvider;
