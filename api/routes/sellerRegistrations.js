const express = require('express');
const router = express.Router();
const Seller = require('../models/sellerRegistraion');


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "handling for products for seller"
    })
});


router.post('/postseller',(req,res,next)=>{
    let userObject = {
        sname: req.body.sname,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password: req.body.password,
     
    }
    Seller.create(userObject).then(function (user) {

         console.log(user)
        res.send(user)
    }).catch(next)

})

router.get('/getseller',(req,res,next)=>{

    Seller.find({}, function (err, users) {
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    });

})


module.exports = router;