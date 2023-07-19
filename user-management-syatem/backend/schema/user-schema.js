const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    requird: true,
  },
  email: {
    type: String,
    requird: true,
  },
  phone: {
    type: String,
    requird: true,
  },
});

const User = mongoose.model("user-list", userSchema);

module.exports = User;
