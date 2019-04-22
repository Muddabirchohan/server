const express = require('express');
const router = express.Router();
const CustomerNewRequest = require('../models/customerNewRequest');
const invoiceNum  = require('uuid/v1');

router.post('/postnew',(req,res,next)=>{
    let userObject = {
        cusNewReqId: req.body.cusNewReqId,
        newSoftwareDescription: req.body.newSoftwareDescription,
        category:req.body.category
        // invoice_No: invoiceNum()
    }
    CustomerNewRequest.create(userObject).then(function (user) {
        
         console.log(user);
        //  userObject.add(user._id);
        //  console.log(userObject)
         res.send(user)
    }).catch(next)
})


router.get('/getnew/:myid',(req,res,next)=>{
  let i=0;
  CustomerNewRequest.find({}, function (err,
    ) {
    var requests = [];
    request.forEach( function (requ) { 
        if( requ.cusNewReqId.equals(req.params.myid)){
          requests[i++] = requ
        }
    });
    console.log(requests);
    res.send(requests);
  })
  })

router.get('/:id',(req,res,next)=>{

    CustomerNewRequest.findById(req.params.id)
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
