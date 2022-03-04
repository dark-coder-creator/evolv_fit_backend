const express = require('express');
const port = 4000
const app = express();

var adminRouter = require('./routes/admin')
var trainerRouter = require('./routes/trainer')
var userRouter = require('./routes/user')
var workoutPnpRouter = require('./routes/workoutpnp')

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

app.listen(port,() =>{
    console.log(`SERVER IS LISTENING ON ${port}`)
})