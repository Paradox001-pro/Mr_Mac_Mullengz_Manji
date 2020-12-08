// const LocalStrategy = require('passport-local').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// LOAD MODEL
const User = require('../models/User');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ 
            usernameField: 'email'
        // passReqToCallback: true
    }, (email, password, done) => {
    // }, ( res, password, email) => {


        // if( email === 'daniel@gmail.com' && password === 'dann') {
        //     return done(null, (req,res) =>{ res.redirect('/dashboard')})
        // }


            // MATCH USER
            User.findOne({email: email })
            .then( user => {
                if(!user) {
                    return done(null, false, { message: 'That email is not registered'});
                }
                // if(email === 'daniel@gmail.com' && password ==='dann'){
                //     res.redirect('/dashboard')
                // }

                // MATCH PASSWORD
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    // if(password === 'dann'){
                    //     res.redirect('/dashboard')
                    // }
                    if(err) console.log(err) ;

                    if(isMatch) {
                        return done(null, user)
                        
                    }else {
                    return done(null, false, {message: 'Password incorrect'})
                }
                });
            })
            .catch(err => console.log(err));
        })
    );


    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done ) => { 
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}