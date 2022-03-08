const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const workoutSchema = require('../../models/WorkoutPnP/workout')
const Workout = mongoose.model('Workout',workoutSchema)


const exerciseSchema = require('../../models/WorkoutPnP/exercise')
const Exercise = mongoose.model('Exercise',exerciseSchema)

var workoutRouter = express.Router();
workoutRouter.use(bodyParser.json()) 

workoutRouter.get('/',(req,res) => {

    Workout.find({},(err,docs) => {
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

workoutRouter.put('/add_workout_data',(req,res) => {
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



// {
//     "workoutName":"Evening Workout",
//     "exerciseId":"6225fce6ef910e5aae6620b9"
// }
workoutRouter.post('/workout_data',(req,res) => {
    const {workoutName,exerciseId} = req.body 

   
    Exercise.findById(exerciseId,(err,docsOne) => {
            if(err)
            {
                throw err
            }
            else 
            {
                 //res.status(200).json(docs)
                 console.log(docsOne.exerciseInfoRef)
                 const exerciseInfoRef = docsOne.exerciseInfoRef
                 const exerciseSets = docsOne.exerciseSets
                 const name = docsOne.name
               const Workouts = new Workout({ name:workoutName , exercises:{exerciseInfoRef,name,exerciseSets}})
               Workouts.save((err,result) => {
                   if(err)
                   {
                       throw err
                   }
                   res.status(200).json(result)
               })
            }
    }) 

    // const Workouts = new Workout({ name , exercises })
    // Workouts.save(function(err,result) {
    //     if(err)
    //     {
    //         console.log(err)
    //     }
    //     else {
    //         res.status(200).json(result);
    //     }
    // })
})


module.exports = workoutRouter