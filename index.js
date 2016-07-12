const express = require('express');
const path = require('path');
const model = require('./model/userinfo.js');
const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

app.get('/user', function(req, res) {
    var user = req.query.user;
    model.getUser(user, (err, ret) => {
        if (err) {
            res.statusCode = 404;
            res.end(err.message);
        } else {
            res.statusCode = 200;
            res.end(JSON.stringify(ret));
        }
    });
});

app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});