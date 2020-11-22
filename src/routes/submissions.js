const { Router } = require('express');
const express = require('express');
const Activity = require('../models/Activity');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

router.get('/submissions', async (req, res) => {
    const submissions = await submission.find();
    res.render('submissions/all-submissions', { submissions });
});

router.get('/submissions/add', async (req, res) => {
    const courses = await Course.find();
    res.render('submissions/new-submission', { courses });
});

router.get('/submissions/edit/:id', async (req, res) => {
    const submission = await submission.findById(req.params.id);
    res.render('submissions/edit-submission', { submission });
});

router.get('/submissions/view/:id', async (req, res) => {
    const submission = await submission.findById(req.params.id);
    res.render('submissions/submission-detail', { submission });
  });

router.put('/submissions/edit-submission/:id', async (req, res) => {
    const { link, value, quiz, teacher_id } = req.body;

    await submission.findByIdAndUpdate(req.params.id, { link, value, quiz, teacher_id });

    res.redirect('/submissions');
});

router.delete('/submissions/delete/:id', async (req, res) => {
    await submission.findByIdAndDelete(req.params.id);
    res.redirect('/submissions');
})

router.post('/submissions/new-submission', async (req, res) => {
    const { submission_id, course_id, link, value, quiz, teacher_id } = req.body;
    const errors = [];

    if (submission_id.length <= 0 || link.length <= 0 || course_id.length <= 0)
    {
        errors.push({text: 'Faltan uno o más campos por llenar'});
    }

    if (errors.length > 0)    
    {
        res.render('submissions/add', {errors, course_id, submission_id, link, value, quiz, teacher_id});
    }
    else
    {
        const submission_id = await submission.findOne({submission_id: submission_id});

        if (submission_id)
        {
            req.flash('error_msg', 'ID del curso previamente registrado');
            res.redirect('/submissions/add');
        }
        const newsubmission = new submission({submission_id, course_id, link, value, quiz, teacher_id});
        await newsubmission.save();
        req.flash('success_msg', 'Curso registrado exitosamente');
        res.redirect('/submissions');
    }
});


module.exports = router;