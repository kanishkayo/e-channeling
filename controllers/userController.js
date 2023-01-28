const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

//  => localhost:3000/patients/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error in Retrieving User :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    User.findById(req.params.id, (err,doc) => {
       if (!err) {
        res.send(doc);
       }else{
        console.log('Error in Retrieving User :' + JSON.stringify(err, undefined, 2));
       }
    })
});

router.post('/api/auth/signup', (req, res) => {
    var pat = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status,
    });
    pat.save((err, doc)=>{
        if (!err) {
            res.send(doc);
        }else{
            console.log('Error in Save User :' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    var pat = {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    };

    User.findByIdAndUpdate(req.params.id, {$set:pat}, {new: true}, (err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Update User :' + JSON.stringify(err, undefined, 2)); }
    });

});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    User.findByIdAndRemove(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Delete User :' + JSON.stringify(err, undefined, 2)); }
    });

});

module.exports = router;