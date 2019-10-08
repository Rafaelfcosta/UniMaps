const express = require('express');
const router = express.Router();

let Point = require('../models/point')

router.get('/', (req, res) =>{
    return res.status(200).send('a')
})

router.get('/:id', (req, res) =>{
    Point.findById(req.params.id, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.status(200).send(doc)
    })
})

router.post('/', (req, res) => {
    var query = { '_id': req.body.id };
    let newData = {};
    
    newData.numero = req.body.num;
    newData.bloco = req.body.bloco;
    newData.alias = req.body.alias;

    Point.findOneAndUpdate(query, newData, { upsert: true, useFindAndModify: false }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });

});

module.exports = router