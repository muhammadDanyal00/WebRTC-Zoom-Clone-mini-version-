import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

// Create a context for the socket instance
const SocketContext = createContext(null);

// Custom hook to access the socket instance within components
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

// SocketProvider component to provide the socket instance to the application
export const SocketProvider = (props) => {
  // Create the socket instance using the io function from socket.io-client
  const socket = useMemo(() => io("localhost:8000"), []);

  // Provide the socket instance to the child components so that everyone use it using the context
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
