const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskArray = [];

let taskToPost = '';

router.post('/', (req, res) => {
    console.log('in router POST');
    taskToPost = req.body;
    taskArray.push(taskToPost);
    console.log(taskArray);
    res.sendStatus(201);
});

router.get('/', (req, res) => {
    console.log('in router GET');
    taskToPost.timeClicked = moment().format('LT'); //testing moment.js for time task added
    console.log(taskToPost.timeClicked);
    res.send(taskArray);
});

module.exports = router;