import React, { useState, createContext, useEffect, useContext } from "react";
import { FIREBASE_AUTH } from "../Firebase/Firebase"
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject
} from "firebase/storage";

import { signInUserContext } from "./SignInUserContext";
import { getAllUsersContext } from "./GetAllUsersContext";

export const removeUserContext = createContext(null);

const RemoveUserProvider = ({ children }) => {

  const [userConsent, setUserConsent] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [removeUserProfile, setRemoveUserProfile] = useState(false);
  const [removedUserError, setRemovedUserError] = useState("");
  const [removedUserSuccess, setRemovedUserSuccess] = useState("");

  const { loguedUser } = useContext(signInUserContext);
  const { loguedUserInformation } = useContext(getAllUsersContext);

  // console.log("LOGUED USER INFORMATION IN CONTEXT", loguedUserInformation)
  // console.log("LOGUED USER CONTEXT", loguedUser)

  const storage = getStorage()

  useEffect(() => {
    if (loguedUserInformation && userConsent) {
      setLoadingRemove(true)
      const deleteUserProfile = async () => {
        try {
          const db = getFirestore();
          const avatarRef = ref(storage, `/Avatars/${loguedUserInformation.id}`);
          await deleteDoc(doc(db, "users", loguedUserInformation.id)); // Delete User Profile Doc
          await deleteObject(avatarRef); // Delete Avatar Image form Storage
          setRemoveUserProfile(true);
          console.log("User profile deleted")
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoadingRemove(false);
        }
      };
      deleteUserProfile();
    }
  }, [userConsent, storage, loguedUserInformation]);

  useEffect(() => {
    if (loguedUser && removeUserProfile) {
      const deleteUser = async () => {
        try {
          const auth = FIREBASE_AUTH;
          // await auth.signOut();
          const user = auth.currentUser;
          await user.delete(); // Delete the user from Firebase Authentication

          setRemovedUserSuccess("Your account has been deleted");
          setUserConsent(false);
        } catch (error) {
          setRemovedUserError(error.message);
        }
      };
      deleteUser();
    }
  }, [loguedUser, removeUserProfile]);

  return (
    <removeUserContext.Provider
      value={{ setUserConsent, removedUserError, removedUserSuccess, setRemovedUserSuccess, setRemovedUserError, loadingRemove }} >
      {children}
    </removeUserContext.Provider>
  );
};
export default RemoveUserProvider;
