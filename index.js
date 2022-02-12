require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 8000;

const db = require('./config/mongoose');

const app = express();

// body parser
app.use(express.urlencoded());

const expressLayouts = require('express-ejs-layouts');
// contains all css files for styling the app
app.use(express.static('./assets'));

// provide common layout 
app.use(expressLayouts);

// extract style and script from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', require('./routes/index'));

app.listen(PORT, function(err){
    if(err){
        console.log('error in running the server', err);
        return;
    }
    console.log('server is running on port', PORT);
})