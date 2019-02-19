const express = require('express');
const app = express();
const registerCustomer = require('./api/routes/customerRegistrations');
const registerSeller = require('./api/routes/sellerRegistrations');
const productRoutes = require('./api/routes/products');
const CustomerBuyRequest = require('./api/routes/customerBuyRequests');
const CustomerNewRequest = require('./api/routes/customerNewRequest');
const CustomerCustomizationRequest = require('./api/routes/customerCustomization');
const CustomerBugRequest = require('./api/routes/customerBugRequest');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodoverride = require('method-override');
const multer = require('multer');
const upload = multer({ dest : '/uploads/'});
const cors = require('cors');


mongoose.connect('mongodb://localhost/sbay' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;

// let gfs;
// conn.once('open',() => {
// gfs = Grid(conn.db,mongoose.mongo);
// gfs.collection('uploads');
// })

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


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept , Authorization"  
    );
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods',"GET,PUT,POST,PATCH,DELETE");
        return res.status(200).json({});
    }
    next();
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


app.use((error,req,res,next)=> {
    res.status(error.status || 7000);
    res.json({
        error: {
        message: error.message
        }
    })
})


module.exports = app;


