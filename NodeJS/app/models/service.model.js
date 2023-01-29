const mongoose = require("mongoose");

const Service = mongoose.model(
  "Service",
  new mongoose.Schema({
    serviceName: String,
    serviceDescription: String,
    serviceCharges: String,
  })
);

module.exports = Service;