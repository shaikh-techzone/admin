const express = require('express');


const user = require('../schemas/login');
const scholar = require('../schemas/scholarship');
const activity = require('../schemas/activities');

const router = express.Router();


router.get('/admin/dashboard/scholarship', async (req, res) => {
    const scholarship_toast = req.flash('scholarship_toast')
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
        res.status(201).render('scholarship', { title: 'Admin | Scholarship', Details, scholarship_toast });

    }
});


router.post('/admin/dashboard/scholarship', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let name = req.body.name;
        let city = req.body.city;
        let country = req.body.country;
        let type = req.body.type;
        let about_scholarship = req.body.about_scholarship;
        let eligibility = req.body.eligibility;
        let seats = req.body.seats;
        let minimum_percent = req.body.minimum_percent;
        let scholarship = req.body.scholarship;


        const Scholarship = new scholar({
            name,
            city,
            country,
            type,
            about_scholarship,
            eligibility,
            seats,
            minimum_percent,
            scholarship
        })
        Scholarship.save()
            .then(() => {
                scholarship_toast = {
                    type: 'success',
                    intro: 'Success!',
                    message: ': Scholarship created successfully!'
                }
                req.flash('scholarship_toast', scholarship_toast);

                res.status(201).redirect('/admin/dashboard/scholarship');
            })
            .catch((err) => {
                scholarship_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': Scholarship creation unsuccessfully!'
                }
                req.flash('scholarship_toast', scholarship_toast);

                res.status(201).redirect('/admin/dashboard/scholarship');
                console.log(err)
            })
            let user = req.session.user;
            let task = `scholarship ${name}`;
    
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