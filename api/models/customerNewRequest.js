
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const customerNewRequests = new Schema({

        cusNewReqId: {
            type: Schema.Types.ObjectId,
            ref:'customerRegistration',
            required: [true, "cusNewReqId fields is required"]
        },
        newSoftwareDescription:{
            type:String,
            required:[true,"new software description"]
        },
        category:{
            type:String,
            required:[true,"new product category"]
        }

})


const cusNewRequests = mongoose.model('customerNewRequests',customerNewRequests);
module.exports = cusNewRequests;

