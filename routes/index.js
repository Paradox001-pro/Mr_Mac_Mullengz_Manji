const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


const User = require('../models/User')

const Admin = require('../models/Admin')



// WELCOME PAGE
router.get('/', (req, res) => res.render('index'));

// LOGIN
router.get('/login', (req, res) => res.render('login'));


// GALLERY PAGE
router.get('/gallery', (req, res) => {
    Admin.find({}, (err, admin) => {
        res.render('gallery', {
            
            admin:admin,
            // pic: req.admin.inpFile
            // subject: req.user.subject
        })
    })
});

// HASH TAGS
router.get('/portfolio-details', (req, res) => res.render('portfolio-details'));

// INER-HTML PAGE
router.get('/blog', (req, res) => {
    Admin.find({}, (err, admin) => {
        res.render('inner-page', {
            
            admin:admin,
            // pic: req.admin.inpFile
            // subject: req.user.subject
        })
    })
});


router.get('/upload', (req, res) => res.render('preview'));



// DASBOARD
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    User.find({}, (err, user)=>{
    Admin.find({}, (err, admin) => {
        res.render('dashboard', {
            // user:req.user,
            name: req.user.name,
            // message: req.user.message,
            user: user,
            admin:admin,
            // pic: req.admin.inpFile
            // subject: req.user.subject
        })
    })
    })
});
module.exports = router;