import * as React from "react";
import { render, screen, within, act } from "../test-utils";
import { io } from "socket.io-client";

import { socket } from "./socket";
import App from "./components/App";

function myRouter(initialEntries) {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    render(<App />, { initialEntries });
  });
}

afterEach(() => {
  socket.disconnect();
  socket.off("connect");
  socket.off("game:update");
  socket.off("game:spectrums");
  socket.off("game:end");
  socket.off("room:master");
  socket.off("room:players");
  socket.off("error");
  socket.connect();
});

it("should display start button", () => {
  myRouter(["/"]);
  expect(screen.getByText(/START/i)).toBeInTheDocument();
});

it("should have a username in a room", async () => {
  myRouter(["/1/oriane"]);
  await screen.findByText(/oriane/i);
});

it("should display 404", () => {
  myRouter(["/2"]);
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});

it("should show: Username Taken for duplicate usernames", async () => {
  const socket2 = io("ws://localhost:3000");
  await new Promise((resolve) => {
    socket2.emit(
      "room:create",
      { room: "3", username: "ori" },
      async (response) => {
        expect(response).toBe(true);
        myRouter(["/3/ori"]);
        await screen.findByText(/This username is already taken/i);
        socket2.close();
        resolve();
      }
    );
  });
});

it("should display spectrums", async () => {
  const socket2 = io("ws://localhost:3000");
  const socket3 = io("ws://localhost:3000");

  myRouter(["/4/oriane"]);
  await screen.findByText(/START/i);

  await act(async () => {
    await new Promise((resolve) => {
      socket2.emit(
        "room:join",
        { room: "4", username: "Wael" },
        async (response) => {
          expect(response.joined).toBe(true);
          resolve();
        }
      );
    });

    await new Promise((resolve) => {
      socket3.emit(
        "room:join",
        { room: "4", username: "Tetris" },
        async (response) => {
          expect(response.joined).toBe(true);
          resolve();
        }
      );
    });
  });

  await screen.findByText(/Wael/i);
  await screen.findByText(/Tetris/i);

  socket2.close();
  socket3.close();
});

it("should be the master", async () => {
  const socket2 = io("ws://localhost:3000");

  myRouter(["/5/Wael"]);
  await screen.findByText(/START/i);

  await act(async () => {
    await new Promise((resolve) => {
      socket2.emit(
        "room:join",
        { room: "5", username: "Oriane" },
        (response) => {
          expect(response.joined).toBe(true);
          const masterDiv = screen.getByTestId("master-div");
          const img = within(masterDiv).getByRole("img", {
            name: /a crown to show who is the master of the game/i,
          });
          expect(img).toBeInTheDocument();
          socket2.close();
          resolve();
        }
      );
    });
  });
});

it("should display 500", async () => {
  myRouter(["/"]);
  socket.emit("room:create", { room: "6" });
  await screen.findByText(/500/i);
});

it("should display game board", async () => {
  const socket2 = io("ws://localhost:3000");
  myRouter(["/7/oriane"]);
  await screen.findByText(/START/i);

  await act(async () => {
    await new Promise((resolve) => {
      socket2.emit(
        "room:join",
        { room: "7", username: "Wael" },
        async (response) => {
          expect(response.joined).toBe(true);
          resolve();
        }
      );
    });

    await new Promise((resolve) => {
      socket.emit("game:launch", async (response) => {
        expect(response).toBe(true);
        resolve();
      });
    });

    await new Promise((resolve) => {
      socket2.emit("game:move", { move: "hard drop" });
      let movesCompleted = 0;
      const onMoveComplete = () => {
        movesCompleted++;
        if (movesCompleted === 10) resolve();
      };
      for (let i = 0; i < 10; i++)
        socket.emit("game:move", { move: "hard drop" }, onMoveComplete);
    });
  });
  await screen.findByText(/Wael/i);
  socket2.close();
});
