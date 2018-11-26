
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const customerBugRequests = new Schema({
        cusBugReqId: {
            type: Schema.Types.ObjectId,
            ref:'customerRegistration',
            required: [true, "cusBugReqId fields is required"]
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref:'product',
            required: [true, "productId fields is required"]
        },
        bugDescription:{
            type:String,
            required:[true,"description"]
        }
})


const cusBugRequests = mongoose.model('customerBugRequests',customerBugRequests);
module.exports = cusBugRequests;

