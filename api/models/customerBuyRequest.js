
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');



const customerBuyRequests = new Schema({
        cusBuyReqId: {
            type: Schema.Types.ObjectId,
            ref:'customerRegistration',
            required: [true, "cus_id fields is required"]
        },
        Product_Id:[ {
            type: Schema.Types.ObjectId,
            ref:'product',
            required: [true, "cus_id fields is required"]
        } ],
        // invoice_No: {
        //    type: String,
        // }

})


const customerBuyRequest = mongoose.model('customerBuyRequests',customerBuyRequests);
module.exports = customerBuyRequest;

