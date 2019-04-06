const express = require('express');
const router = express.Router();
const Seller = require('../models/sellerRegistration');
const Product = require('../models/product');
const multer = require('multer');
// const Product = require('../models/product');



// router.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message: "handling for products for seller"
//     })
// });


router.post('/postseller',(req,res,next)=>{

    Seller.find({}, function (err, users) {
        let flg = false;
        users.forEach(function (user) {
            if(user.email === req.body.email){
                console.log(user)
                res.send({userStatus: 'exist'})
                flg =true;
            }
        });
        if(flg==false){
            let userObject = {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address,
                password: req.body.password,
                // image: req.body.image
            }
            Seller.create(userObject).then(function (user) {
                 console.log(user)
                res.send({user,
                    userStatus: "account created"})
            }).catch(next)
                
        }
    
    });

})

router.get('/getsellers',(req,res,next)=>{
let i=0;
    Seller.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i++] = user;
        });
        res.send(userMap);
    });
})

router.post('/getseller',(req,res,next)=>{
    Seller.find({}, function (err, users) {
        let flg = false;
        users.forEach(function (user) {
            if(user.email === req.query.email && user.password === req.query.password){
                console.log(user)
                res.send({user,
                userStatus: ' exist'})
                flg =true;
            }
        });
        if(flg==false){
                res.send({userStatus: " not exist"})
        }
        
    });
  })


router.get('/:email&:password',(req,res,next)=>{
        Seller.find({}, function (err, users) {
            let flg = false;
            users.forEach(function (user) {
                if(user.email === req.params.email && user.password === req.params.password){
                    res.send({user,
                    userStatus: 'exist'})
                    flg =true;
                }
            });
            if(flg==false){
                    res.send({userStatus: "not exist"})
            }
        
        });
    })

router.get('/:id',(req,res,next)=>{

    Seller.findById(req.params.id)
    .then( docs => {
        if(!docs){ return res.status(404).end()}
        return res.status(200).json(docs)
    })
    .catch(err => next(err));
})


router.get('/:id',(req,res,next)=>{

    Products.findById(req.params.id)
    .then( docs => {
        if(!docs){ return res.status(404).end()}
        return res.status(200).json(docs)
    })
    .catch(err => next(err));
})



router.get('/products/:sid',(req,res,next)=>{

    Product.findById(req.params.sid)
    .then( docs => {
        if(!docs){ return res.status(404).end()}
        return res.status(200).json(docs)
    })
    .catch(err => next(err));
})


router.patch('/:id',(req,res,next)=>{
  res.status(200).json({
    message: "updated json"
  })
});

router.delete('/:id',(req,res,next)=>{
    res.status(200).json({
      message: "delted json"
    })
  });


module.exports = router;