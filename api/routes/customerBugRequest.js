const express = require('express');
const router = express.Router();
const customerBugRequest = require('../models/customerBugRequest');
const invoiceNum  = require('uuid/v1');

router.post('/postbug',(req,res,next)=>{
    let userObject = {
        cusBugReqId: req.body.cusBugReqId,
        productId: req.body.productId,
        bugDescription:req.body.bugDescription
        // invoice_No: invoiceNum()
    }
    customerBugRequest.create(userObject).then(function (user) {
        
         console.log(user);
        //  userObject.add(user._id);
        //  console.log(userObject)
         res.send(user)
    }).catch(next)
})

router.get('/getbug',(req,res,next)=>{
let i=0;
customerBugRequest.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i] = user;
        });
        res.send(userMap);
    });

})

router.get('/:id',(req,res,next)=>{

    customerBugRequest.findById(req.params.id)
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
