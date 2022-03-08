const express = require('express')

const mongoose = require('mongoose')

const exerciseSetSchema = require('../../models/WorkoutPnP/exerciseSet')
const ExerciseSet = mongoose.model('ExerciseSet',exerciseSetSchema)

const exerciseSetRouter = express.Router();


exerciseSetRouter.get('/',(req,res) => {
   // res.status(200).json('Hello exercise sets')
   ExerciseSet.find({},(err,docs) => {
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

exerciseSetRouter.post('/exercise_set_datas',(req,res) => {
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

// {
//     "exerciseSetId":"622265c677d11e4e6ac0dc4b",
//     "performedWeight":82,
//     "performedReps":14
// }

 //to update the data of performedWeight and performedReps 
 exerciseSetRouter.put('/exercise_set_datas',(req,res) => {
     const { exerciseSetId , performedWeight , performedReps } = req.body;

     ExerciseSet.findByIdAndUpdate(exerciseSetId,{ performedWeight:performedWeight,performedReps:performedReps},(err,docs) =>{
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

module.exports = exerciseSetRouter