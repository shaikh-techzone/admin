const express = require('express');


const user = require('../schemas/login');
const internship = require('../schemas/internship');
const activity = require('../schemas/activities');

const router = express.Router();


router.get('/admin/dashboard/internship', async (req, res) => {
    const internship_toast = req.flash('internship_toast')
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
        res.status(201).render('internship', { title: 'Admin | Internship', Details, internship_toast });

    }
});


router.post('/admin/dashboard/internship', async (req, res) => {
    
    
    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let title = req.body.title;
        let location = req.body.location;
        let internship_nature = req.body.internship_nature;
        let salary_range = req.body.salary_range;
        let internship_desc = req.body.internship_desc;
        let responsibility = req.body.responsibility;
        let qualification = req.body.qualification;
        let vacancy = req.body.vacancy;
        let category = req.body.category;
        let company_detail = req.body.companydetails;

        const Internship = new internship({
            title,
            location,
            internship_nature,
            salary_range,
            internship_desc,
            responsibility,
            qualification,
            vacancy,
            category,
            company_detail
        })
        Internship.save()
        .then(()=>{
            internship_toast = {
                type: 'success',
                intro: 'Success!',
                message: ': Internship created successfully!'
            }
            req.flash('internship_toast', internship_toast);

            res.status(201).redirect('/admin/dashboard/internship');
        })
        .catch((err)=>{
            internship_toast = {
                type: 'danger',
                intro: 'Failed!',
                message: ': Internship creation unsuccessfully!'
            }
            req.flash('internship_toast', internship_toast);

            res.status(201).redirect('/admin/dashboard/internship');
            console.log(err)
        })
        let user = req.session.user;
        let task = `internship ${title}`;

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