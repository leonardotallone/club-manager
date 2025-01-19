import { Routes, Route, BrowserRouter } from "react-router-dom";

import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/Admin/HomeScreen";
import PasswordRecoverScreen from "./screens/PasswordRecoverScreen";
import SignUpScreen from "./screens/SignUpScreen";
import EmailRecoverScreen from "./screens/EmailRecoverScreen";
import UsersListScreen from "./screens/Admin/UsersListScreen";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/password-recover" element={<PasswordRecoverScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />

        <Route path="/email-recover" element={<EmailRecoverScreen />} />
        <Route path="/admin-users-list" element={<UsersListScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
