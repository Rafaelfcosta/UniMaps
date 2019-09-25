const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8888

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.listen(port, function (req, res) {
    console.log('Listening on http://localhost:' + port);
});

app.get('/', function (req, res) {
    res.send('ok');
});