const { Router } = require('express');
const express = require('express');
const Homework = require('../models/Homework');
const router = express.Router();
const fs = require('fs'); 
const path = require('path');
var multer = require('multer'); 
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()) 
  } 
}); 

var upload = multer({ storage: storage });

router.get('/homeworks', async (req, res) => {
  const homeworks = await Homework.find();
  res.render('homeworks/all-homeworks', { homeworks });
});

router.get('/homeworks/view/:id', async (req, res) => {
  const homework = await Homework.findById(req.params.id);
  res.render('homeworks/homework-detail', { homework });
});

router.get('/homeworks/add', (req, res) => {
  res.render('homeworks/new-homework');
});

router.get('/homeworks/edit/:id', async (req, res) => {
  const homework = await Homework.findById(req.params.id);
  res.render('homeworks/edit-homework', { homework });
});

router.put('/homeworks/edit-homework/:id', async (req, res) => {
  const { link, subject, teacher_id } = req.body;

  await Homework.findByIdAndUpdate(req.params.id, { link, subject, teacher_id });

  res.redirect('/homeworks');
});

router.delete('/homeworks/delete/:id', async (req, res) => {
  await Homework.findByIdAndDelete(req.params.id);
  res.redirect('/homeworks');
})

router.post('/homeworks/new-homework', upload.single('image'), async (req, res) => {
  // upload.single('image'),
  const { homework_id, link, subject, teacher_id } = req.body;
  const errors = [];

  if (homework_id.length <= 0 || link.length <= 0 || subject.length <= 0)
  {
      errors.push({text: 'Faltan uno o más campos por llenar'});
  }

  if (errors.length > 0)
  {
      res.render('homeworks/add', {errors, homework_id, link, subject, teacher_id});
  }
  else
  {
      const Homework_id = await Homework.findOne({homework_id: homework_id});

      if (Homework_id)
      {
          req.flash('error_msg', 'ID de la tarea previamente registrado');
          res.redirect('/homeworks/add');
      }

      let project_folder;
      if(process.pkg){
          //  It is run as an executable
          project_folder = path.dirname(process.execPath)
          
      }else{
          //  It is run with nodejs
          project_folder = __dirname
      }
      var obj = { 
        homework_id: req.body.homework_id, 
        link: req.body.link, 
        img: { 
            data: fs.readFileSync(path.join('uploads/' + req.file.filename)), 
            contentType: 'image/png'
        },
        subject: req.body.subject,
        teacher_id: req.body.teacher_id,
    } 


    const newHomework = new Homework({homework_id, link, subject, teacher_id});
    await newHomework.save();
    req.flash('success_msg', 'Tarea registrada exitosamente');
    res.redirect('/homeworks'); 

  }
});

module.exports = router;