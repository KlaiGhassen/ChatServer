const mongo = require("mongoose");
const Schema = mongo.Schema;
const ChatSchema = new Schema({
    msg :String,
    date:Date
});
module.exports = mongo.model("Chats", ChatSchema);