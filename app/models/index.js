const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.service = require("./service.model");
db.doctorHasService = require("./doctorHasService.model");
db.doctorServiceCenters = require("./doctorServiceCenters.model");
db.doctorHasAppointment = require("./doctorHasAppointment.model");

db.ROLES = ["user", "admin", "doctor"];

module.exports = db;