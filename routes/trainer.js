const express = require('express');

const bodyParser = require('body-parser')

const Trainer = require('../models/Trainer/trainer')

var router = express.Router();
router.use(bodyParser.json())

router.get('/',(req,res) => {
    res.status(200).json('Hello trainer')
})

//to enter the details of trainer 
router.post('/details',(req,res) => {
    const { name , email,userRefs } = req.body 

    const TrainerDetails = new Trainer({ name:name,email:email,userRefs:userRefs})

    TrainerDetails.save(function(err,result) {
        if(err)
        {
            console.log(err)
        }
        else 
        {
            res.status(200).json(result)
        }
    })
})

module.exports = router


