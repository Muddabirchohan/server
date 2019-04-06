
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const customerCustomizationRequests = new Schema({
        cusCuzReqId: {
            type: Schema.Types.ObjectId,
            ref:'customerRegistration',
            required: [true, "cusCuzReqId fields is required"]
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref:'product',
            required: [true, "productId fields is required"]
        },
        cuzDescription:{
            type:String,
            required:[true,"description"]
        }
})


const cusCuzRequests = mongoose.model('customerCustomizationRequests',customerCustomizationRequests);
module.exports = cusCuzRequests;

