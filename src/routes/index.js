const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

router.get('/', async (req, res) => {
    const courses = await Course.find();
    res.render('index', {courses});
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;