const express = require('express');
const router = express.Router();
const moment = require('moment');

const taskArray = [];

router.post('/', (req, res) => {
    console.log('in router POST');
    let currentTime = moment().format('LT'); //testing moment.js for time task added
    console.log(currentTime);
    const taskToPost = req.body;
    taskArray.push(taskToPost);
    console.log(taskArray);
    res.sendStatus(201);
});

router.get('/', (req, res) => {
    console.log('in router GET');
    res.send(taskArray);
});

module.exports = router;