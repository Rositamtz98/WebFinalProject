const express = require('express');
const Course = require('../models/Course');
const Activity = require('../models/Activity');
const Submission = require('../models/Submission');

const router = express.Router();

router.get('/student/view/:id', async (req, res) => {
  const acts = await Activity.find({
    course_id: req.params.id
  }); // necesito cursos con el id del estudiante
  const courseId = req.params.id;
  res.render('student/activities', {
    acts,
    courseId
  });
});

router.get('/student/submit/:id1/:id2', async (req, res) => {
  const courseId = req.params.id1;
  const actId = req.params.id2;
  const act = await Activity.findById(actId);
  res.render('student/submit-activity', {
    act,
    courseId
  });
});

router.post('/student/submit-activity', async (req, res) => {
  const {
    course_id,
    activity_id,
    student_id,
    link,
    grade
  } = req.body;
  const errors = [];

  if (activity_id.length <= 0 || link.length <= 0 || course_id.length <= 0) {
    errors.push({
      text: 'Faltan uno o más campos por llenar'
    });
  }

  if (errors.length > 0) {
    const courseId = course_id;
    const act = await Activity.findById(activity_id);
    res.render(`student/submit-activity`, {
      errors,
      course_id,
      activity_id,
      student_id,
      link,
      grade,
      act,
      courseId
    });
  } else {
    const newSubmission = new Submission({
      course_id,
      activity_id,
      student_id,
      link,
      grade
    });
    await newSubmission.save();
    req.flash('success_msg', 'Actividad entregada exitosamente');
    res.redirect(`/`);
  }
});

router.put('/student/grade/:id', async (req, res) => {
  const {
    grade
  } = req.body;

  await Submission.findByIdAndUpdate(req.params.id, {
    grade
  });

  res.redirect('/');
});


module.exports = router;
