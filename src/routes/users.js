const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');
const { route } = require('.');

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (name.length <= 0)
    {
        errors.push({text: 'Favor de ingresar nombre'});
    }

    if (email.length <= 0)
    {
        errors.push({text: 'Favor de ingresar un correo'});
    }
    if (password != confirm_password)
    {
        errors.push({text: 'Contraseñas no coinciden'});
    }

    if (password.length < 4)
    {
        errors.push({text: 'Contraseña debe ser mayor a 4 caracteres'});
    }

    if (errors.length > 0)
    {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }
    else
    {
        const emailUser = await User.findOne({email: email});

        if (emailUser)
        {
            req.flash('error_msg', 'Correo ya tiene una cuenta registrada');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registro realizado exitosamente');
        res.redirect('/users/login');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;