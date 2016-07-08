const express = require('express');
const path = require('path');
const model = require('./model/userinfo.js');
const app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/user', function(req, res) {
    var user = req.query.user;
    model.getUser(user, (ret) => {
        if (ret && ret !== 'error') {
            res.statusCode = 200;
            res.end(JSON.stringify(ret));
        } else {
            res.statusCode = 404;
            res.end("sorry, error!");
        }
    });
});

app.listen(5000, () => {
    console.log("listening on port 5000");
});