const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const verifyRegisterDoctor = require("../middlewares/verifyRegisterDoctor");

// var express = require('express');
// var router = express.Router();
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// server.listen(4200);

// socket io
// io.on('connection', function (socket) {
  // socket.on('newdata', function (data) {
  //     io.emit('new-data', { data: data });
  // });
  // socket.on('updatedata', function (data) {
  //   io.emit('update-data', { data: data });
  // });


module.exports = function(app) {
//   var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// server.listen(3000);
// io.on('connection', function (socket) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/api/auth/registerDoctor",
    [
        verifyRegisterDoctor.checkDuplicateEmail
    ],
    controller.registerDoctor
  );

  app.post(
    "/api/auth/updateDoctor",
    [
        verifyRegisterDoctor.checkDuplicateEmail
    ],
    controller.updateDoctor
  );

  app.post(
    "/api/auth/registerService",
    controller.registerService
  );

  app.post(
    "/api/auth/updateService",
    controller.updateService
  );

  app.post(
    "/api/auth/registerDoctorHasService",
    controller.registerDoctorHasService
  );

  app.post(
    "/api/auth/registerDoctorServiceCenters",
    controller.registerDoctorServiceCenters
  );

  // socket.on('appointments-data', function (data) {
    // io.emit('update-data', { data: data });
  app.post(
    "/api/auth/registerDoctorAppointment",
    controller.registerDoctorAppointment
  );
// });

  app.post(
    "/api/auth/acceptDoctorAppointment",
    controller.acceptDoctorAppointment
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/getDoctors", controller.getDoctors);
  app.post("/api/auth/getServices", controller.getServices);
  app.post("/api/auth/getDoctorHasServiceList", controller.getDoctorHasServiceList);
  app.post("/api/auth/deleteDoctorHasServices", controller.deleteDoctorHasServices);
  app.post("/api/auth/getDoctorServiceCenterList", controller.getDoctorServiceCenterList);
  app.post("/api/auth/deleteDoctorServiceCenter", controller.deleteDoctorServiceCenter);
  app.post("/api/auth/getAllDoctorsAccService", controller.getAllDoctorsAccService);
  app.post("/api/auth/getAllCentersAccDoctor", controller.getAllCentersAccDoctor);
  app.post("/api/auth/getAllAppointmentsAccPatient", controller.getAllAppointmentsAccPatient);
  app.post("/api/auth/markPaymentDone", controller.markPaymentDone);
  app.post("/api/auth/getAllAppointmentsAccDoctor", controller.getAllAppointmentsAccDoctor);
  app.post("/api/auth/getAllAppointments", controller.getAllAppointments);
// });
};

