const express = require('express');
const app = express();
const registerCustomer = require('./api/routes/customerRegistrations');
const registerSeller = require('./api/routes/sellerRegistrations');
const productRoutes = require('./api/routes/products');
const CustomerBuyRequest = require('./api/routes/customerBuyRequests');
const CustomerNewRequest = require('./api/routes/customerNewRequest');
const CustomerBugRequest = require('./api/routes/customerBugRequest');
const CustomerCustomizationRequest = require('./api/routes/customerCustomization');
const ForgotPassword = require('./api/routes/ForgotPassword');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 8000;



// let gfs;
// conn.once('open',() => {
// gfs = Grid(conn.db,mongoose.mongo);
// gfs.collection('uploads');
// })


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


    app.use(allowCrossDomain);
    app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:



app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());
app.use(express.static('uploads'));
// app.use(methodoverride,'_method');

//routes
app.use("/customers", registerCustomer);
app.use("/buyRequest", CustomerBuyRequest);
app.use("/newRequest", CustomerNewRequest);
app.use("/customRequest",CustomerCustomizationRequest);
app.use("/bugRequest", CustomerBugRequest);
app.use("/sellers",   registerSeller );
app.use("/products",productRoutes);
// app.use("/forgot",ForgotPassword);

app.use(cors({
    methods: ['GET','POST','PUT','PATCH'],
    credentials: true, origin: true,
}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

    // res.header("Access-Control-Allow-Origin","*");
    // res.header(
        
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept , Authorization"  
    // );
    // if(req.method === "OPTIONS"){
    //     res.header('Access-Control-Allow-Methods',"GET,PUT,POST,PATCH,DELETE");
    //     return res.status(200).json({});
    // }
    // next();
})

// Routes which should handle requests


// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
//   }));

app.use((req,res,next)=> {
  const error = new Error('Not Found');
  error.status = 404;
  next(error)
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sbay' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;
app.use((error,req,res,next)=> {
    res.status(error.status || 8000);
    res.json({
        error: {
        message: error.message
        }
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port,function(){
    console.log("now listening for requests");
})
module.exports = app;


