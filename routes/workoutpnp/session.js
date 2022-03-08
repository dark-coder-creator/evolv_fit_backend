const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var router = express.Router();
router.use(bodyParser.json())

const SessionSchema = require('../../models/WorkoutPnP/session');
const Session = mongoose.model('Session',SessionSchema)

const workoutSchema = require('../../models/WorkoutPnP/workout')
const Workout = mongoose.model('Workout',workoutSchema)

//Test data
// {
//     "workout_id":"6225ffcd83c00ad493761a78",
//     "date":"2022-12-22",
//    "userRef":"6221cf7d67e1c8d243417e98",
//    "trainerRef":"6221cef9b1b67592b349b55e",
//    "isCompleted":true
  
//  }

router.post('/',(req,res) => {
  

   const { workout_id } = req.body
    function getWorkout(workoutId,callBack) {
        Workout.findById(workoutId,function(err,result) {
            if(err)
            {
                throw err
            }
            return callBack(result)
        })
    }

    var workouts = getWorkout(workout_id,function(result) {
         
        

         const {date, userRef , trainerRef , isCompleted } = req.body 

    const Sessions = new Session({ workout:result,date , userRef , trainerRef , isCompleted });
    Sessions.save((err,result) => {
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

    
})



module.exports = router