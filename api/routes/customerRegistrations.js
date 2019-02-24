const express = require('express');
const router = express.Router();
const Customer = require('../models/customerRegistration');


router.post('/postcustomer',(req,res,next)=>{

  Customer.find({}, function (err, users) {
      let flg = false;
      users.forEach(function (user) {
          if(user.email === req.body.email){
              console.log(user)
              res.send({userStatus: ' exist'})
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
          }
          Customer.create(userObject).then(function (user) {
               console.log(user)
              res.send({user,
                  userStatus: "account created"})
          }).catch(next)
              
      }
  
  });

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

router.post('/getcustomer',(req,res,next)=>{
  Customer.find({}, function (err, users) {
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
  Customer.find({}, function (err, users) {
      let flg = false;
      users.forEach(function (user) {
          if(user.email === req.params.email && user.password === req.params.password){
              console.log(user)
              res.send({user,
              userStatus: 'exist'})
              flg =true;
          }
      });
      if(flg==false){
              res.send({userStatus: " not exist"})
      }
      // res.send(userMap);
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
