const express = require('express');


const user = require('../schemas/login');
const college = require('../schemas/college');

const router = express.Router();


router.get('/admin/dashboard/viewcolleges', async (req, res) => {
    const viewCollege_toast = req.flash('viewCollege_toast')
    let Admin, AdminEmail, Details, Colleges;

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

        await college.find()
            .then((result) => {
                Colleges = result;
            })
            .catch((error) => {
                console.log(error);
            })
        //console.log(Jobs)
        res.status(201).render('viewColleges', { title: 'Admin | View Colleges', Details, Colleges, viewCollege_toast });

    }
});


router.get('/admin/dashboard/viewcolleges/delete/:id', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        console.log('in_delete_route')

        let collegeID;
        collegeID = req.params.id;
        console.log(collegeID)

        
        var myquery = { _id: collegeID };
        college.deleteOne(myquery,(err)=>{
            if(err){
                throw err;
            }else{
                return res.status(201).redirect('/admin/dashboard/viewcolleges');
            }
        })
    
    }
});

module.exports = router;