const express = require('express');

const router = express.Router();

//define routes methods
router.get('/', (req, res, next) => {
    res.json('This is the post routes');
})

module.exports = router;