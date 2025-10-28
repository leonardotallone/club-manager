import { Routes, Route, BrowserRouter } from "react-router-dom";

import LandingScreen from "./screens/LandingScreen";
import AdminScreen from "./screens/AdminScreen";
import UserScreen from "./screens/UserScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/admin-screen" element={<AdminScreen />} />
        <Route path="/user-screen" element={<UserScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
