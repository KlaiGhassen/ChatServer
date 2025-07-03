const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const morgan = require("morgan");
const configDb = require("./dbConfig/configMongo.json");
const chatRoutes = require("./routes/ChatRoute");
const path = require("path");
const { addchatScocket } = require("./controllers/ChatController");

const app = express();
 app.use(morgan("dev"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
mongoose.connect(configDb.uri).then(() => {
  console.log("Connected to MongoDB");
});
app.use(express.json());
app.use("/chats", chatRoutes);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("A user connected");

  // Notify the user who just connected
  socket.emit("systemMessage", "You are connected");

  // Listen for a new chat message from a user
  socket.on("newChatMessage", (messageData) => {
    addchatScocket(messageData); // Store message in DB or memory
    io.emit("newChatMessage", messageData); // Send to all users
  });

  // Listen for "user is typing" events
  socket.on("userTyping", (typingData) => {
    socket.broadcast.emit("userTyping", typingData); // Notify others
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    io.emit("systemMessage", "A user has disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
