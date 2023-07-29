const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password :{
        type:Number,
        required:true
    },
    cpassword :{
        type:Number,
        required:true
    },
    phone :{
        type:Number,
        required:true,
        unique:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    location :{
        type:String,
        required:true
    },
    language :{
        type:String,
        required:true
    },
    available :{
        type:String,
        required:true
    }
})

// create a collection

const Registration = new mongoose.model("Registration",registrationSchema );

module.exports = Registration;


