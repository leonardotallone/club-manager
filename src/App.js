import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import LandingScreen from "./screens/LandingScreen";

import AdminScreen from "./screens/Admin/AdminScreen";
import UsersListScreen from "./screens/Admin/UsersListScreen";
import ApplicationsListScreen from "./screens/Admin/ApplicationsListScreen";
import DisplayApplicationScreen from "./screens/Admin/DisplayApplicationScreen";


import EditUserScreen from "./screens/Admin/EditUserScreen";



import UserScreen from "./screens/UserScreen";
import { signInUserContext } from "./Context/SignInUserContext";

function App() {
  const { setDecodedToken, accessToken } = useContext(signInUserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} /> 

        <Route path="/admin-screen" element={<AdminScreen />}/>
        <Route path="/admin-users-list" element={<UsersListScreen />} />
        <Route path="/admin-applications" element={<ApplicationsListScreen />} />
        <Route path="/admin-display-application/:user" element={<DisplayApplicationScreen />} />
      
        <Route path="/edit-user/:user" element={<EditUserScreen />} />
        <Route path="/user-screen" element={<UserScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
