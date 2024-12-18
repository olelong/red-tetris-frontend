import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App.jsx";
import Error404Page from "./components/Error404Page.jsx";
import store from "./store/store.js";
import "./styles/index.css";

const ValidateParams = ({ children }) => {
  const { roomId, userId } = useParams();
  const isAlphanum = (value) => /^[a-zA-Z0-9]*$/.test(value);
  if (
    (roomId &&
      (!isAlphanum(roomId) || roomId.length < 1 || roomId.length > 10)) ||
    (userId && (!isAlphanum(userId) || userId.length < 1 || userId.length > 10))
  )
    return <Error404Page />;
  return children;
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route
          path="/"
          errorElement={<Error404Page />}
          element={
            <Provider store={store}>
              <App />
            </Provider>
          }
        />
        <Route
          path="/:roomId/:userId"
          errorElement={<Error404Page />}
          element={
            <Provider store={store}>
              <ValidateParams>
                <App />
              </ValidateParams>
            </Provider>
          }
        />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
