import React, { useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8080");
const Home = () => {
  useEffect(() => {
    socket.emit("hello", { message: "Hello from client" });
  }, []);
  return (
    <div>
      <div className="border border-sky-500 mt-60">
        <h1 className="decoration-solid text-xs">SOS GAME</h1>
      </div>
    </div>
  );
};

export default Home;
