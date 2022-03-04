var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/evolvefit_database'
mongoose.connect(mongoDB,{ useNewUrlParser:true,useUnifiedTopology:true})

var db = mongoose.connection 

db.on('error',console.error.bind(console,'MongoDB Connection Error'))

module.exports = { db }