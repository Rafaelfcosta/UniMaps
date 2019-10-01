const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const index = require('./routes/index');

const mongoose = require('mongoose');
const dbUrl = 'mongodb://unimaps:aaa123@ds229078.mlab.com:29078/unimaps';

//conexão com o db mlab
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    console.log('mongodb connected!');
});
let db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

const app = express();
const port = process.env.PORT || 8888

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});

