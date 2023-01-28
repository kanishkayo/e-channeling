const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    nic: String,
    name: String,
    address: String,
    specialization: String,
    eduQualification: String,
    password: String,
    roles: String,
    status: String,
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role"
    //   }
    // ]
  })
);

module.exports = User;