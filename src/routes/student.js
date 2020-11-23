const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

router.get('/home-page', (req, res) => {
    const courses = await Course.find(); // necesito cursos con el id del estudiante
    res.render('studentHome', {courses});
});

module.exports = router;