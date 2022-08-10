const express = require('express');
const router = express.Router();
const moment = require('moment');
const pool = require('../modules/pool.js');

// const taskArray = [];

let taskToPost = '';

router.post('/', (req, res) => {
    console.log('in POST /tasks');
    taskToPost = req.body;
    console.log(taskToPost);
    const queryText = `INSERT INTO "todo" ("description", "completed")
                        VALUES ($1, $2);`
    pool.query(queryText, [taskToPost.description, taskToPost.completed])
        .then((results) => {
            console.log(results);
            res.send(results);
        }).catch((error) => {
            console.log('Error in POST /tasks', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    console.log('in GET /tasks');
    taskToPost.timeClicked = moment().format('LT'); //testing moment.js for time task added
    console.log(taskToPost.timeClicked);
    const queryText = 'SELECT * from "todo"';
    pool.query(queryText).then((result) => {
        console.log('SELECT result is:', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /artist', error);
        res.sendStatus(500);
    });
});

// router.post('/', (req, res) => {
//     console.log('in router POST');
//     taskToPost = req.body;
//     taskArray.push(taskToPost);
//     console.log(taskArray);
//     res.sendStatus(201);
// });

// router.get('/', (req, res) => {
//     console.log('in router GET');
//     taskToPost.timeClicked = moment().format('LT'); //testing moment.js for time task added
//     console.log(taskToPost.timeClicked);
//     res.send(taskArray);
// });

module.exports = router;