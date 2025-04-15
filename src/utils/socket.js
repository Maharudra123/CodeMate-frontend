import io from "socket.io-client";
import { BASE_URL } from "./contants";

export const createSocketConnectection = () => {
  try {
    return io(BASE_URL);
  } catch (error) {
    console.error("Socket connection error:", error);
    return null;
  }
};
