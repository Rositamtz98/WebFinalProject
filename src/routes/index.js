const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('index');
});

router.get('/about', (req, res) => {
    res.redirect('about');
});

module.exports = router;