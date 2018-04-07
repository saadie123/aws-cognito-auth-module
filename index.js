const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
global.fetch = require('node-fetch');

// <------ Routes Import -------> 
const authRoutes = require('./routes/authRoutes');

// <------ MongoDB connection ------->
mongoose.connect('mongodb://admin:admin@ds141088.mlab.com:41088/testlab1db1'); 
// mongoose.connect('mongodb://localhost/authApp');
mongoose.Promise = global.Promise;

const app = express();

// <------ Middlewares ------->
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['ilovejavascript'] 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'client','public')));
// <------ Middlewares ------->

// <------ Routes Setup ------->
app.use('/auth', authRoutes);

// This route will redirect after unknown routes requests 
app.use('*', (req, res)=>{  
    res.redirect('/');
});
// <------ Routes Setup ------->

// <------ Port setup ------->
const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// <------ Port setup ------->