const Habit = require('../models/habit');

// fetch all habits from db and display to user on home page
module.exports.home = function(req, res){
    Habit.find({}, function(err, habits){
        if(err){
            console.log("error in fetching habits from db", err);
            return;
        }
        // console.log(habits);
        return res.render('home', {
            title: "Habit Tracker",
            habit_list : habits,
           });
    });
}

// this action creates new habit and redirects to home page
module.exports.create = function(req, res){
    let today = new Date();
    let todaysDate = today.getDate();
    Habit.create({
        name : req.body.name,
        completed : 0,
        currDate : todaysDate,
    }, function(err, newHabit){
        if(err){
            console.log("error in creating a habit", err);
            return;
        }
        // console.log(newHabit);
        return res.redirect('/');
    })
}

// this action removes the habit 
module.exports.delete = function(req, res){
    let id = req.query.id;

    Habit.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting the habit", err);
            return;
        }
        return res.redirect('/');
    });

}

