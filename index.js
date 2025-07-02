const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const morgan = require("morgan");
const configDb = require("./dbConfig/configMongo.json");
const chatRoutes = require("./routes/ChatRoute");

const app = express();
app.use(morgan("dev"));

mongoose.connect(configDb.uri).then(() => {
  console.log("Connected to MongoDB");
});
app.use(express.json());
app.use("/api/chats", chatRoutes);

app.listen(3000, () => {
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
