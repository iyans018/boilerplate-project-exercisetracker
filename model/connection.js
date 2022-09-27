const mongoose = require("mongoose");
const MONGO_URI = 'mongodb+srv://iyans018:iyans018@cluster0.9dasq.mongodb.net/excercise-tracker?retryWrites=true&w=majority'

module.exports = () => {
    mongoose.connect(MONGO_URI)
    .then(() => console.log('database connected'), err => console.log(err));
};
