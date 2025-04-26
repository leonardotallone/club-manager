import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import LandingScreen from "./screens/LandingScreen";
import JoinUpForm from "./screens/JoinUpScreen";

import DashboardAdminScreen from "./screens/Admin/DashboardAdminScreen";
import UsersListScreen from "./screens/Admin/UsersListScreen";
import ApplicationsListScreen from "./screens/Admin/ApplicationsListScreen";

import SignUpScreen from "./screens/Admin/SignUpScreen";
import EditUserScreen from "./screens/Admin/EditUserScreen";

import PasswordRecoverScreen from "./screens/PasswordRecoverScreen";
import EmailRecoverScreen from "./screens/EmailRecoverScreen";
import DashboardUserScreen from "./screens/DashboardUserScreen";

import { signInContext } from "./Context/SignInContext";

function App() {
  const { setDecodedToken, accessToken } = useContext(signInContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/join" element={<JoinUpForm />} />

        <Route
          path="/dashboard-admin-screen"
          element={<DashboardAdminScreen />}
        />
        <Route path="/admin-users-list" element={<UsersListScreen />} />
        <Route path="/admin-applications" element={<ApplicationsListScreen />} />

        <Route path="/edit-user/:user" element={<EditUserScreen />} />
        <Route path="/signup/:type" element={<SignUpScreen />} />
        <Route path="/password-recover" element={<PasswordRecoverScreen />} />
        <Route path="/reset-password" element={<PasswordRecoverScreen />} />
        <Route path="/email-recover" element={<EmailRecoverScreen />} />
        <Route
          path="/dashboard-user-screen"
          element={<DashboardUserScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
