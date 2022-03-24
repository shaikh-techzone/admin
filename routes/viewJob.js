const express = require('express');


const user = require('../schemas/login');
const job = require('../schemas/job');

const router = express.Router();


router.get('/admin/dashboard/viewjobs', async (req, res) => {
    const viewJob_toast = req.flash('viewJob_toast')
    let Admin, AdminEmail, Details, Jobs;

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

        await job.find()
            .then((result) => {
                Jobs = result;
            })
            .catch((error) => {
                console.log(error);
            })
        //console.log(Jobs)
        res.status(201).render('viewJobs', { title: 'Admin | View jobs', Details, Jobs, viewJob_toast });

    }
});


router.get('/admin/dashboard/viewjobs/delete/:id', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        console.log('in_delete_route')

        let jobID;
        jobID = req.params.id;
        console.log(jobID)

        
        var myquery = { _id: jobID };
        await job.deleteOne(myquery,(err)=>{
            if(err){
                throw err;
            }else{
                return res.status(201).redirect('/admin/dashboard/viewjobs');
            }
        })
        // let title = req.body.title;
        // let location = req.body.location;
        // let job_nature = req.body.job_nature;
        // let salary_range = req.body.salary_range;
        // let job_desc = req.body.job_desc;
        // let responsibility = req.body.responsibility;
        // let qualification = req.body.qualification;
        // let vacancy = req.body.vacancy;
        // let category = req.body.category;
        // let company_detail = req.body.companydetails;

        // const Job = new job({
        //     title,
        //     location,
        //     job_nature,
        //     salary_range,
        //     job_desc,
        //     responsibility,
        //     qualification,
        //     vacancy,
        //     category,
        //     company_detail
        // })
        // Job.save()
        //     .then(() => {
        //         job_toast = {
        //             type: 'success',
        //             intro: 'Success!',
        //             message: ': Job created successfully!'
        //         }
        //         req.flash('job_toast', job_toast);

        //         res.status(201).redirect('/admin/dashboard/job');
        //     })
        //     .catch((err) => {
        //         job_toast = {
        //             type: 'danger',
        //             intro: 'Failed!',
        //             message: ': Job creation unsuccessfully!'
        //         }
        //         req.flash('job_toast', job_toast);

        //         res.status(201).redirect('/admin/dashboard/job');
        //         console.log(err)
        //     })

    }
});

module.exports = router;