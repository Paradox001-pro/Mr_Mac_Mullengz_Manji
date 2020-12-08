const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');


// USER MODEL
const User = require('../models/User');

const Admin = require('../models/Admin')


// LOGIN
router.get('/', (req, res) => res.render('index'));

// CONTACT
// router.get('/dashboard', (req, res) => res.render('dashboard'));


router.get('/dashboard',  (req, res) => {

    Admin.find({}, (err, admin) => {
        res.render('dashboard', {
            
            admin:admin,
            // pic: req.admin.inpFile
            // subject: req.user.subject
        })

        })

})


router.get('/login', (req, res) => res.render('login'));


// contact HANDLE
router.post('/', (req, res) => {






    // console.log(req.body)
    const { name, email, subject, message, } = req.body;

    let errors = [];

    // CHECK REQUIRED FIELDS
    if (!name || !email || !subject || !message) {
        // res.redirect('/')
        errors.push({ msg: 'Please fill out all fields' });
    } else {
        const newUser = new User({
            name,
            email,
            subject,
            message,
            // password
        });

        // HASH PASSWORD
        bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;

                // SET PASSWORD TO HASHED
                newUser.password = hash;

                // SAVE USER
                newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are now registered and can login')
                        res.redirect('/')
                    })
                    .catch(err => console.log(err));
            }))

            // newUser.save()
            // res.redirect('/')

            .then(user => {
                req.flash('success_msg', 'Message sent successfully')
                res.redirect('/')
            })
            .catch(err => console.log(err));
    }
});


// post
router.post('/dasboard', (req, res) => {

    const { inpFile, writeups } = req.body;

    let errors = [];

    // CHECK REQUIRED FIELDS
    if (!inpFile || !writeups) {
        // res.redirect('/')
        errors.push({ msg: 'Please fill out all fields' });
    } else {
        const newAdmin = new Admin({
            inpFile,
            writeups

        });

        // SAVE Admin
        newAdmin.save()

            res.redirect('/dashboard')

            .then(user => {
                req.flash('success_msg', 'Message sent successfully')
                res.redirect('/')
            })
            .catch(err => console.log(err));
    }
});

// LOGIN HanDLE
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// LOGOUT HANDLE
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_message', 'you are logged out successfully');
    res.redirect('/users/login')
});

module.exports = router;