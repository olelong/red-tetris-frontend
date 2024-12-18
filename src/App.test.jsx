import * as React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store/store.js";

test("affiche la page d'accueil par défaut", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText(/START/i)).toBeInTheDocument();
});
