import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';
// import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

// Context
import GetAllUsersProvider from "./context/GetAllUsersContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
        <CssBaseline />

        {/* <ScopedCssBaseline> */}

    <GetAllUsersProvider>

      <App />
      

    </GetAllUsersProvider>
        {/* </ScopedCssBaseline> */}
  </React.StrictMode>
);
