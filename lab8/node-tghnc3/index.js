// run `node index.js` in the terminal

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'./')));
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu187:p035157W@cluster0.gbo7pn3.mongodb.net/stu187');
const db = mongoose.connection;
// Upon connection failure
db.on('error', console.error.bind(console,
  'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");
  /* ... Lab 7 work on app.get() and app.post() */
  const EventSchema = mongoose.Schema({
    eventId: {
      type: Number, required: true,
      unique: true
    },
    name: { type: String, required: true },
    loc: { type: String },
    quota: { type: Number }
  });
  const Event = mongoose.model('Event', EventSchema);
  app.get('/event/:eventId', (req, res) => {
    Event.findOne(
      { eventId: req.params['eventId'] },
      'eventId name loc quota',
      (err, e) => {
        if (err)
          res.send(err);
        else
          res.send("This is event " + e.eventId + ":<br>\n" +
            "Event name: " + e.name + "<br>\n" +
            "Event location: " + e.loc + "<br>\n" +
            "Event quota: " + e.quota + "<br>\n" +
            "Ref: " + e);
      });
    
  });
  app.get('/testevent', (req, res) => {
    Event.create({
      eventId: 123,
      name: 'A nice event',
      loc: 'Not in CUHK',
      quota: 2
    }, (err, e) => {
      if (err) res.send(err);
      else res.send(e);
    });
  });

  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/event', (req, res) => {
    Event.create({
      eventId: req.body['eventId'],
      name: req.body['name'],
      loc: req.body['loc'],
      quota: req.body['quota']
    }, (err, e) => {
      if (err)
        res.send(err);
      else
        res.send("Ref: " + e);
    });
  });

  app.get('/', (req, res) => {
    res.sendFile('./index.html');
  });
});

const server = app.listen(3000);