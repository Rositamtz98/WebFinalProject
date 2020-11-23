const { Router } = require('express');
const express = require('express');
const Activity = require('../models/Activity');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

router.get('/activities', async (req, res) => {
    const activities = await Activity.find();
    const courses = await Course.find();
    res.render('activities/all-activities', { activities, courses });
});

router.get('/activities/add', async (req, res) => {
    const courses = await Course.find();
    res.render('activities/new-activity', { courses });
});

router.get('/activities/edit/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    res.render('activities/edit-activity', { activity });
});

router.get('/activities/view/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    res.render('activities/activity-detail', { activity });
  });

router.put('/activities/edit-activity/:id', async (req, res) => {
    const { link, value, quiz, teacher_id } = req.body;

    await Activity.findByIdAndUpdate(req.params.id, { link, value, quiz, teacher_id });

    res.redirect('/activities');
});

router.delete('/activities/delete/:id', async (req, res) => {
    await Activity.findByIdAndDelete(req.params.id);
    res.redirect('/activities');
})

router.post('/activities/new-activity', async (req, res) => {
    const { activity_id, course_id, link, value, quiz, teacher_id } = req.body;
    const errors = [];

    if (activity_id.length <= 0 || link.length <= 0 || course_id.length <= 0)
    {
        errors.push({text: 'Faltan uno o más campos por llenar'});
    }

    if (errors.length > 0)    
    {
        res.render('activities/add', {errors, course_id, activity_id, link, value, quiz, teacher_id});
    }
    else
    {
        const Activity_id = await Activity.findOne({activity_id: activity_id});

        if (Activity_id)
        {
            req.flash('error_msg', 'ID del curso previamente registrado');
            res.redirect('/activities/add');
        }
        const newActivity = new Activity({activity_id, course_id, link, value, quiz, teacher_id});
        await newActivity.save();
        req.flash('success_msg', 'Curso registrado exitosamente');
        res.redirect('/activities');
    }
});


module.exports = router;