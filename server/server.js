const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const taskRouter = require('./routes/tasks.router.js');

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

//route
app.use('/tasks', taskRouter);

//listening for requests on port
app.listen(port, () => {
  console.log('listening on port', port);
});