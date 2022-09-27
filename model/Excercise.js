const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
    username: String,
    description: String,
    duration: Number,
    date: Date
});

const Excercise = mongoose.model("Excercise", ExcerciseSchema);

module.exports = Excercise;