const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "handling for products"
    })
});


router.post('/postproduct',(req,res,next)=>{
    let userObject = {
       
        seller_id: req.body.seller_id,
        pname: req.body.pname,
        pdescription: req.body.pdescription,
        screenShot: req.body.screenShot,
        exeUrl: req.body.exeUrl,
        demoVideoUrl: req.body.demoVideoUrl,
        hostUrl: req.body.hostUrl,
        cost: req.body.cost,
        category: req.body.category
    }
    Product.create(userObject).then(function (user) {
        
         console.log(user);
        //  userObject.add(user._id);
        //  console.log(userObject)
         res.send(user)
    }).catch(next)
})


router.get('/getproduct',(req,res,next)=>{

    Product.find({}, function (err, users) {
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    });
   
})






// router.patch('/:productid',(req,res,next)=>{
//   res.status(200).json({
//     message: "updated json"
//   })
// });

// router.delete('/:productid',(req,res,next)=>{
//     res.status(200).json({
//       message: "delted json"
//     })
//   });


module.exports = router;
