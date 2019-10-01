const express = require('express');

const router = express.Router();

router.get('/', (req, res) =>{
    res.type('html')
    res.send('/public/index.html')
});

router.post('/',  (req, res) =>{
    console.log(req.body);
})

module.exports = router