const mongoose = require("mongoose");

const message_schema = new mongoose.Schema({
  sender_id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

exports.message_model = mongoose.model("user", message_schema);
