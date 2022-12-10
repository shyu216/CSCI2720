const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, './')));

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu187:p035157W@cluster0.gbo7pn3.mongodb.net/stu187');
const db = mongoose.connection;


// Upon connection failure
db.on('error', console.error.bind(console,
  'Connection error:'));
// Upon opening the database successfully
db.once('open', function () {
  console.log("Connection is open...");

  const EventSchema = mongoose.Schema({
    eventId: {
      type: Number, required: true,
      unique: true
    },
    name: { type: String, required: true },
    loc: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
    quota: { type: Number }
  });
  const Event = mongoose.model('Event', EventSchema);

  const LocSchema = mongoose.Schema({
    locId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    quota: { type: Number }
  });
  const Location = mongoose.model('Location', LocSchema);

  let idx = 1;

  app.use((req, res, next) => {
    console.log(req.cookies)
    next()
  })

  // my requests
  app.get('/add', (req, res) => {

    res.set('Content-Type', 'text/plain');
    const loc = new Location({
      locId: idx,
      name: "SHB924",
      quota: 10
    });
    loc.save((err) => {
      if (err) console.log(err);
      const event = new Event({
        eventId: idx,
        name: 'A nice event',
        loc: loc._id,
        quota: 2
      });
      event.save((err) => {
        if (err) console.log(err);
      });
    });
    idx++;
    res.send('initialize database...done!');
  });

  app.get('/clear', async (req, res) => {

    res.set('Content-Type', 'text/plain');
    await Event.deleteMany({});
    await Location.deleteMany({});
    res.send('clear the database...done!');
  })

  // q1
  app.get('/ev/:eventId', (req, res) => {

    res.set('Content-Type', 'text/plain');
    Event.findOne({ eventId: req.params['eventId'] }, '-_id eventId name loc quota')
      .populate('loc', '-_id locId name quota')
      .exec((err, event) => {
        if (err)
          res.send(err);
        else {
          if (event == null) {
            res.status(404);
            res.send('can not find result');
          } else {
            res.send(event);
          }
        }
      });
  });

  // q4
  app.get('/ev', (req, res) => {

    res.set('Content-Type', 'text/plain');
    Event.find({}, '-_id eventId name loc quota')
      .populate('loc', '-_id locId name quota')
      .exec((err, events) => {
        if (err)
          res.send(err);
        else {
          res.cookie('query_no', req.cookie.query_no, { maxAge: 300000 });
          res.send(events+'query_no'+ req.cookie.query_no);
        }
      });
  });

  // q5
  app.get('/lo/:locId', (req, res) => {

    res.set('Content-Type', 'text/plain');
    Location.findOne({ locId: req.params['locId'] }, '-_id locId name quota')
      .exec((err, location) => {
        if (err)
          res.send(err);
        else {
          if (location == null) {
            res.status(404);
            res.send('can not find result');
          } else {
            res.send(location);
          }
        }
      });
  })

  // q6
  app.get('/lo', (req, res) => {

    res.set('Content-Type', 'text/plain');
    Location.find({}, '-_id locId name quota', (err, locations) => {
      if (err)
        res.send(err);
      else
        res.send(locations);
    });
  });

  //q2
  const bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({ extended: false }));

  app.post('/ev', (req, res) => {

    res.set('Content-Type', 'text/plain');
    // console.log(req.body)
    Location.findOne()
      .where({ locId: req.body['locId'], quota: { $gte: req.body['quota'] } })
      .exec((err, location) => {

        // eventquota = req.body['quota'];
        // locationquota = location.quota;
        // if (eventquota != null) {
        //   if (locationquota == null) {
        //     res.send('the location quota is invalid!');
        //   }
        //   else if (eventquota > locationquota) {
        //     res.send('the location quota is smaller than the new event quota!')
        //   }
        // }

        // console.log(location);
        if (location == null) {
          res.status(406);
          res.send('invalid location!');
        }
        else {
          let newId = 1;
          Event.find().sort({ eventId: -1 }).limit(1)
            .exec((err, events) => {
              if (err)
                console.log(err);
              // console.log(events);
              // console.log('max id: ' + events[0].eventId);
              if (events != null)
                newId = events[0].eventId + 1;

              Event.create({
                eventId: newId,
                name: req.body['name'],
                loc: location._id,
                quota: req.body['quota']
              });

              res.status(201);
              res.send('url: localhost:3000/ev/' + newId);
            });
        }
      });
  });

  //q3
  app.delete('/ev/:eventId', (req, res) => {

    res.set('Content-Type', 'text/plain');

  })

  //q8
  app.put('', (req, res) => {

    res.set('Content-Type', 'text/plain');
  })


  // explaination
  app.get('/', (req, res) => {

    res.set('Content-Type', 'text/plain');
    res.send('');
  });

  // other
  app.get('/*', (req, res) => {

    res.set('Content-Type', 'text/plain');
    res.send('can not handle');
  });
});

const server = app.listen(3000);
