import * as React from "react";
import { render, screen, waitFor, within, act } from "../test-utils";
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

it("should have a username in a room", (done) => {
  myRouter(["/1/oriane"]);
  screen.findByText(/oriane/i).then(() => done());
});

it("should display 404", () => {
  myRouter(["/2"]);
  expect(screen.getByText(/404/i)).toBeInTheDocument();
});

it("should show: Username Taken for duplicate usernames", (done) => {
  const socket2 = io("ws://localhost:3000");
  socket2.emit(
    "room:create",
    { room: "3", username: "ori" },
    async (response) => {
      expect(response).toBe(true);
      myRouter(["/3/ori"]);
      await screen.findByText(/This username is already taken/i);
      socket2.close();
      done();
    }
  );
});

it("should display spectrums", (done) => {
  const socket2 = io("ws://localhost:3000");
  const socket3 = io("ws://localhost:3000");

  let doneNb = 0;
  const checkDone = () => {
    if (doneNb === 2) done();
    else doneNb++;
  };

  myRouter(["/4/oriane"]);
  screen.findByText(/START/i).then(() => {
    socket2.emit(
      "room:join",
      { room: "4", username: "Wael" },
      async (response) => {
        expect(response.joined).toBe(true);
        await screen.findByText(/Wael/i);
        socket2.close();
        checkDone();
      }
    );
    socket3.emit(
      "room:join",
      { room: "4", username: "Tetris" },
      async (response) => {
        expect(response.joined).toBe(true);
        await screen.findByText(/Tetris/i);
        socket3.close();
        checkDone();
      }
    );
    screen.findByText(/oriane/i).then(checkDone);
  });
});

it("should be the master", (done) => {
  const socket2 = io("ws://localhost:3000");

  myRouter(["/5/Wael"]);
  screen.findByText(/START/i).then(() => {
    socket2.emit("room:join", { room: "5", username: "Oriane" }, (response) => {
      expect(response.joined).toBe(true);
      const masterDiv = screen.getByTestId("master-div");
      const img = within(masterDiv).getByRole("img", {
        name: /a crown to show who is the master of the game/i,
      });
      expect(img).toBeInTheDocument();
      socket2.close();
      done();
    });
  });
});

it("should display 500", (done) => {
  myRouter(["/"]);
  socket.on("error", async (data) => {
    await screen.findByText(/500/i);
    done();
  });
  socket.emit("room:create", { room: "6" });
});

it("should display game board", (done) => {
  const socket2 = io("ws://localhost:3000");

  let doneNb = 0;
  const checkDone = () => {
    if (doneNb === 1) done();
    else doneNb++;
  };

  myRouter(["/7/oriane"]);
  screen.findByText(/START/i).then(() => {
    socket2.emit(
      "room:join",
      { room: "7", username: "Wael" },
      async (response) => {
        expect(response.joined).toBe(true);
        await screen.findByText(/Wael/i);
        checkDone();
      }
    );

    screen.findByText(/Wael/i).then(() => {
      socket.emit("game:launch", async (response) => {
        expect(response).toBe(true);
        socket2.emit("game:move", { move: "hard drop" }, socket2.close());
        let movesCompleted = 0;
        const onMoveComplete = () => {
          movesCompleted++;
          if (movesCompleted === 10) checkDone();
        };
        for (let i = 0; i < 10; i++)
          socket.emit("game:move", { move: "hard drop" }, onMoveComplete);
      });
    });
  });
});
