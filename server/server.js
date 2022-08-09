// require express, gives a function
const express = require('express');
const moment = require('moment');

// create an instance of express by calling the function, gives an object
const app = express();
const port = process.env.PORT || 5001;

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

//require taskRouter, app to use for '/tasks'
const taskRouter = require('./routes/tasks.router.js');
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log('listening on port', port);
});