const express = require('express');
var session = require('express-session');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const flash = require('connect-flash');

//Importing Routes
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
const profile = require('./routes/profile');
const createuser = require('./routes/createUser');
const job = require('./routes/job');
const viewjobs = require('./routes/viewJob');
const internship = require('./routes/internship');
const viewinternship = require('./routes/viewInternship');
const college = require('./routes/college');
const viewcollege = require('./routes/viewCollege');
const university = require('./routes/university');

//Creating express app
const app = express();

//Declaring port
const port = process.env.port || 8080;

//Register view engine
app.set('view engine', 'ejs');

//Middleware and Static files
app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());

//Session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));


//Database URI
const dbURI = 'mongodb+srv://wicked:test12345@mongoprojects.8mmhw.mongodb.net/fyp?retryWrites=true&w=majority';

//Connection to DB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        //Server listening
        app.listen(port, () => {
            console.log(`Server in action at port: ${port}`);
        });
        console.log('Connected to DB');
    })
    .catch((err) => console.log('Error: ', err));


app.use('/', login);
app.use('/', dashboard);
app.use('/', profile);
app.use('/', createuser);
app.use('/', job)
app.use('/',viewjobs);
app.use('/', internship);
app.use('/', viewinternship);
app.use('/', college);
app.use('/', viewcollege);
app.use('/', university);