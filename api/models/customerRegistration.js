
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const customerSchema = new Schema({

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
        type: String ,
        required: [true, "contact fields is required"]
    },
    address: {
        type: String,
        required: [true, "address fields is required"]
    },
})

const Customer = mongoose.model('customers',customerSchema);
module.exports = Customer;

