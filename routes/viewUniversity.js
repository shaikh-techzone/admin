const express = require('express');


const user = require('../schemas/login');
const university = require('../schemas/university');

const router = express.Router();


router.get('/admin/dashboard/viewuniversities', async (req, res) => {
    const viewUniversity_toast = req.flash('viewUniversity_toast')
    let Admin, AdminEmail, Details, Universities;

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

        await university.find()
            .then((result) => {
                Universities = result;
            })
            .catch((error) => {
                console.log(error);
            })
        //console.log(Jobs)
        res.status(201).render('viewUniversities', { title: 'Admin | View Universities', Details, Universities, viewUniversity_toast });

    }
});


router.get('/admin/dashboard/viewuniversities/delete/:id', async (req, res) => {


    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        console.log('in_delete_route')

        let universityID;
        universityID = req.params.id;
        console.log(universityID)

        
        var myquery = { _id: universityID };
        university.deleteOne(myquery,(err)=>{
            if(err){
                throw err;
            }else{
                return res.status(201).redirect('/admin/dashboard/viewuniversities');
            }
        })
    
    }
});

module.exports = router;