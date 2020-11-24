const {
    Router
  } = require('express');
  const express = require('express');
  const Course = require('../models/Course');
  const Activity = require('../models/Activity');
  const User = require('../models/User');
  const router = express.Router();
  
  router.get('/courses', async (req, res) => {
    var courses;
    if (req.session.passport) {
      console.log(req.body)
      console.log(req.session)
      const usr = req.session.passport.user;
      console.log(usr)
      console.log("end")
      const u = await User.findById(usr);
      console.log(u)
      courses = await Course.find({
        teacher_id: u.id
      });
    } else {
      courses = await Course.find();
    }
  
    const students = await User.find({
      level: false
    });
    console.log(students);
    res.render('courses/all-courses', {
      courses,
      students
    });
  });
  
  router.get('/courses/add', async (req, res) => {
    const teachers = await User.find({
      level: true
    });
    res.render('courses/new-course', {
      teachers
    });
  });
  
  router.get('/courses/add-student/:id', async (req, res) => {
    const {
      student_id
    } = req.body;
    console.log(req.params);
    const courseWithID = await Course.findById(req.params.id);
    const students = await User.find({
      level: false
    });
    const student = await User.find({
      id: student_id
    });
    res.render('courses/new-student', {
      students,
      courseWithID
    });
  
    console.log(student);
  })
  
  router.get('/courses/edit/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    const teachers = await User.find({
      level: true
    });
    res.render('courses/edit-course', {
      course,
      teachers
    });
  });
  
  router.put('/courses/edit-course/:id', async (req, res) => {
    const {
      subject,
      teacher_id
    } = req.body;
  
    await Course.findByIdAndUpdate(req.params.id, {
      subject,
      teacher_id
    });
  
    res.redirect('/courses');
  });
  
  router.delete('/courses/delete/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect('/courses');
  })
  
  router.post('/courses/new-course', async (req, res) => {
    const teachers = await User.find({
      level: true
    });
    const {
      course_id,
      subject,
      teacher_id
    } = req.body;
    const errors = [];
  
    if (course_id.length <= 0 || subject.length <= 0) {
      errors.push({
        text: 'Faltan uno o más campos por llenar'
      });
    }
  
    if (errors.length > 0) {
      res.render('courses/new-course', {
        errors,
        course_id,
        subject,
        teacher_id,
        teachers,
      });
    } else {
      const Course_id = await Course.findOne({
        course_id: course_id
      });
  
      if (Course_id) {
        req.flash('error_msg', 'ID del curso previamente registrado');
        res.redirect('/courses/new-course');
      }
      const newCourse = new Course({
        course_id,
        subject,
        teacher_id
      });
      await newCourse.save();
      req.flash('success_msg', 'Curso registrado exitosamente');
      res.redirect('/courses');
    }
  });
  
  router.post('/courses/new-student/', async (req, res) => {
    const {
      student_id,
      courseWithID
    } = req.body;
    const errors = [];
  
    console.log()
  
    if (errors.length > 0) {
      res.render('courses/add-student', {
        errors,
        course_id,
        sutudent_id
      });
    } else {
      console.log("found");
      console.log(courseWithID);
      const student = await courseWithID.students.findOne({
        student_id: student_id
      });
      console.log(student);
      if (student) {
        req.flash('error_msg', 'ID del alumno previamente registrado');
        res.redirect('/courses/all-courses');
      }
      const ans = await User.find({
        id: student_id
      });
      course.students.push(ans);
      await course.save();
      req.flash('success_msg', 'Alumno registrado exitosamente');
      res.redirect('/courses/all-courses');
    }
  });
  
  router.get('/courses/view/:id', async (req, res) => {
    const course = await Course.findById(req.params.id);
    const acts = await Activity.find({
      course_id: req.params.id
    });
    console.log(acts);
    res.render('courses/course-detail', {
      course,
      acts
    });
  });
  
  module.exports = router;
  