const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require ('../models/user');

route.post("/", (req , res, next) => {
    User.find({email : req.body.email}).exec()
    .then(user =>{
        if(user.length >= 1){
            return res.status(409).json({
                message : "Email already exist"
            })
        }
        else {
            bcrypt.hash(req.body.password , 10 , (err , hash)=>{
                if (err) {
                return res.status(500).json({
                        error : err
                    });
                }
                else {
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    console.log(user);
                    user
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message : "User Created"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error : err
                        })
                    });
                };
                    
                
            });

        };
    });
});

route.delete("/:userId", (req , res, next) =>{
    id = req.params._id ;
    User.remove({id})
    .exec()
    .then(result => {
        res.status(200).json({
            message : "User deleted"
        })
    })
    .catch( err => {
        res.json(404).json({
            error : err , 
            message : "Not found"
        })
    })
})

module.exports = route ;