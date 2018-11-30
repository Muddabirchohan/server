const express = require('express');
const router = express.Router();
const Customer = require('../models/customerRegistration');


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


router.get('/getcustomers',(req,res,next)=>{
let i=0;
    Customer.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i] = user;
        });
        res.send(userMap);
    });

})

router.get('/:id',(req,res,next)=>{

    Customer.findById(req.params.id)
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
