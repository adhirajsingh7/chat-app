const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

exports.user_model = mongoose.model("user", user_schema);
