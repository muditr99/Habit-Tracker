const Habit = require('../models/habit');
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
               'September', 'October', 'November', 'December'];

// this action displays seven days of each habit and their status for each day
module.exports.show = function(req, res){
    let today = new Date();
    let days = [];

    for(let i=0; i<7; i++){
        let date = today.getDate() + '-' + month[today.getMonth()] + '-' + today.getFullYear();
        days.push(date);
        today.setDate(today.getDate()-1);
    }
    days.reverse();

    Habit.find({}, function(err, habits){
        shuffle(habits);
        if(err){
            console.log("error in fetching habits from db", err);
            return;
        }
        // console.log(habits);
        return res.render('weekly_view', {
            title: "Habit Tracker",
            habit_list : habits,
            days : days,
           });
    });
}

// updates the status of habit for a day
module.exports.update = function(req, res){
    // console.log(req.query);
    let id = req.query.id;
    let day = req.query.day;
    let type = req.query.type;
    
    Habit.findById(id, function(err, habit){
        if(err){
            console.log('error in updating the habit', err);
            return;
        }
        // console.log(habit);
        habit.Days[day] = type;
        habit.save();
        completedDays(habit);
        return res.redirect('/weekView');
    })
}

// find the no of days the user completed the habit
const completedDays = async function(habit){
    let totalCompleted = 0;
    for(let i=0;i<habit.Days.length;i++){
        if(habit.Days[i] == 'Complete'){
            totalCompleted++;
        }
    }
    await Habit.findByIdAndUpdate(habit.id, {
        completed : totalCompleted,
    });
    return;
}

// shuffle/change of statuses of habits if the user viewing date is not matched with the habit currDate/creating Date
const shuffle = async function(habits){
    let today = new Date();
    let todaysDate = today.getDate();
    
    for(let i=0;i<habits.length;i++){
        let diff = todaysDate-habits[i].currDate;
        if(diff > 0){
            for(let j = diff, k=0;j<habits[i].Days.length;j++,k++){
                habits[i].Days[k] = habits[i].Days[j];
            }
            let remPos = habits[i].Days.length - diff;
            for(let j=remPos;j<habits[i].Days.length;j++){
                habits[i].Days[j] = 'None';
            }
        }
        habits[i].currDate = todaysDate;
        habits[i].save();
    }
    return;
}
