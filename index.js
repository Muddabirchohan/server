const express = require('express');
const app = express();
const registerCustomer = require('./api/routes/customerRegistrations');
const registerSeller = require('./api/routes/sellerRegistrations');
const productRoutes = require('./api/routes/products');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');




mongoose.connect('mongodb://localhost/sbay' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

app.use("/customers", registerCustomer);
app.use("/sellers",   registerSeller );
app.use("/products",productRoutes);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept , Authorization"  
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods',"PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
})

// Routes which should handle requests

app.use((req,res,next)=> {
  const error = new Error('Not Found');
  error.status = 404;
  next(error)
})


app.use((error,req,res,next)=> {
    res.status(error.status || 7000);
    res.json({
        error: {
        message: error.message
        }
    })
})


module.exports = app;


