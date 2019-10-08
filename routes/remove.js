const express = require('express');
const router = express.Router();

let Point = require('../models/point')

router.post('/', (req, res) => {

    Point.deleteOne({ _id: req.body.id }, function(err) {
        if (err) return res.send(500, { error: err });
        return res.send("succesfully removed");
    });

});

module.exports = router