require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const db_connection = require("./config/db_connection");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors:{
    origin: "http://localhost:5173",
    credentials: true
  }
})

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const APP_PORT = process.env.APP_PORT || 8080;

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// DB connection
db_connection();

// Routes
app.use("/", require("./routes"));


// socket connection
io.on("connection",(socket)=>{
  console.log("User connected ", socket.id);

  socket.on("message",(data)=>{
    console.log("User message ", data);
    io.in(data.room).emit("receive-message", data);
  })

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));


  socket.on("join-room", (room)=>{
    socket.join(room);
    console.log("User joined room : ", room);
  })

  socket.on("disconnect",()=>{
    console.log("User disconnected ", socket.id)
  })

})

// io.on("connection", (socket) => {
//   console.log("User Connected", socket.id);

//   socket.on("message", ({ room, message }) => {
//     console.log({ room, message });
//     socket.to(room).emit("receive-message", message);
//   });

//   socket.on("join-room", (room) => {
//     socket.join(room);
//     console.log(`User joined room ${room}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });


// starting server
server.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});
