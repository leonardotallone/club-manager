import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Context
import SignInProvider from "./context/SignInContext";
import JoinUpProvider from "./context/JoinUpContext";
import SignUpProvider from "./context/SignUpContext";
import GetAllUsersProvider from "./context/GetAllUsersContext";
import DisplayLandingFormsProvider from "./context/DisplayLandingFormsContext";
import SignedUserProvider from "./context/SignedUserContext";
import RecoverPasswordProvider from "./context/RecoverPasswordContext";
import NewPasswordProvider from "./context/NewPasswordContext";
import RecoverUserProvider from "./context/RecoverUserContext";
import LogOutProvider from "./context/LogOutContext";

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

      <LogOutProvider>
        <RecoverPasswordProvider>
          <NewPasswordProvider>
            <RecoverUserProvider>
              <SignInProvider>
                <SignedUserProvider>
                  <SignUpProvider>
                    <JoinUpProvider>
                      <DisplayLandingFormsProvider>
                        <GetAllUsersProvider>
                          <App />
                        </GetAllUsersProvider>
                      </DisplayLandingFormsProvider>
                    </JoinUpProvider>
                  </SignUpProvider>
                </SignedUserProvider>
              </SignInProvider>
            </RecoverUserProvider>
          </NewPasswordProvider>
        </RecoverPasswordProvider>
      </LogOutProvider>
      
    </ThemeProvider>
  </React.StrictMode>
);
