import React, { useState, createContext, useEffect, useContext } from "react";
import { FIREBASE_APP } from "../Firebase/Firebase"
import { getFirestore, doc, updateDoc } from "firebase/firestore";

import { getAllUsersContext } from "./GetAllUsersContext";


export const updateUserProfileContext = createContext(null);

interface UserInformation {
  id: string;
}
const UpdateUserProfileProvider = ({ children }) => {

  const [updateUserData, setUpdateUserData] = useState<any>();
  const [successmsj, setSuccessmsj] = useState<string>("");
  const [errormsj, setErrormsj] = useState<string>("");
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [realTimeLocation, setRealTimeLocation] = useState<any>();

  // const { loguedUserInformation } = useContext(getAllUsersContext);
  const { loguedUserInformation } = useContext(getAllUsersContext) as unknown as { loguedUserInformation: UserInformation };

  // const { imageURL } = useContext(avatarUploaderContext);

  // const { subscription } = useContext( payPalSubscriptionSubscribeContext);
  // const { subscriptionDetails} = useContext( paypalSubscriptionDetailsContext);
  // const { subscriptionCancelSuccess } = useContext(paypalSubscriptionCancelContext);


  const db = getFirestore(FIREBASE_APP);

  useEffect(() => {
    const updateUserProfile = async () => {
      if (updateUserData && loguedUserInformation) {
        setLoadingUpdate(true);
        const userDocRef = doc(db, "users", loguedUserInformation.id);
        try {
          await updateDoc(userDocRef, updateUserData);
          setSuccessmsj("User profile updated successfully!");
          setUpdatedUser(updateUserData); // Update updatedUser state with new data
        } catch (error) {
          setErrormsj("Error updating user profile");
        } finally {
          setLoadingUpdate(false);
        }
      }
    };
    updateUserProfile();
  }, [updateUserData, db, loguedUserInformation]);

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

  useEffect(() => {
    const updateUserProfile = async () => {
      if (
        realTimeLocation &&
        loguedUserInformation &&
        loguedUserInformation.id
      ) {
        const RTLocation = {
          realTimeLocation: realTimeLocation,
        };
        // console.log("location", RTLocation);

        const userDocRef = doc(db, "users", loguedUserInformation.id);
        try {
          await updateDoc(userDocRef, RTLocation);
          // setSuccessmsj("User profile updated successfully!");
          setUpdatedUser(RTLocation); // Update updatedUser state with new data
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateUserProfile();
  }, [realTimeLocation]);


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
        setUpdateUserData,
        successmsj,
        errormsj,
        setSuccessmsj,
        setErrormsj,
        updatedUser,
        loadingUpdate,
        setRealTimeLocation,
      }}
    >
      {children}
    </updateUserProfileContext.Provider>
  );
};
export default UpdateUserProfileProvider;
