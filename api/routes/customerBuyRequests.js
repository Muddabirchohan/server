const express = require('express');
const router = express.Router();
const CustomerBuyRequest = require('../models/customerBuyRequest');
const invoiceNum  = require('uuid/v1');

router.post('/buy',(req,res,next)=>{
    let userObject = {
        cusBuyReqId: req.body.cusBuyReqId,
        Product_Id: req.body.Product_Id,
        // invoice_No: invoiceNum()
    }
    CustomerBuyRequest.create(userObject).then(function (user) {
        
         console.log(user);
        //  userObject.add(user._id);
        //  console.log(userObject)
         res.send(user)
    }).catch(next)
})


router.get('/buyreq',(req,res,next)=>{
let i=0;
CustomerBuyRequest.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i++] = user;
        });
        res.send(userMap);
    });

})

router.get('/:id',(req,res,next)=>{

    CustomerBuyRequest.findById(req.params.id)
    .then( docs => {
        if(!docs){ return res.status(404).end()}
        return res.status(200).json(docs)
    })
    .catch(err => next(err));
})


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
