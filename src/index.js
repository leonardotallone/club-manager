import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Context
import SignInUserProvider from "./Context/SignInUserContext";
import JoinUpProvider from "./Context/JoinUpContext";
import SignUpProvider from "./Context/SignUpContext";
import GetAllUsersProvider from "./Context/GetAllUsersContext";
import GetAllCategoriesProvider from "./Context/GetAllCategoriesContext";
import GetAllDisciplinesProvider from "./Context/GetAllDisciplinesContext";
import FeesProvider from "./Context/FeesContext";

import GetAllJoinUpProvider from "./Context/GetAllJoinUpContext";
import UpdateUserProfileProvider from "./Context/UpdateUserProfileContext";
import RemoveUserProvider from "./Context/RemoveUserContext";

import RecoverUserProvider from "./Context/RecoverUserContext";

import SignedUserProvider from "./Context/SignedUserContext";
import RecoverPasswordProvider from "./Context/RecoverPasswordContext";

import ControlModalsProvider from "./Context/ControModalsContext";
import DisplaySelectorViewProvider from "./Context/DisplaySelectorViewContext";

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
      <DisplaySelectorViewProvider>
        <SignInUserProvider>
          <GetAllJoinUpProvider>
            <SignedUserProvider>
              <SignUpProvider>
                <JoinUpProvider>
                  <GetAllUsersProvider>
                    <RecoverUserProvider>
                      <RecoverPasswordProvider>
                        <GetAllCategoriesProvider>
                          <GetAllDisciplinesProvider>
                            <ControlModalsProvider>
                              <RemoveUserProvider>
                                <UpdateUserProfileProvider>
                                  <FeesProvider>
                                    <App />
                                  </FeesProvider>
                                </UpdateUserProfileProvider>
                              </RemoveUserProvider>
                            </ControlModalsProvider>
                          </GetAllDisciplinesProvider>
                        </GetAllCategoriesProvider>
                      </RecoverPasswordProvider>
                    </RecoverUserProvider>
                  </GetAllUsersProvider>
                </JoinUpProvider>
              </SignUpProvider>
            </SignedUserProvider>
          </GetAllJoinUpProvider>
        </SignInUserProvider>
      </DisplaySelectorViewProvider>
    </ThemeProvider>
  </React.StrictMode>
);
