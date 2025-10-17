import { Routes, Route, BrowserRouter } from "react-router-dom";

import LandingScreen from "./screens/LandingScreen";
import AdminScreen from "./screens/Admin/AdminScreen";
import DisplayApplicationScreen from "./screens/Admin/DisplayApplicationScreen";
import EditUserScreen from "./screens/Admin/EditUserScreen";
import UserScreen from "./screens/UserScreen";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} /> 
        <Route path="/admin-screen" element={<AdminScreen />}/>

        <Route path="/admin-display-application/:user" element={<DisplayApplicationScreen />} />
      
        <Route path="/edit-user/:user" element={<EditUserScreen />} />
        <Route path="/user-screen" element={<UserScreen />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
