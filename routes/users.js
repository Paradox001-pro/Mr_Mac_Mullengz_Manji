const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const passport = require('passport');


// USER MODEL
const User = require('../models/User');

// ADMIN MODEL
const Admin = require('../models/Admin')



// LOGIN
router.get('/', (req, res) => res.render('index'));

// CONTACT
// router.get('/dashboard', (req, res) => res.render('dashboard'));


router.get('/dashboard',  (req, res) => {

    Admin.find({}, (err, admin) => {
        res.render('dashboard', {
            // user:req.user,
        
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
    const { name, email, subject, phone, address, message, password } = req.body;

    let errors = [];

    // CHECK REQUIRED FIELDS
    if (!name || !email || !subject || !message || !phone || !address || !password ) {
        // res.redirect('/')
        errors.push({ msg: 'Please fill out all fields' });
    } else {
        const newUser = new User ({
            name,
            email,
            subject,
            phone,
            address,
            message,
            password
        });

                         // HASH PASSWORD
                         bcrypt.genSalt(10, (err, salt) => 
                         bcrypt.hash(newUser.password, salt, (err, hash) =>{
                         if(err) throw err;
     
                         // SET PASSWORD TO HASHED
                         newUser.password = hash;
     
                         // SAVE USER
                         newUser.save()
                         .then(user => {
                             req.flash('success_msg', 'message sent successfully, thank you.')
                             res.redirect('/')
                         })
                         .catch(err => console.log(err));
                     }))

        // newUser.save()
        // res.redirect('/')

        // .then(user => {
        //     req.flash('success_msg', 'Message sent successfully')
        //     res.redirect('/')
        // })
        // .catch(err => console.log(err));
    }
});

// post
router.post('/dashboard', (req, res) => {

    const { inpFile, writeups, filter, title } = req.body;

    let errors = [];

    // CHECK REQUIRED FIELDS
    if (!inpFile || !writeups || !filter || !title) {
        // res.redirect('/')
        errors.push({ msg: 'Please fill out all fields' });
    } else {
        const newAdmin = new Admin({
            inpFile,
            writeups,
            filter,
            title

        });

        // SAVE Admin
        newAdmin.save()

            .then(user => {
                req.flash('success_msg', 'Message sent successfully')
                res.redirect('/dashboard')
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