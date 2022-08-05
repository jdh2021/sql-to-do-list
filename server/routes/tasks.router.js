const express = require('express');
const router = express.Router();

const taskArray = [];

router.post('/', (req, res) => {
    console.log('in router POST');
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