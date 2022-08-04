// require express, gives a function
const express = require('express');

// create an instance of express by calling the function, gives an object
const app = express();
const port = process.env.PORT || 5001;

app.use(express.static('server/public'));

app.listen(port, () => {
  console.log('listening on port', port);
});