const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Service = db.service;
const DoctorHasService = db.doctorHasService;
const DoctorServiceCenters = db.doctorServiceCenters;
const DoctorHasAppointment = db.doctorHasAppointment;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demohospitalsl@gmail.com',
    pass: 'oqzgxrlfzpwltalz'
  }
});
// const { io } = require("socket.io-client");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    roles: 'user',
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

    //   var authorities = [];

    //   for (let i = 0; i < user.roles.length; i++) {
    //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    //   }
      res.status(200).send({
        id: user._id,
        name: user.name,
        nic:user.nic,
        specialization: user.specialization,
        eduQualification: user.eduQualification,
        email: user.email,
        roles: user.roles,
        accessToken: token
      });
    });
};

exports.registerDoctor = (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      nic: req.body.nic,
      eduQualification: req.body.eduQualification,
      specialization: req.body.specialization,
      roles:req.body.roles,
      status:req.body.status,
      password: bcrypt.hashSync('123456', 8)
    });
  
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was registered successfully!" });

    });
  };

  exports.updateDoctor = (req, res) => {

    var pat = {
      name: req.body.name,
      mobile: req.body.mobile,
      nic: req.body.nic,
      eduQualification: req.body.eduQualification,
      specialization: req.body.specialization,
  };

  User.findByIdAndUpdate(req.body.id, {$set:pat}, {new: true}, (err, doc) => {
      if(!err) {res.send(doc); return;}
      else { res.send({ message: "User was updated successfully!" }); }
      
  });
  };

exports.getDoctors = (req, res) => {
    
    User.find(
        {
          roles: { $in: req.body.roles }
        },
        (err, data) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Get All Doctors successfully!", data: data });

        }
      );
  };

exports.registerService = (req, res) => {
    const service = new Service({
      serviceName: req.body.serviceName,
      serviceDescription: req.body.serviceDescription,
      serviceCharges: req.body.serviceCharges,
    });
  
    service.save((err, service) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "service was registered successfully!" });

    });
  };

exports.updateService = (req, res) => {

    var pat = {
      serviceName: req.body.serviceName,
      serviceDescription: req.body.serviceDescription,
      serviceCharges: req.body.serviceCharges,
  };

  Service.findByIdAndUpdate(req.body.id, {$set:pat}, {new: true}, (err, doc) => {
      if(!err) {res.send(doc); return;}
      else { res.send({ message: "Service was updated successfully!" }); }
      
  });
  };

exports.registerDoctorHasService = (req, res) => {
    const doctorHasService = new DoctorHasService({
      service: req.body.service,
      doctor: req.body.doctorId,
    });
  
    doctorHasService.save((err, doctorHasService) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "doctor Has Service was registered successfully!" });

    });
  };

exports.registerDoctorServiceCenters = (req, res) => {
    const doctorServiceCenters = new DoctorServiceCenters({
      name: req.body.serviceCenterName,
      location: req.body.serviceCenterLocation,
      doctor: req.body.doctorId,
    });
  
    doctorServiceCenters.save((err, doctorServiceCenters) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Service Center was registered successfully!" });

    });
  };

exports.getServices = (req, res) => {
    
    Service.find(
        (err, data) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Get All Services successfully!", data: data });

        }
      );
  };

  exports.getDoctorHasServiceList = (req, res) => {
    
      DoctorHasService.find({doctor: { $in: req.body.doctor }}).populate(["service","doctor"]).exec((err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "Get All Doctor Service List successfully!", data: data });

      });
  };

  exports.getDoctorServiceCenterList = (req, res) => {
    
    DoctorServiceCenters.find({doctor: { $in: req.body.doctor }}).populate(["doctor"]).exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "Get All Doctor Service Center List successfully!", data: data });

    });
};
  exports.deleteDoctorHasServices = (req, res) => {
    
    DoctorHasService.findByIdAndRemove(req.body.deleteId).exec((err, data) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "Delete Doctor Service successfully!", data: data });

    });
};

exports.deleteDoctorServiceCenter = (req, res) => {
    
  DoctorServiceCenters.findByIdAndRemove(req.body.deleteId).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Delete Doctor Service Center successfully!", data: data });

  });
};

exports.getAllDoctorsAccService = (req, res) => {
    
  DoctorHasService.find({service: { $in: req.body.service }}).populate(["doctor"]).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Get All Doctor has Service List successfully!", data: data });

  });
};

exports.getAllCentersAccDoctor = (req, res) => {
    
  DoctorServiceCenters.find({doctor: { $in: req.body.doctor }}).populate(["doctor"]).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Get All Doctor Service Center List successfully!", data: data });

  });
};

exports.registerDoctorAppointment = (req, res) => {
  const doctorHasAppointment = new DoctorHasAppointment({
    service: req.body.service,
    doctor: req.body.doctor,
    center: req.body.center,
    date: req.body.aDate,
    patient: req.body.patient,
    status: "doctor-pending",
    paymentStatus: "not-paid"
  });

  doctorHasAppointment.save((err, doctorHasAppointment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // io.emit('appointments-data');
    res.send({ message: "Appointment was Send successfully!" });

  });
};

exports.getAllAppointmentsAccPatient = (req, res) => {
  DoctorHasAppointment.find({patient: { $in: req.body.patient }}).populate(["patient","doctor","service","center"]).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Get All Patient Appointment List successfully!", data: data });

  });
};

exports.markPaymentDone = (req, res) => {
  var pat = {
    paymentStatus: "paid",
};

DoctorHasAppointment.findByIdAndUpdate(req.body.appointmentId, {$set:pat}, {new: true}).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Update Service Charges successfully!" });

  });
};

exports.getAllAppointmentsAccDoctor = (req, res) => {
  DoctorHasAppointment.find({doctor: { $in: req.body.doctor }}).populate(["patient","doctor","service","center"]).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Get All Doctor Appointment List successfully!", data: data });

  });
};

exports.getAllAppointments = (req, res) => {
  DoctorHasAppointment.find().populate(["patient","doctor","service","center"]).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Get All Appointment List successfully!", data: data });

  });
};

exports.acceptDoctorAppointment = (req, res) => {
  if (req.body.appointmentAction == "yes") {
    var pat = {
      status: "doctor-accept",
    };
  }else{
    var pat = {
      status: "doctor-rejected",
    };
  }
 

DoctorHasAppointment.findByIdAndUpdate(req.body.appointmentId, {$set:pat}, {new: true}).exec((err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    var mailOptions = {
      from: 'demohospitalsl@gmail.com',
      to: req.body.patientEmail,
      subject: 'About Your Appointment',
      text: req.body.appointmentAction == "yes" ? 'Your appointment was approved by doctor.' : 'Sorry! Your appointment was not approved by doctor. But can you put new appointment from the our website.',
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.send({ message: "Update Appointment Status successfully!" });

  });
};