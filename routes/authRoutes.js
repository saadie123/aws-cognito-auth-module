const express = require('express');
const amazonCognito = require('amazon-cognito-identity-js');
const passport = require('passport');
const CognitoStrategy = require('passport-cognito');
const User = require('../models/User');
const {poolData}  = require('../config/userPool');

const router = express.Router();

passport.serializeUser((user, done) => {
    done(null ,user);
});
passport.deserializeUser((user, done) => {
    try {
        done(null, user);
    } catch (error) {
        console.log(error);   
    }
});

router.get('/current-user', (req ,res)=> {
    if(!req.user){
        return res.status(401).send({message: 'You are not logged in!'});
    }
    res.send(req.user);
});

router.get('/success', (req, res) => {
    res.status(200).send({user:req.user,message: "You are successfully logged in!"})
});

router.get('/fail', (req,res)=>{
    res.status(400).send({errors:req.flash('error')});
});

router.get('/logout', (req, res)=>{
    const userPool = new amazonCognito.CognitoUserPool(poolData);
    const userData = {
        Username : req.user.username,
        Pool : userPool
    };
    const cognitoUser = new amazonCognito.CognitoUser(userData);
    cognitoUser.signOut();
    req.logout();
    res.status(200).send({message: "You have logged out!"});
});

passport.use(new CognitoStrategy({
    userPoolId: poolData.UserPoolId,
    clientId: poolData.ClientId
}, (accessToken, idToken, refreshToken, user, done) => {
    process.nextTick(()=>{
        done(null ,user);
    });
}));

router.post('/login', passport.authenticate('cognito', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/fail',
    failureFlash: true
}));

router.post('/register', (req, res) => {
    const userPool = new amazonCognito.CognitoUserPool(poolData);
    let attributeList = [];
    const dataName = {
        Name: 'name',
        Value: req.body.name
    }
    const dataEmail = {
        Name: 'email',
        Value: req.body.email
    }
    const attributeName = new amazonCognito.CognitoUserAttribute(dataName);
    const attributeEmail = new amazonCognito.CognitoUserAttribute(dataEmail);
    attributeList.push(attributeName);
    attributeList.push(attributeEmail);
    userPool.signUp(req.body.username, req.body.password, attributeList, null, (err, result) => {
        if(err){
           console.log(err);
           res.status(400).send({err});
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });
        user.save().then(user=>{
            res.status(201).send({message: 'You have registered successfully. Please confirm your email to login!'});    
        }).catch(err=>{
            res.status(400).send({err});
            console.log(err);
        })
    })
});

router.post('/confirm',(req, res)=>{
    const userPool = new amazonCognito.CognitoUserPool(poolData);
    const userData = {
        Username : req.body.username,
        Pool : userPool
    };

    const cognitoUser = new amazonCognito.CognitoUser(userData);
    cognitoUser.confirmRegistration(req.body.code, true, (err, result) => {
        if (err) {
           return res.status(400).send({err});
        }
        res.status(200).send({message: 'Your email has been confirmed. You can now login!'});
    });
});

module.exports = router;