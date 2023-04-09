const express = require("express");
const { connection } = require("./Configs/db");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);

  socket.on("hello", (data) => {
    console.log(data);
    socket.broadcast.emit("received", data);
  });
});

//socket.io.connect

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Port runnning on ${process.env.PORT}`);
});
