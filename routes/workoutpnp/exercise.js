const express = require('express')

const mongoose = require('mongoose')

const exerciseSchema = require('../../models/WorkoutPnP/exercise')

const Exercise = mongoose.model('Exercise',exerciseSchema)

const exerciseSetSchema = require('../../models/WorkoutPnP/exerciseSet')

const ExerciseSet = mongoose.model('ExerciseSet',exerciseSetSchema)

const exerciseRouter = express.Router()


exerciseRouter.get('/',(req,res) => {
    //res.status(200).json('Hello exercise Router')
    Exercise.find({},(err,docs) =>{
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

exerciseRouter.post('/exercise_datas',(req,res) => {
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

exerciseRouter.post('/datas',(req,res) =>{
    const { exerciseSetId,exerciseInfoRef,name  } =req.body
    function getExerciseSet(exerciseSetId,callBack) {
        ExerciseSet.findById(exerciseSetId,(err,result) =>{
            if(err)
            {
                throw err
            }
            else 
            {
                return callBack(result)
            }
        })
    }

    const exercisesSet = getExerciseSet(exerciseSetId,(result) => {
          //  res.status(200).json(result)
          console.log(result.suggestedWeight)
          const _id = result._id
          const number = result.number
           const suggestedWeight = result.suggestedWeight
           const  suggestedReps = result.suggestedReps
           const  performedWeight = result.performedWeight
           const performedReps = result.performedReps
            const Exercises = new Exercise({ exerciseInfoRef , name , exerciseSets:{_id:_id,number:number,suggestedWeight:suggestedWeight,suggestedReps:suggestedReps,performedWeight:performedWeight,performedReps:performedReps}
             });
    Exercises.save(function(err,docs) {
        if(err)
        {
            console.log(err)
        }
        else {
            res.status(200).json(docs)
        }
    })
    })
})

//to update exercise sets

exerciseRouter.put('/exercise_sets',(req,res) =>{
    
    const { exerciseSetId , exerciseId} = req.body

    function getExerciseSet(exerciseSetId,callBack) {
        ExerciseSet.findById(exerciseSetId,(err,result) =>{
            if(err)
            {
                throw err
            }
            else 
            {
                return callBack(result)
            }
        })
    }
  
     const exerciseSet = getExerciseSet(exerciseSetId,(result) => {
         console.log(result._id)
         const _id = result._id
         const number = result.number
          const suggestedWeight = result.suggestedWeight
          const  suggestedReps = result.suggestedReps
          const  performedWeight = result.performedWeight
          const performedReps = result.performedReps
          Exercise.findOneAndUpdate(exerciseId,{ $push:{  exerciseSets:{_id:_id,number:number,suggestedWeight:suggestedWeight,suggestedReps:suggestedReps,performedWeight:performedWeight,performedReps:performedReps}}},(err,docs) =>{
              if(err)
              {
                  throw err
              }
              else 
              {
                  res.status(200).json(docs)
              }
          } )

     })

    
})

// {
//     "exerciseInfoRef":"622763d80f6c1ed4167b55dc",
//     "name":"Pullup",
    
// }

module.exports = exerciseRouter;