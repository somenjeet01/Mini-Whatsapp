const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLenght: 50,
  },
  created_at: {
    type: Date,
    required: true,
  }
});


module.exports = mongoose.model("chat", chatSchema);
