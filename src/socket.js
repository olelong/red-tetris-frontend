import { io } from "socket.io-client";

const URL = `ws://${process.env.REACT_APP_URL ?? "localhost"}:3000`;

export const socket = io(URL);
