const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const workoutSchema = require('../../models/WorkoutPnP/workout')
const Workout = mongoose.model('Workout',workoutSchema)


var router = express.Router();
router.use(bodyParser.json()) 

router.get('/',(req,res) => {

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



module.exports = router