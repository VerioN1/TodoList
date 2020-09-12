const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/todoList";

mongoose.Promise = global.Promise;
mongoose.connect(uri);
// its importent to put this upper
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, OPTIONS')
    next();
});

const todoRoute = require('./routes/todos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/todos', todoRoute);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})


module.exports = app;