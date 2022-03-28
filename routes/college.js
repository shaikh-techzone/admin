const express = require('express');


const user = require('../schemas/login');
const college = require('../schemas/college');
const activity = require('../schemas/activities');


const router = express.Router();


router.get('/admin/dashboard/college', async (req, res) => {
    const college_toast = req.flash('college_toast')
    let Admin, AdminEmail, Details;

    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        Admin = req.session.user;
        AdminEmail = req.session.email;
        await user.findOne({ email: AdminEmail })
            .then((result) => {
                Details = result;
            })
            .catch((error) => {
                console.log(error);
            })
        // console.log(Details)
        res.status(201).render('college', { title: 'Admin | College', Details, college_toast });

    }
});


router.post('/admin/dashboard/college', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let name = req.body.name;
        let city = req.body.city;
        let country = req.body.country;
        let street_address = req.body.street_address;
        let about_college = req.body.about_college;
        let eligibility = req.body.eligibility;
        let seats = req.body.seats;
        let minimum_percent = req.body.minimum_percent;
        let rank = req.body.rank;
        let scholarship = req.body.scholarship;


        const College = new college({
            name,
            city,
            country,
            street_address,
            about_college,
            eligibility,
            seats,
            minimum_percent,
            rank,
            scholarship
        })
        College.save()
            .then(() => {
                college_toast = {
                    type: 'success',
                    intro: 'Success!',
                    message: ': College created successfully!'
                }
                req.flash('college_toast', college_toast);

                res.status(201).redirect('/admin/dashboard/college');
            })
            .catch((err) => {
                college_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': College creation unsuccessfully!'
                }
                req.flash('college_toast', college_toast);

                res.status(201).redirect('/admin/dashboard/college');
                console.log(err)
            })
            let user = req.session.user;
            let task = `college ${name}`;
    
            const Activity = activity({
                user,
                task
            })
            .save()
            .then(()=>{})
            .catch((err)=>{})
    }
});

module.exports = router;