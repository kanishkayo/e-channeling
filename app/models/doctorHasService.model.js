const mongoose = require("mongoose");

const DoctorHasService = mongoose.model(
  "DoctorHasService",
  new mongoose.Schema({
    service:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
          },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
  })
);

module.exports = DoctorHasService;