const Chat = require("../models/Chat");
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addchatScocket = async (data) => {
  try {
    // console.log(req.body);
    const chat = new Chat({ msg: data.msg });
    await chat.save();
    //res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
exports.addChat = async (req, res) => {
  const chat = new Chat({
    msg: req.body,
    date: new Date(),
  });
  try {
    const savedChat = await chat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
