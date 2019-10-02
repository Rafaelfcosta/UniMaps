const express = require('express');
const router = express.Router();

let Point = require('../models/point')

router.get('/', (req, res) => {
    
    res.type('html')
    res.send('/public/index.html')
    
    // async () =>{
    //     const result = await Point.find();
    //     console.log(result);
    // }
    
    
});

router.post('/', (req, res) => {

    let point = new Point();
    point.numero = req.body.num;
    point.bloco = req.body.bloco;
    point.alias = req.body.alias;


    console.log(req.body);
    console.log(point);

    point.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('success');
        }
    })
})

module.exports = router