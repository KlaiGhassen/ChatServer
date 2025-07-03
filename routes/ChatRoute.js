const ChatController = require("../controllers/ChatController");
const express = require("express");
const router = express.Router();
const validateChat = require("../middeleware/valide");

router.get("/", (req, res) => {
  res.render("chat");
});

router.post("/", ChatController.addChat, (req, res) => {
  console.log("Chat added successfully");
  res.status(201).json({ message: "Chat added successfully" });
});
router.delete("/:id", ChatController.deleteChat);
router.put("/:id", validateChat, ChatController.updateChat);
router.get("/:id", ChatController.getChatById);
module.exports = router;
