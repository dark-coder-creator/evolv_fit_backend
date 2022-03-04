const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//WorkoutPnp/exercise
const exerciseSchema = require('../models/WorkoutPnP/exercise')
const Exercise = mongoose.model('Exercise',exerciseSchema)

//WorkoutPnp/exerciseSetSchema
const exerciseSetSchema = require('../models/WorkoutPnP/exerciseSet')
const ExerciseSet = mongoose.model('Exerciseset',exerciseSetSchema);

//WorkoutPnp/SessionSchema
const SessionSchema = require('../models/WorkoutPnP/session')
const Session = mongoose.model('Session',SessionSchema) 

//WorkoutPnp/workoutSchema
const workoutSchema = require('../models/WorkoutPnP/workout')
const Workout = mongoose.model('Workout',workoutSchema)



var router = express.Router()

router.use(bodyParser.json())

router.get('/',(req,res) => {
    res.status(200).json('Hello workoutpnp')
})

//to create workout datas
router.post('/workout_data',(req,res) => {
    const { name } = req.body
    const Workouts = new Workout({ name })
    Workouts.save(function(err,result) {
        if(err)
        {
            console.log(err)
        }
        else {
            res.status(200).json(result);
        }
    })
})



//to feed exercise datas 
router.post('/exercise_datas',(req,res) => {
    const { exerciseInfoRef,name } = req.body
    const Exercises = new Exercise({ exerciseInfoRef , name });
    Exercises.save(function(err,result) {
        if(err)
        {
            console.log(err)
        }
        else {
            res.status(200).json(result)
        }
    })
})




//to create session datas
router.post('/session_datas',(req,res) => {
    const { date, userRef , trainerRef , isCompleted } = req.body 

    const Sessions = new Session({ date , userRef , trainerRef , isCompleted });
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


//exercise_set_datas 

router.post('/exercise_set_datas',(req,res) => {
    const { number,suggestedWeight,suggestedReps,performedWeight,performedReps  } = req.body

    const ExerciseSets = new ExerciseSet({ number , suggestedWeight, suggestedReps, performedWeight, performedReps});
    ExerciseSets.save(function(err,result) {
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