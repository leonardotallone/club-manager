import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Context
import SignInContext from "./context/SignInContext";
import JoinUpContext from "./context/JoinUpContext";
import GetAllUsersProvider from "./context/GetAllUsersContext";
import DisplayLandingFormsProvider from "./context/DisplayLandingForms";

import App from "./App";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      
      <JoinUpContext>
        <DisplayLandingFormsProvider>
          <SignInContext>
            <GetAllUsersProvider>
              <App />
            </GetAllUsersProvider>
          </SignInContext>
        </DisplayLandingFormsProvider>
      </JoinUpContext>

    </ThemeProvider>
  </React.StrictMode>
);
