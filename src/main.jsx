import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom/client";
import ContextProvider from "./context/context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
