import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Context
import SignInProvider from "./Context/SignInContext";
import JoinUpProvider from "./Context/JoinUpContext";
import SignUpProvider from "./Context/SignUpContext";
import GetAllUsersProvider from "./Context/GetAllUsersContext";
import GetAllCategoriesProvider from "./Context/GetAllCategoriesContext";
import GetAllDisciplinesProvider from "./Context/GetAllDisciplinesContext";


import GetAllJoinUpProvider from "./Context/GetAllJoinUpContext";
import UpdateUserProfileProvider from "./Context/UpdateUserProfileContext";

import SignedUserProvider from "./Context/SignedUserContext";
import RecoverPasswordProvider from "./Context/RecoverPasswordContext";
import NewPasswordProvider from "./Context/NewPasswordContext";
import RecoverUserProvider from "./Context/RecoverUserContext";

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
      <SignInProvider>
        <GetAllJoinUpProvider>
          <RecoverPasswordProvider>
            <NewPasswordProvider>
              <RecoverUserProvider>
                <SignedUserProvider>
                  <SignUpProvider>
                    <JoinUpProvider>
                      <GetAllUsersProvider>
                        <GetAllCategoriesProvider>
                          <GetAllDisciplinesProvider>
                        
                              <UpdateUserProfileProvider>
                                <App />
                              </UpdateUserProfileProvider>
                          
                          </GetAllDisciplinesProvider>
                        </GetAllCategoriesProvider>
                      </GetAllUsersProvider>
                    </JoinUpProvider>
                  </SignUpProvider>
                </SignedUserProvider>
              </RecoverUserProvider>
            </NewPasswordProvider>
          </RecoverPasswordProvider>
        </GetAllJoinUpProvider>
      </SignInProvider>
    </ThemeProvider>
  </React.StrictMode>
);
