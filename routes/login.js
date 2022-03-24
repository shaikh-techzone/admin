const express = require('express');

const login = require('../schemas/login');

const router = express.Router();

router.get('/', (req, res) => {

    res.status(201).render('welcome', { title: 'Welcome' });
});

router.get('/admin/login', (req, res) => {
    const login_toast = req.flash('login_toast')
    res.status(201).render('login', { title: 'Login', login_toast });
});

router.post('/admin/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    await login.findOne({ email })
        .then((result) => {
            if (result.password === password && result.email == email && result.status === 'active') {
                req.session.user = result.name;
                req.session.email = result.email;
                res.status(201).redirect('/admin/dashboard');
            }
            else {
                login_toast = {
                    type: 'danger',
                    intro: 'Failed!',
                    message: ': Invalid username or password!'
                }
                req.flash('login_toast', login_toast)
                res.status(201).redirect('login');
            }
        })
        .catch((error) => {
            login_toast = {
                type: 'danger',
                intro: 'Failed!',
                message: ': Invalid username or password!'
            }
            req.flash('login_toast', login_toast)
            res.status(201).redirect('login');
        })
});

router.get('/admin/dashboard', async (req, res) => {

    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let Admin, AdminEmail, Details, userList;
        Admin = req.session.user;
        AdminEmail = req.session.email;

        await login.find()
            .then((result) => {
                userList = result
                //console.log(userList);
            })
            .catch((err) => {
                console.log('Error finding userList at line 64 {file: login.js}')
            })

        await login.findOne({ email: AdminEmail })
            .then((result) => {
                Details = result;
                // console.log(Details)
            })


        res.status(201).render('index', { title: 'Admin Dashboard', Details, userList });

    }

});



router.get('/admin/delete/:id', async (req, res) => {

    if (!req.session.user) {
        return res.status(401).redirect('/admin/login');
    } else {
        let userID;
        userID = req.params.id;
        console.log(userID)

        var myquery = { _id: userID };
        await login.deleteOne(myquery,(err)=>{
            if(err){
                throw err;
            }else{
                return res.status(201).redirect('/admin/dashboard');
            }
        })
    }

});

router.get('/admin/logout', (req, res) => {

    req.session.user = null;
    Details = null;
    res.redirect('/');

});



module.exports = router;