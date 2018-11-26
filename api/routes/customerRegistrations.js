const express = require('express');
const router = express.Router();
const Customer = require('../models/customerRegistration');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "handling for products"
    })
});


router.post('/postcustomer',(req,res,next)=>{
    let userObject = {
       
        cname: req.body.cname,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password: req.body.password
    }
    Customer.create(userObject).then(function (user) {
        
         console.log(user);
        //  userObject.add(user._id);
        //  console.log(userObject)
         res.send(user)
    }).catch(next)
})


router.get('/getcustomer',(req,res,next)=>{

    Customer.find({}, function (err, users) {
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    });

})



// router.get('/:productid',(req,res,next)=>{
//     const id = req.params.productid;
//     if(id == "special"){
//         res.status(200).json({
//             message: "you discovered special id",
//             id: id
//         })
//     }
//     else{
//         res.status(200).json({
//             message: "you passed an id"
//         })
//     }   
// });



router.patch('/:productid',(req,res,next)=>{
  res.status(200).json({
    message: "updated json"
  })
});

router.delete('/:productid',(req,res,next)=>{
    res.status(200).json({
      message: "delted json"
    })
  });


module.exports = router;
