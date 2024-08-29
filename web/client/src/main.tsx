import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext";
import { AuthProvider } from "./context/AuthContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
