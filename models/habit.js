const mongoose = require('mongoose');

// defines what the habit looks like in the database
const habitSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    completed : {
        type : Number
    },
    currDate : {
        type:Number
    },
    Days : [],
}, {
    timestamps : true
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;