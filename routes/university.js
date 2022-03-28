const express = require('express');


const user = require('../schemas/login');
const university = require('../schemas/university');
const activity = require('../schemas/activities');

const router = express.Router();


router.get('/admin/dashboard/university', async (req, res) => {
    const university_toast = req.flash('university_toast')
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
        res.status(201).render('university', { title: 'Admin | University', Details, university_toast });

    }
});


router.post('/admin/dashboard/university', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let name = req.body.name;
        let city = req.body.city;
        let country = req.body.country;
        let street_address = req.body.street_address;
        let type = req.body.type;
        let about_university = req.body.about_university;
        let eligibility = req.body.eligibility;
        let seats = req.body.seats;
        let minimum_percent = req.body.minimum_percent;
        let rank = req.body.rank;
        let scholarship = req.body.scholarship;


        const University = new university({
            name,
            city,
            country,
            street_address,
            type,
            about_university,
            eligibility,
            seats,
            minimum_percent,
            rank,
            scholarship
        })
        University.save()
            .then(() => {
                university_toast = {
                    type: 'success',
                    intro: 'Success!',
                    message: ': University created successfully!'
                }
                req.flash('university_toast', university_toast);

                res.status(201).redirect('/admin/dashboard/university');
            })
            .catch((err) => {
                college_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': University creation unsuccessfully!'
                }
                req.flash('university_toast', university_toast);

                res.status(201).redirect('/admin/dashboard/university');
                console.log(err)
            })
            let user = req.session.user;
            let task = `university ${name}`;
    
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