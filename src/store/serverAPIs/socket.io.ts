import { io } from "socket.io-client";

const hostName =
  process.env.REACT_APP_ENV === "production"
    ? "http://www.noveltime.shop"
    : "http://domainfordev.com";

const socket = io(hostName, {
  path: "/socket.io",
});

export default socket;
