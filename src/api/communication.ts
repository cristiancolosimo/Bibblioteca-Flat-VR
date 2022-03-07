import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

export  const socket_connection = socketIOClient(ENDPOINT);
