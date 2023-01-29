const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/echannelling', (err) =>{
    if (!err) 
    console.log('MongoDB Connection Succeeded');
    else 
    console.log('Error in DB Connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;