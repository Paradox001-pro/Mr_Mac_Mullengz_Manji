const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const expressLayouts = require('express-ejs-layouts');


const app = express();

// PASSPORT CONFIG
require('./config/passport')(passport);

// MONGODB CONFIG
const db = require('./config/keys');


// CONNECT TO DB 
mongoose.connect(db.MongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() => console.log('MongoDB Connected successfully')) 
.catch( err => console.log(err));


// CONNECT FLASH
app.use(flash());


// CONFIGURING EXPRESS APP
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '')))


// EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false}));


app.use(session({
    secret: 'dfghjklkjhgfghjkl67890',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true}
}));



app.use(passport.initialize());
app.use(passport.session());


// GLOBAL VARIABLES
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.isAuthenticated = req.user ? true : false;
    res.locals.user = req.user;
    // req.locals.success = req.flash('success');

    next();

});



// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`server started on port ${PORT}`))
