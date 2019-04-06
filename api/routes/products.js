const express = require('express');
const router = express.Router();
const Product = require('../models/product');
var cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
    cloud_name: 'chohan',
    api_key: '688479206376147',
    api_secret: 'MIBtC1LlfdbeQPVB8DtCfgorFw8'
});

// router.get('/checkenv',(req,res,next)=>{
// console.log(process.env.CLOUDINARY_URL);
// })


// File upload
cloudinary.uploader.upload('shoes.jpg', { tags: 'basic_sample' }, function (err, image) {
    console.log();
    console.log("** File Upload");
    if (err) { console.warn(err); }
    console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
    console.log("* " + image.public_id);
    console.log("* " + image.url);
    waitForAllUploads("shoes", err, image);
});


router.get('/getproducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            userMap[i++] = user;
        });
        res.send(userMap);
    });

})


router.get('/webproducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "Web App") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})


router.get('/androidproducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "Android App" || user.category === "Ios App" || user.category === "Android/Ios App") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/vrar', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "VR" || user.category === "AR") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/ai', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "AI") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/ecommerce', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "Ecommerce") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})




router.get('/iot', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "IOT") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})


router.get('/:id', (req, res, next) => {

    Product.findById(req.params.id)
        .then(docs => {
            if (!docs) { return res.status(404).end() }
            return res.status(200).json(docs)
        })
        .catch(err => next(err));
})


// router.post('/postproduct',  upload.single('userimage') , function(req,res,next){


//     User.create(req.body).then(function (user) {
//         console.log(req.body)
//         res.send(user)
//     }).catch(next)

// })

router.post('/getSellerProducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, products) {
        var productMap = [];
        products.forEach(function (product) {
            if (product.seller_id.equals(req.query.seller_id)) {
                productMap[i++] = product
            }
        });
        console.log(productMap);
        res.send(productMap);
    })
        .catch(err => next(err));
})

router.post('/postproduct', (req, res, next) => {
    let userObject = {
        seller_id: req.body.seller_id,
        pname: req.body.pname,
        pdescription: req.body.pdescription,
        screenShot: req.body.screenShot,
        exeUrl: req.body.exeUrl,
        demoVideoUrl: req.body.demoVideoUrl,
        hostUrl: req.body.hostUrl,
        cost: req.body.cost,
        category: req.body.category,
        screenShotPublicId: req.body.screenShotPublicId
    }
    Product.create(userObject).then(function (user) {
        console.log(user);
        res.send(user)
    }).catch(next)
})

router.patch('/updateProduct', (req, res, next) => {
    Product.updateOne({ "_id": req.query.productid },
        {
            $set:
            {
                "pname": req.body.pname,
                "pdescription": req.body.pdescription,
                "category": req.body.category,
                "exeUrl": req.body.exeUrl,
                "hostUrl": req.body.hostUrl,
                "demoVideoUrl": req.body.demoVideoUrl,
                "screenShot": req.body.screenShot,
                "cost": req.body.cost,
                "screenShotPublicId": req.body.screenShotPublicId
            }

        }).then(function (user) {
            res.send({ updateStatus : 'updated' });
        })

});

router.patch('/:productid', (req, res, next) => {
    Product.updateOne({ "_id": req.params.productid.toString() },
        {
            $set:
            {
                "pname": req.body.pname,
                "pdescription": req.body.pdescription,
                "category": req.body.category,
                "exeUrl": req.body.exeUrl,
                "hostUrl": req.body.hostUrl,
                "demoVideoUrl": req.body.demoVideoUrl,
                "screenShot": req.body.screenShot,
                "cost": req.body.cost
            }

        }).then(function (user) {
            res.send(user);
        })

});

router.delete('/delProduct', (req, res, next) => {

    Product.deleteOne({ "_id": req.query.productid}).then(function (user) {
        res.send({ delStatus : 'deleted' });
    }).catch(next);
});

router.delete('/:productid', (req, res, next) => {

    Product.deleteOne({ "_id": req.params.productid.toString() }).then(function (user) {
        res.send("sussessfull deleted");
    }).catch(next);
});

module.exports = router;
