const mongoose = require('mongoose');

var Patient = mongoose.model('Patient', {
    name: {type: String},
    mobile: {type: String},
    email: {type: String},
});

module.exports = {Patient};