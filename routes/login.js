const express = require('express');

const login = require('../schemas/login');
const college = require('../schemas/college');
const university = require('../schemas/university');
const internship = require('../schemas/internship');
const job = require('../schemas/job');
const activity = require('../schemas/activities');
const clogger = require('../schemas/userLog');


const router = express.Router();

//file global variables
let inTime, outTime;

router.get('/', (req, res) => {

    res.status(201).render('welcome', { title: 'Welcome' });
});

router.get('/admin/login', (req, res) => {
    const login_toast = req.flash('login_toast')
    res.status(201).render('login', { title: 'Login', login_toast });
});

router.post('/admin/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    await login.findOne({ email })
        .then((result) => {
            if (result.password === password && result.email == email && result.status === 'active') {
                req.session.user = result.name;
                req.session.email = result.email;
                res.status(201).redirect('/admin/dashboard');
            }
            else {
                login_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': Invalid username or password!'
                }
                req.flash('login_toast', login_toast)
                res.status(201).redirect('login');
            }
        })
        .catch((error) => {
            login_toast = {
                type: 'danger',
                intro: 'Failed!',
                message: ': Invalid username or password!'
            }
            req.flash('login_toast', login_toast)
            res.status(201).redirect('login');
        })

    inTime = new Date();
    console.log(inTime)
});
const counter = async (col) => {
    let count = 0;
    count = await col.countDocuments();
    return count;

}
router.get('/admin/dashboard', async (req, res) => {

    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let Admin, AdminEmail, Details, userList, noOfColleges, noOfUniversities, noOfJobs, noOfInternships, noOfScholarships, activities, loggerList;
        Admin = req.session.user;
        AdminEmail = req.session.email;
        noOfColleges = await counter(college);
        noOfUniversities = await counter(university);
        noOfJobs = await counter(job);
        noOfInternships = await counter(internship);

        // console.log(noOfColleges, noOfUniversities, noOfJobs, noOfInternships)

        await login.find()
            .then((result) => {
                userList = result
                //console.log(userList);
            })
            .catch((err) => {
                console.log('Error finding userList at line 64 {file: login.js}')
            })

        await login.findOne({ email: AdminEmail })
            .then((result) => {
                Details = result;
                // console.log(Details)
            })

        await activity.find()
            .then((result) => {
                activities = result;
            })

        await clogger.find()
            .then((result)=>{
                loggerList = result;
            })
            console.log("Login.js"+loggerList)
        res.status(201).render('index', { title: 'Admin Dashboard', Details, userList, noOfColleges, noOfUniversities, noOfJobs, noOfInternships, activities, loggerList });

    }

});



router.get('/admin/delete/:id', async (req, res) => {

    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let userID;
        userID = req.params.id;
        console.log(userID)

        var myquery = { _id: userID };
        await login.deleteOne(myquery, (err) => {
            if (err) {
                throw err;
            } else {
                return res.status(201).redirect('/admin/dashboard');
            }
        })
    }

});


const customLogger = (inTime, outTime, req) => {
    let user = req.session.user;
    let newUserLog = new clogger({
        user,
        inTime,
        outTime
    })
    newUserLog.save()
    .then((result)=>{})
    .catch((error)=>{})
}


router.get('/admin/logout', (req, res) => {
    outTime = new Date();
    customLogger(inTime, outTime, req);
    req.session.user = null;
    Details = null;
    res.redirect('/');

});



module.exports = router;