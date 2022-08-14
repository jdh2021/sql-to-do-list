const express = require('express');
const { Pool } = require('pg');
const taskRouter = express.Router();
const pool = require('../modules/pool.js');

taskRouter.post('/', (req, res) => {
    console.log('in POST /tasks');
    let taskToPost = req.body;
    const queryText =   `INSERT INTO "todo" ("description", "completed", "time_added", "time_completed")
                        VALUES ($1, $2, $3, $4);`;
    pool.query(queryText, [taskToPost.description, taskToPost.completed, taskToPost.time_added, taskToPost.time_completed])
        .then((results) => {
            res.send(results);
        }).catch((error) => {
            console.log('Error in POST /tasks', error);
            res.sendStatus(500);
        });
});

taskRouter.get('/', (req, res) => {
    console.log('in GET /tasks');
    const queryText = 'SELECT * from "todo" ORDER BY "completed" ASC, "time_completed" ASC, "time_added" ASC;';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('Error in GET /artist', error);
            res.sendStatus(500);
        });
});

taskRouter.delete('/:id', (req, res) => {
    console.log('in DELETE /tasks');
    const queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in DELETE /tasks');
            res.sendStatus(500);
        });
});

taskRouter.put('/:id', (req, res) => {
    console.log('in PUT /tasks');
    const taskId = req.params.id;
    const taskCompleted = req.body.completed;
    const timeTaskCompleted = req.body.time_completed;
    console.log('Task id:', taskId);
    console.log('Task completed status:', taskCompleted);
    console.log('Time task completed:', timeTaskCompleted);
    const queryText =  `UPDATE "todo" SET "completed" = $1,
                        "time_completed" = $2
                        WHERE "id" = $3 ;`;
    pool.query(queryText, [taskCompleted, timeTaskCompleted, taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        });
});

module.exports = taskRouter;