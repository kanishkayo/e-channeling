const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require("./app/config/db.config");


var corsOptions = {
    origin: "http://localhost:4200"
  };

// const { mongoose } = require('./db.js');

// const { mailSender } = require('./mailSender.js');
// var patientController = require('./controllers/patientController.js');
// var userController = require('./controllers/userController.js');

const app = express();
// var server = require('http').createServer(app);
var socket = require('socket.io');

// // socket io
// io.on('connection', (socket) => {
//   console.log(`New Connection here---- ${socket.id}`);
// //   socket.on('appointments-data', function (data) {
// //     // io.emit('update-data', { data: data });
// //   });
//   io.emit('appointments-data');
// });

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
//   });
app.use(cors(corsOptions));
// routes
require('./app/routes/auth.routes')(app, io);
require('./app/routes/user.routes')(app);
const db = require("./app/models");
const Role = db.role;
// `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
mongodb://localhost:27017
// mongodb+srv://yomal:Abcdef%40123@e-channelling-app.dosl7eg.mongodb.net/echannelling?retryWrites=true&w=majority
db.mongoose

  .connect('mongodb+srv://yomal:Abcdef%40123@e-channelling-app.dosl7eg.mongodb.net/echannelling?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'user' to roles collection");
        });

        new Role({
          name: "doctor"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'doctor' to roles collection");
        });

        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }

          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

var server = app.listen(3000, function(){console.log('Server Started at port : 3000')});

var io = socket(server)

io.on('connection', (socket) => {
  console.log(`New ${socket.id}`);

  socket.on('add-appointment', function(data){
    io.sockets.emit('add-appointment', data);
  });
  socket.on('change-doctor-approval-appointment', function(data){
    io.sockets.emit('change-doctor-approval-appointment', data);
  });
  socket.on('paid-service-charge', function(data){
    io.sockets.emit('paid-service-charge', data);
  });

});

// app.use('/patients', patientController);
// app.use('/api/auth/*', userController);

module.exports = app
