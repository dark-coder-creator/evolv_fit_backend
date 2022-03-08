const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const exerciseInfoSchema = require('../models/Admin/exerciseInfo')
const Admin = mongoose.model('Admin',exerciseInfoSchema) 

var router = express.Router()
router.use(bodyParser.json())
router.get('/',(req,res) => {
    res.status(200).json('Hello admin')
})

router.post('/exerciseInfo',(req,res) => {
    const { name } = req.body;
    const ExerciseInfo = new Admin({ name:name })

     ExerciseInfo.save((err,result) => {
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