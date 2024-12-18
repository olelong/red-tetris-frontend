import React from "react";
import { render, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router";
import Error404Page from "./src/components/Error404Page";
import { Provider } from "react-redux";
import { createStore } from "./src/store/store";

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

const customRender = (
  ui,
  { store = createStore(), initialEntries, ...options }
) => {
  const AllTheProviders = ({ children }) => {
    return (
      <React.StrictMode>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route
              path="/"
              errorElement={<Error404Page />}
              element={<Provider store={store}>{children}</Provider>}
            />
            <Route
              path="/:roomId/:userId"
              errorElement={<Error404Page />}
              element={
                <Provider store={store}>
                  <ValidateParams>{children}</ValidateParams>
                </Provider>
              }
            />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </MemoryRouter>
      </React.StrictMode>
    );
  };
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
