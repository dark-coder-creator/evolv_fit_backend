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

// {
//     "workout_id":"62277ed7925ec74114df45ae",
//     "date":"2022-03-10",
//    "userRef":"6221cf7d67e1c8d243417e98",
//    "trainerRef":"6221cef9b1b67592b349b55e",
//    "isCompleted":false
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

// {
//     "sessionId":"62277fbd17df5d083c6a24ea"
//  }
router.put('/update_date',(req,res) =>{
    const { sessionId } =req.body 
    Session.findById(sessionId,(err,docs) => {
        if(err)
        {
            throw err
        }
        else 
        {
           
            const date = docs.date
            if(docs.isCompleted === false)
            {
                // let text = date.toString()
                
                
                // let splittedDate = text.split(" ") 
                // let number = parseInt(splittedDate[2])
                // let addedDate = number+1;
                //  var stringDate = addedDate.toString()
                //  splittedDate[0] = 'Fri'
                // splittedDate[2] = stringDate;
                // console.log(splittedDate)
                //  var modifiedDate = splittedDate.join()

                // var increasedDate = new Date(modifiedDate)
                const addedDate =date.getDate()+1;
                date.setDate(addedDate)

                Session.findByIdAndUpdate(sessionId,{date:date},(err,docs) =>{
                    if(err)
                    {
                        throw error
                    }
                    else 
                    {
                        res.status(200).json(docs)
                    }
                })
               
            }
            else 
            {
                res.status(404).json(docs)
            }
        }
    
    })
})

module.exports = router