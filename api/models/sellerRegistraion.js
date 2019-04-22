
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const sellerSchema = new Schema({

    name: {
        type: String,
        required: [true, "name fields is required"]
    },
 
    email: {
        type: String,
        required: [true, "name fields is required"]
    },
    password: {
        type: String,
        required: [true, "password fields is required"]
    },
    contact: {
        type: Number ,
        required: [true, "contact fields is required"]
    },
    address: {
        type: String,
        required: [true, "address fields is required"]
    },
    resetPasswordToken:
    {
         type: String,
        },
    resetPasswordExpires: {
        type: Date,
    }
    })

const Seller = mongoose.model('sellers' ,sellerSchema);
module.exports = Seller;


