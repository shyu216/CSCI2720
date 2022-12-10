// run `node index.js` in the terminal

const express = require('express');
const app = express();

/*
// handle GET request
app.get('/event/:eventId/loc/:locId', (req, res) => {
  //res.send(req.params);
  var buf =
    'Event ID: ' +
    req.params['eventId'] +
    '<br>' +
    'Loc ID: ' +
    req.params['locId'];
  res.send(buf);
});
*/

// This module is for parsing the content in a request body (installed with npm)
const bodyParser = require('body-parser');
// Use parser to obtain the content in the body of a request
app.use(bodyParser.urlencoded({ extended: false }));

// serving static files
app.get('/event/:eventId/loc/:locId', (req, res) => {
  // Send the file 'index.html' in the folder of the current script
  res.sendFile(__dirname + '/index.html');
  // __dirname holds absolute path of the folder of the current script
});

// handle POST request
app.post('/event/:eventId/loc/:locId', (req, res) => {
  // Parameters are made available as properties of req.body
  var buf =
    'Event ID: ' +
    req.params['eventId'] +
    '<br>' +
    'Loc ID: ' +
    req.params['locId'] +
    '<br>' +
    'Login ID: ' +
    req.body['loginId'];
  res.send(buf);
});

// handle ALL requests
app.all('/*', (req, res) => {
  // send this to client
  res.send('Hello World!');
});

// listen to port 3000
const server = app.listen(3000);
