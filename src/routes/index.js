const express = require('express');
const { find } = require('../models/User');
const router = express.Router();
const User = require('../models/User');

router.get('/',  (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.post('/fillData', async (req, res) => {
    
    const aUser = new User({id: "a001182916", name: "Cordelia", last_name: "Lopez", email: "clopez@gmail.com", password: "1234", level: false});
    const bUser = new User({id: "a01196572", name: "Daniel", last_name: "Garza", email: "dgar_96@gmail.com", password: "8765", level: false});
    const cUser = new User({id: "a01876543", name: "Ramiro", last_name: "Gonzalez", email: "rgzz@hotmail.com", password: "7765", level: false});
    const dUser = new User({id: "a1526162", name: "Sandra", last_name: "Fernandez", email: "sfdz@hotmail.com", password: "8876", level: false});
    const eUser = new User({id: "a1526162", name: "Martha", last_name: "Montemayor", email: "mmonte@gmail.com", password: "3456", level: false});

    aUser.password = await aUser.encryptPassword(password);
    bUser.password = await bUser.encryptPassword(password);
    cUser.password = await cUser.encryptPassword(password);
    dUser.password = await dUser.encryptPassword(password);
    eUser.password = await eUser.encryptPassword(password);

    await aUser.save();
    await bUser.save();
    await cUser.save();
    await dUser.save();
    await eUser.save();
    
    res.redirect('/');
})

module.exports = router;