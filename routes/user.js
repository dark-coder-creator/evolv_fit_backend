const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const User = require('../models/User/user')

const sessionSchema = require('../models/WorkoutPnP/session')
const Session = mongoose.model('Session',sessionSchema)


var userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.get('/',(req,res) => {
    res.status(200).json('Hello User')
})
// {
//     "email":"ram124@gmail.com",
//     "name":"Ram Kumar",
//     "gender":"M",
//     "DOB":"1997-11-5",
//     "phone":7025949450,
//     "trainerRef":"6221cef9b1b67592b349b55e",
//     "sessions":"6226f3bc013cab80b365ba2e"
//   }
userRouter.post('/details',(req,res) => {
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

userRouter.get('/trainer',(req,res) => {
    User.aggregate([{
        $lookup:{
            
                from: 'trainers',
                localField: 'trainerRef',
                foreignField: '_id',
                as: 'trainer'
              
        }
    }],(err,docs) => {
        if(err)
        {
            throw err
        }
        else 
        {
            res.status(200).json(docs)
        }
    })
})
//to create session with exercises Pushup and Squat with its exercise sets.
userRouter.post('/create-session',(req,res) => {
    //res.status(200).json('create session')
    const { sessionId,userId } = req.body
    function getSession(sessionId,callBack) {
        Session.findById(sessionId,(err,docs) => {
            if(err)
            {
                throw err;
            }
            return callBack(docs)
        })
    }
   
    var sessions = getSession(sessionId,(result) =>{
        //res.status(200).json(result)
           //console.log({result})
         
         User.findOneAndUpdate(userId,{ $push:{ sessions:result} },(err,docs) =>{
             if(err)
             {
                 throw err;
             }
             else 
             {
                 res.status(200).json(docs)
             }
         })
    })
   console.log(sessions)

})

//to get session reference 
userRouter.get('/sessions',(req,res) => {
      User.aggregate([{
          $lookup:{
              from:'sessions',
              localField:'sessions',
              foreignField:'_id',
              as:'Each_sessions'
          }
      }],(err,docs) => {
          if(err)
          {
              throw err
          }
          else
          {
              res.status(200).json(docs)
          }
      })
})




// {
//     from: 'sessions',
//     localField: 'sessions',
//     foreignField: '_id',
//     as: 'Each_sessions'
//   }
module.exports = userRouter