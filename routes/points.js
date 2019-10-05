const express = require('express');
const router = express.Router();

let Point = require('../models/point')

router.get('/', (req, res) => {

    Point.find((err, p) => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send(p)
        }
    })

});

module.exports = router