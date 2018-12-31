const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/getproducts',(req,res,next)=>{
let i=0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i++] = user;
        });
        res.send(userMap);
    });
   
})


router.get('/webproducts',(req,res,next)=>{
let i =0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if(user.category === "web"){
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
    .catch(err => next(err));
})


router.get('/androidproducts',(req,res,next)=>{
let i=0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if(user.category === "android"){
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
    .catch(err => next(err));
})

router.get('/vrar',(req,res,next)=>{
    let i=0;
        Product.find({}, function (err, users) {
            var userMap = [];
            users.forEach(function (user) {
                if(user.category === "vr" || user.category === "ar" ){
                    userMap[i++] = user
                }
            });
            console.log(userMap);
            res.send(userMap);
        })
        .catch(err => next(err));
    })

    router.get('/ai',(req,res,next)=>{
        let i=0;
            Product.find({}, function (err, users) {
                var userMap = [];
                users.forEach(function (user) {
                    if(user.category === "ai"){
                        userMap[i++] = user
                    }
                });
                console.log(userMap);
                res.send(userMap);
            })
            .catch(err => next(err));
        })

        router.get('/ecommerce',(req,res,next)=>{
            let i=0;
                Product.find({}, function (err, users) {
                    var userMap = [];
                    users.forEach(function (user) {
                        if(user.category === "ecommerce"){
                            userMap[i++] = user
                        }
                    });
                    console.log(userMap);
                    res.send(userMap);
                })
                .catch(err => next(err));
            })
    
        
    
    
            router.get('/iot',(req,res,next)=>{
                let i=0;
                    Product.find({}, function (err, users) {
                        var userMap = [];
                        users.forEach(function (user) {
                            if(user.category === "iot"){
                                userMap[i++] = user
                            }
                        });
                        console.log(userMap);
                        res.send(userMap);
                    })
                    .catch(err => next(err));
                })
        

router.get('/:id',(req,res,next)=>{

    Product.findById(req.params.id)
    .then( docs => {
        if(!docs){ return res.status(404).end()}
        return res.status(200).json(docs)
    })
    .catch(err => next(err));
})

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
         res.send(user)
    }).catch(next)
})


router.patch('/:productid',(req,res,next)=>{
    Product.updateOne({"_id":req.params.productid.toString()},
    {$set: 
        {"pname":        req.body.pname, 
        "pdescription" : req.body.pdescription, 
        "category":      req.body.category,
        "exeUrl":        req.body.exeUrl,
        "hostUrl":       req.body.hostUrl,
        "screenShot":    req.body.screenShot,
        "cost"          :req.body.cost   
       }

}).then(function(user){
    res.send(user);
    })
    
});

router.delete('/:productid',(req,res,next)=>{

  Product.remove({"_id":req.params.productid.toString()}).then(function (user){
      res.send("sussessfull deleted");
  }).catch(next);
});
module.exports = router;
