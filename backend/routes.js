const express = require('express');
const router = express.Router();

const courseControl = require('./Controller/courseControl');
const authControl = require('./Controller/authControl');

const isAuth = require('./Middlerware/isAuth');

router.get('/' , (req , res) => {
    return res.status(200).json({
        mesg : 'done'
    });
})


router.post('/courses' , courseControl.postCourse)
router.post('/login' , authControl.postLogin);
router.post('/signup' , authControl.postSignup);
router.post('/buycourse' , isAuth ,courseControl.postBuyCourse)


router.get('/courses' , courseControl.getCourse);
router.get('/user', isAuth ,authControl.getUser);

module.exports = router;