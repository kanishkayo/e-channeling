const mongoose = require("mongoose");

const DoctorServiceCenters = mongoose.model(
  "DoctorServiceCenters",
  new mongoose.Schema({
    name: String,
    location: String,
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
  })
);

module.exports = DoctorServiceCenters;