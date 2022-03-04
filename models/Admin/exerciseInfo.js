const mongoose = require("mongoose");

var db = require('../../db/connection')

const Schema = mongoose.Schema;

const exerciseInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = exerciseInfoSchema
