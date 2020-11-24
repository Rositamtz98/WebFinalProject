const {
    Router
  } = require('express');
  const express = require('express');
  const Activity = require('../models/Activity');
  const Course = require('../models/Course');
  const Submission = require('../models/Submission');
  const User = require('../models/User');
  const router = express.Router();
  
  router.get('/activities', async (req, res) => {
    const activities = await Activity.find();
    const courses = await Course.find();
    res.render('activities/all-activities', {
      activities,
      courses
    });
  });
  
  router.get('/activities/add', async (req, res) => {
    const courses = await Course.find();
    res.render('activities/new-activity', {
      courses
    });
  });
  
  router.get('/activities/edit/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    res.render('activities/edit-activity', {
      activity
    });
  });
  
  router.get('/activities/view/:id', async (req, res) => {
    const activity = await Activity.findById(req.params.id);
    const submissions = await Submission.find({
      activity_id: req.params.id
    });
    res.render('activities/activity-detail', {
      submissions,
      activity,
    });
  });
  
  router.put('/activities/edit-activity/:id', async (req, res) => {
    const {
      title,
      link,
      quiz,
    } = req.body;
    const errors =[];

    if (title.length <= 0 || link.length <= 0) {
        errors.push({
          text: 'Faltan uno o más campos por llenar'
        });
      }
    
      if (errors.length > 0) {
        const courses = await Course.find();

        res.render('activities/edit-activity', {
          errors,
          title,
          course_id,
          link,
          quiz,
          courses,
        });
      } else {
        await Activity.findByIdAndUpdate(req.params.id, {
            title,
            link,
            quiz,
          });
          res.redirect('/activities');

      }
  });
  
  router.delete('/activities/delete/:id', async (req, res) => {
    await Activity.findByIdAndDelete(req.params.id);
    res.redirect('/activities');
  })
  
  router.post('/activities/new-activity', async (req, res) => {
    const {
      title,
      course_id,
      link,
      quiz
    } = req.body;
    const errors = [];
  
    if (title.length <= 0 || link.length <= 0 || course_id.length <= 0) {
      errors.push({
        text: 'Faltan uno o más campos por llenar'
      });
    }
  
    if (errors.length > 0) {
        const courses = await Course.find();

      res.render('activities/new-activity', {
        errors,
        title,
        course_id,
        link,
        quiz,
        courses,
      });
    } else {
      const Activity_id = await Activity.findOne({
        title: title
      });
  
      if (Activity_id) {
        req.flash('error_msg', 'Título de la actividad previamente registrada');
        res.redirect('/activities/new-activity');
      }
      const newActivity = new Activity({
        title,
        course_id,
        link,
        quiz
      });
      await newActivity.save();
      req.flash('success_msg', 'Actividad registrada exitosamente');
      res.redirect('/activities');
    }
  });
  
  module.exports = router;