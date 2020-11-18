const { Router } = require('express');
const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.render('courses/all-courses', { courses });
});

router.get('/courses/add', (req, res) => {
    res.render('courses/new-course');
});

router.get('/courses/edit/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('courses/edit-course', { course });
});

router.put('/courses/edit-course/:id', async (req, res) => {
    const { subject, teacher_id } = req.body;

    await Course.findByIdAndUpdate(req.params.id, { subject, teacher_id });

    res.redirect('/courses');
});

router.delete('/courses/delete/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect('/courses');
})

router.post('/courses/new-course', async (req, res) => {
    const { course_id, subject, teacher_id } = req.body;
    const errors = [];

    if (course_id.length <= 0 || subject.length <= 0)
    {
        errors.push({text: 'Faltan uno o más campos por llenar'});
    }

    if (errors.length > 0)
    {
        res.render('courses/add', {errors, course_id, subject, teacher_id});
    }
    else
    {
        const Course_id = await Course.findOne({course_id: course_id});

        if (Course_id)
        {
            req.flash('error_msg', 'ID del curso previamente registrado');
            res.redirect('/courses/add');
        }
        const newCourse = new Course({course_id, subject, teacher_id});
        await newCourse.save();
        req.flash('success_msg', 'Curso registrado exitosamente');
        res.redirect('/courses');
    }
});


module.exports = router;