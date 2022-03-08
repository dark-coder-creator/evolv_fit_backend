const express = require('express');
const port = 4000
const app = express();
//1.Admin Router
var adminRouter = require('./routes/admin')

//2.Trainer Router
var trainerRouter = require('./routes/trainer')

//3.User Router
var userRouter = require('./routes/user')

//4.workoutpnp router
var workoutPnpRouter = require('./routes/workoutpnp')

//5.Session in workoutpnp pnp router
var sessionRouter = require('./routes/workoutpnp/session')

//6.
var workoutRouter = require('./routes/workoutpnp/workout')


//7.
var exerciseRouter = require('./routes/workoutpnp/exercise')


//8.
var exerciseSetRouter = require('./routes/workoutpnp/exerciseSet')

app.get('/',(req,res) => {
    res.status(200).json('Hello Server')
})


//*To use different routes for different functions for different models 
//1.To use admin router.
app.use('/admin',adminRouter)
//2.To use trainer router
app.use('/trainer',trainerRouter)
//3.To use User router 
app.use('/user',userRouter)
//4.To use WorkoutPnp router 
app.use('/workoutpnp',workoutPnpRouter)

//The different flow in workoutpnp
app.use('/workoutpnp/session',sessionRouter)
//2.Workout
app.use('/workoutpnp/workout',workoutRouter)
//3.Exercise
app.use('/workoutpnp/exercise',exerciseRouter)
//4.Exercise Set
app.use('/workoutpnp/exerciseSet',exerciseSetRouter)

app.listen(port,() =>{
    console.log(`SERVER IS LISTENING ON ${port}`)
})