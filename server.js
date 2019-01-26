const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
if(env === 'development'){
  process.env.MONGODB_URI = 'mongodb://localhost:27017/IndecisionApp';
}

const mongojs = require('mongojs');
const db = mongojs(process.env.MONGODB_URI, [ 'options' ]);
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 8080;

app.post('/all', (req, res) => {
    db.options.find((err, options) => {
        if(err) {
            res.send(err);
        }
        res.json(options);
    });
});

app.post('/option', (req, res) => {
    const option = req.body;
    db.options.save(option, (err, option) => {
        if(err) {
            res.send(err);
        }
        res.json(option);
    })
});

app.post('/delete', (req, res) => {
    const option = req.body;
    db.options.remove(option, (err, option) => {
        if(err) {
            res.send(err);
        }
        res.json(option);
    })
});

app.post('/empty', (req, res) => {
    db.options.remove((err, options) => {
        if(err) {
            res.send(err);
        }
        res.json(options);
    });
});

app.listen(PORT, () => console.log(`App is running at ${PORT}`));