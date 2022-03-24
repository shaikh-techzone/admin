const express = require('express');
const multer = require('multer');

const user = require('../schemas/login');

const router = express.Router();

/// Multer specs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profiles/');
    },
    filename: function (req, file, cb) {
        let ex = new Date().toISOString().replace(/:/g, '-');
        cb(null, ex + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject or accept a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

/////END

router.get('/admin/dashboard/profile', async (req, res) => {
    const profile_toast = req.flash('profile_toast')
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
        res.status(201).render('profile', { title: 'Admin Profile', Details, profile_toast });

    }
});

// upload.single('profile_img')
router.post('/admin/dashboard/profile', upload.single('profile_img'), async (req, res) => {
    let Admin, AdminEmail, Details;
    let name = req.body.name;
    let email = req.body.email;
    let current_password = req.body.current_password;
    let new_password = req.body.new_password;
    let confirm_password = req.body.confirm_password;
    let phone = req.body.phone;
    let role = req.body.role;
    let status = req.body.status;
    let profile_img = req.file.path;
    console.log("test"+email)
    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else if(new_password != confirm_password){
        profile_toast = {
            type: 'danger',
            intro: 'Error!',
            message: ': Incorrect confirm password!'
        }
        req.flash('profile_toast', profile_toast);

        res.status(201).redirect('/admin/dashboard/profile');
    }else {
        Admin = req.session.user;
        AdminEmail = req.session.email;
        // console.log('else'+ AdminEmail)
        await user.findOne({ email: AdminEmail })
            .then((result) => {

                if (result.password === current_password && result.email == email) {
                    let myquery = {Admin} ;
                    var newvalues = { $set: { name, email, password: new_password, phone, role, status, profile_img } };
                    user.updateOne({ myquery }, newvalues, function (err, res) {
                        if (err){
                            profile_toast = {
                                type: 'danger',
                                intro: 'Failed!',
                                message: ': Connection failed to connect resources!'
                            }
                            req.flash('profile_toast', profile_toast);
                        }
                        console.log("1 document updated");
                    });
                    Details = result;

                    profile_toast = {
                        type: 'success',
                        intro: 'Success!',
                        message: ': Updated profile information successfully!'
                    }
                    req.flash('profile_toast', profile_toast);

                    res.status(201).redirect('/admin/dashboard/profile');
                    // console.log(Details)
                    // res.status(201).render('profile', { title: 'Admin Profile',  Details });
                }
                else {
                    profile_toast = {
                        type: 'danger',
                        intro: 'Error!',
                        message: ': Invalid credentials!'
                    }
                    req.flash('profile_toast', profile_toast);

                    res.status(201).redirect('/admin/dashboard/profile');
                }



               
            })
            .catch((error) => {
                profile_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': No such user found!'
                }
                req.flash('profile_toast', profile_toast);

                res.status(201).redirect('/admin/dashboard/profile');
            })

    }
});

module.exports = router;