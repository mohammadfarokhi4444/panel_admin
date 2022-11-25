// import ReactDOM from "react-dom";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Theme from "./assets/theme";
import "./index.css";
import { UserProvider } from "./context/UserContext";
import { LayoutProvider } from "./context/LayoutContext";
import "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Theme.main}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>
);
