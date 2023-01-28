const mongoose = require("mongoose");

const DoctorHasAppointment = mongoose.model(
  "DoctorHasAppointment",
  new mongoose.Schema({
    service:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
          },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorServiceCenters"
      },
    date: String,
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    status: String,
    paymentStatus: String,
  })
);

module.exports = DoctorHasAppointment;