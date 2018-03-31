const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
global.fetch = require('node-fetch');

const authRoutes = require('./routes/authRoutes');

mongoose.connect('mongodb://admin:admin@ds141088.mlab.com:41088/testlab1db1'); 
mongoose.Promise = global.Promise;

const app = express();
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['ilovejavascript'] 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'client','public')));

app.use('/auth', authRoutes);

app.use('*', (req, res)=>{
    res.redirect('/');
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})