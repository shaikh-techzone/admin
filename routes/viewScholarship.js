const express = require('express');


const user = require('../schemas/login');
const scholarship = require('../schemas/scholarship');

const router = express.Router();


router.get('/admin/dashboard/viewscholarships', async (req, res) => {
    const viewScholarship_toast = req.flash('viewScholarship_toast')
    let Admin, AdminEmail, Details, Scholarships;

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

        await scholarship.find()
            .then((result) => {
                Scholarships = result;
            })
            .catch((error) => {
                console.log(error);
            })
        //console.log(Jobs)
        res.status(201).render('viewScholarships', { title: 'Admin | View Scholarships', Details, Scholarships, viewScholarship_toast });

    }
});


router.get('/admin/dashboard/viewscholarships/delete/:id', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        console.log('in_delete_route')

        let scholarshipID;
        scholarshipID = req.params.id;
        console.log(scholarshipID)

        
        var myquery = { _id: scholarshipID };
        scholarship.deleteOne(myquery,(err)=>{
            if(err){
                throw err;
            }else{
                return res.status(201).redirect('/admin/dashboard/viewscholarships');
            }
        })
    
    }
});

module.exports = router;