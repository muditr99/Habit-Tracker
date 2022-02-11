const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connecting to db'));

db.once('open', function(){
    console.log('connection to db is successful');
})
