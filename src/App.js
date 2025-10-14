import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import LandingScreen from "./screens/LandingScreen";
// import JoinUpScreen from "./screens/JoinUpScreen";

import DashboardAdminScreen from "./screens/Admin/DashboardAdminScreen";
import UsersListScreen from "./screens/Admin/UsersListScreen";
import ApplicationsListScreen from "./screens/Admin/ApplicationsListScreen";
import DisplayApplicationScreen from "./screens/Admin/DisplayApplicationScreen";

// import SignUpScreen from "./screens/Admin/SignUpScreen";
import EditUserScreen from "./screens/Admin/EditUserScreen";

// import PasswordRecoverScreen from "./screens/PasswordRecoverScreen";
import EmailRecoverScreen from "./screens/EmailRecoverScreen";
import DashboardUserScreen from "./screens/DashboardUserScreen";

import { signInUserContext } from "./Context/SignInUserContext";

function App() {
  const { setDecodedToken, accessToken } = useContext(signInUserContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} /> 

        <Route path="/dashboard-admin-screen" element={<DashboardAdminScreen />}/>
        <Route path="/admin-users-list" element={<UsersListScreen />} />
        <Route path="/admin-applications" element={<ApplicationsListScreen />} />
        <Route path="/admin-display-application/:user" element={<DisplayApplicationScreen />} />
      

        {/* <Route path="/joinup" element={<JoinUpScreen />} /> */}
        <Route path="/edit-user/:user" element={<EditUserScreen />} />
        {/* <Route path="/password-recover" element={<PasswordRecoverScreen />} /> */}
        {/* <Route path="/reset-password" element={<PasswordRecoverScreen />} /> */}
        <Route path="/email-recover" element={<EmailRecoverScreen />} />
        <Route path="/dashboard-user-screen" element={<DashboardUserScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
