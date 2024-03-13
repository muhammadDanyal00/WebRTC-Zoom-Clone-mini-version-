import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const Lobby = () => {
  // State to manage user's email and room number
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  // Access the socket instance from the SocketProvider context
  const socket = useSocket();

  // Hook to navigate between different pages in the application
  const navigate = useNavigate();

  // Callback function to handle form submission
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // Emit a "room:join" event with user's email and room number
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  // Callback function to handle joining a room
  const handleJoinRoom = useCallback(
    (data) => {
      // Extract email and room number from the received data
      const { email, room } = data;
      // Navigate to the specified room page
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  // Effect hook to listen for "room:join" events
  useEffect(() => {
    // Attach event listener for "room:join" event
    socket.on("room:join", handleJoinRoom);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  // Render the lobby component with a form to join a room
  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default Lobby;
