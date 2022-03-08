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

//****Workout */

//to create workout datas
router.post('/workout_data',(req,res) => {
    const { name , exercises } = req.body
    const Workouts = new Workout({ name , exercises })
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

//to update and add
router.put('/add_workout_data',(req,res) => {
    const obj = {"name":"Squat","exerciseInfoRef":"6221f77d9779d825dfc4ad0e","exerciseSets":{"number":4,"suggestedWeight":82,"suggestedReps":12}}

    Workout.findOneAndUpdate({workout_id:req.body.workout_id},{ $push:{ exercises:obj}},function(err,result) {
        if(err) {
            console.log(err)
        }
        else {
            console.log("RESULT"+result)
            res.send('Done')
        }
    })

})



router.get('/get_workout_datas',(req,res) => {
    Workout.find({},function(err,result) {
        if(err)
        {
            console.log(err)
        }
        else 
        {
            res.status(200).send(result)
        }
    })
})







//***Exercise***

//to feed exercise datas 
router.post('/exercise_datas',(req,res) => {
    const { exerciseInfoRef,name,exerciseSets } = req.body
    const Exercises = new Exercise({ exerciseInfoRef , name , exerciseSets });
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

router.get('/get_exercise_datas',(req,res) => {
    Exercise.find({},function(err,result) {
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



//********



//*********Session */


//to create session datas
router.post('/session_datas',(req,res) => {
    const { workout,date, userRef , trainerRef , isCompleted } = req.body 

    const Sessions = new Session({ workout,date , userRef , trainerRef , isCompleted });
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





//******* */

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