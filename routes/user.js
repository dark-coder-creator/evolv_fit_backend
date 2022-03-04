const express = require('express')

const bodyParser = require('body-parser')

const User = require('../models/User/user')

var router = express.Router()

router.use(bodyParser.json())

router.get('/',(req,res) => {
    res.status(200).json('Hello User')
})

router.post('/details',(req,res) => {
    const { email , name , gender , DOB , phone , trainerRef,sessions } = req.body;

    const UserDetails = new User({ email:email,name:name,gender:gender,DOB:DOB,phone:phone,trainerRef:trainerRef,sessions:sessions})

    UserDetails.save(function(err,result) {
        if(err)
        {
            console.log(err)
        }
        else {
            res.status(200).json(result)
        }
    })
})
module.exports = router