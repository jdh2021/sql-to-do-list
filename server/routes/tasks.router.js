const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const pool = require('../modules/pool.js');

let taskToPost = '';

router.post('/', (req, res) => {
    console.log('in POST /tasks');
    taskToPost = req.body;
    const queryText =   `INSERT INTO "todo" ("description", "completed", "time_added", "time_completed")
                        VALUES ($1, $2, $3, $4);`
    pool.query(queryText, [taskToPost.description, taskToPost.completed, taskToPost.time_added, taskToPost.time_completed])
        .then((results) => {
            // console.log(results);
            res.send(results);
        }).catch((error) => {
            console.log('Error in POST /tasks', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    console.log('in GET /tasks');
    const queryText = 'SELECT * from "todo" ORDER BY "time_added" ASC';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error in GET /artist', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    console.log('in DELETE /tasks');
    const queryText = 'DELETE FROM "todo" WHERE "id" = $1;'
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in DELETE /tasks');
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    console.log('in PUT /task');
    const taskId = req.params.id;
    const timeTaskCompleted = req.body.time_completed;
    console.log(taskId);
    console.log(req.body.time_completed);
    const queryText =  `UPDATE "todo" SET "time_completed" = $1, 
                        "completed" = 'true' 
                        WHERE "id" = $2;`;
    pool.query(queryText, [timeTaskCompleted, taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        });
});

module.exports = router;