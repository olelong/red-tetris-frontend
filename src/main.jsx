import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App.jsx";
import store from "./store/store.js";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <App />
            </Provider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
