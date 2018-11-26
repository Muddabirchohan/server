
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const customerRequestPanel = new Schema({
   
        cusReqId: {
            type: String,
            required: [true, "cusREQID fields is required"]
        },
         requestType: {
        type: String,
        required: [true, "REQUEST fields is required"]

         }
})
// 

const customerPanelRequests = mongoose.model('customerRequestPanel',customerRequestPanel);
module.exports = customerPanelRequests;

