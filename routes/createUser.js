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

router.get('/admin/dashboard/createuser', async (req, res) => {
    const createuser_toast = req.flash('createuser_toast')


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
        res.status(201).render('createUser', { title: 'Admin | Create User', Details, createuser_toast });
    }
})



// upload.single('profile_img')
router.post('/admin/dashboard/createuser', upload.single('profile_img'), async (req, res) => {
    let Admin, AdminEmail, Details;
    let name = req.body.name;
    let email = req.body.email;
    let new_password = req.body.new_password;
    let confirm_password = req.body.confirm_password;
    let phone = req.body.phone;
    let role = req.body.role;
    let status = req.body.status;
    let profile_img = req.file.path;
    console.log("test" + email)
    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else if (new_password != confirm_password) {
        createuser_toast = {
            type: 'danger',
            intro: 'Error!',
            message: ': Incorrect confirm password!'
        }
        req.flash('createuser_toast', createuser_toast);

        res.status(201).redirect('/admin/dashboard/createuser');
    } else {
        Admin = req.session.user;
        AdminEmail = req.session.email;

        const User = new user({
            name,
            email,
            password: new_password,
            phone,
            role,
            status,
            profile_img
        })
        User.save()

            // console.log('else'+ AdminEmail)
            // await user.findOne({ email: AdminEmail })
            .then((result) => {

                            createuser_toast = {
                                type: 'success',
                                intro: 'Success!',
                                message: ': User created successfully!'
                            }
                            req.flash('createuser_toast', createuser_toast);

                            res.status(201).redirect('/admin/dashboard/createuser');

            })
            .catch((error) => {
                createuser_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': No user created!'
                }
                req.flash('createuser_toast', createuser_toast);

                res.status(201).redirect('/admin/dashboard/createuser');
            })

    }
});
module.exports = router;