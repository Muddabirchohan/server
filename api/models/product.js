
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


const productSchema = new Schema({
    seller_id:{
        type: Schema.Types.ObjectId,
        ref: 'sellerRegistration',
        required: [true, "product_id fields is required"]
    },

    pname: {
        type: String,
        required: [true, "name fields is required"]
    },
    
    pdescription: {
        type: String,
        required: [true, "description fields is required"]
    },

    screenShot: {
        type: Array,
        // required: [true, "screenShot fields is required"]
    },
    exeUrl: {
        type: String
    },
    demoVideoUrl: {
        type: String
    },
    hostUrl: {
        type: String
    },
    cost: {
        type: String,
        required: [true, "cost fields is required"]
    },
    category: {
        type: String,
        required: [true, "category fields is required"]

    },  
    status: {
        type: String,
        required: [true, "status fields is required"]
    },
    screenShotPublicId : {
        type: Array
    }
    
})

const Product = mongoose.model('product',productSchema);
module.exports = Product;