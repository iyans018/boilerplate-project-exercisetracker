const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
    username: { type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
    duration: Number,
    date: Date
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);

module.exports = Exercises;