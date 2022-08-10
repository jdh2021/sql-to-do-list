const express = require('express');
const router = express.Router();
// const moment = require('moment');
const pool = require('../modules/pool.js');

let taskToPost = '';

router.post('/', (req, res) => {
    console.log('in POST /tasks');
    taskToPost = req.body;
    console.log(taskToPost);
    const queryText = `INSERT INTO "todo" ("description", "completed", "time")
                        VALUES ($1, $2, $3);`
    pool.query(queryText, [taskToPost.description, taskToPost.completed, taskToPost.time])
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
    // taskToPost.timeClicked = moment().format('LT'); //testing moment.js for time task added
    // console.log(taskToPost.timeClicked);
    const queryText = 'SELECT * from "todo"';
    pool.query(queryText).then((result) => {
        console.log('SELECT result is:', result);
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in GET /artist', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    console.log('in DELETE /tasks');
    const queryText = 'DELETE FROM "todo" WHERE "id" = $1;'
    pool.query(queryText, [req.params.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /tasks');
        res.sendStatus(500);
    })
})
// const taskArray = [];

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