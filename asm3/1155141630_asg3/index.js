/**
 * CSCI2720/ESTR2106 Assignment 3
 * Using Database via Node.js
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: YU Sihong
 * Student ID  : 1155141630
 * Date        : Dec, 2
 */

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, './')));

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://stu187:p035157W@cluster0.gbo7pn3.mongodb.net/stu187');
const db = mongoose.connection;

const cors = require('cors');
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { ApolloServer, gql } = require('apollo-server-express');



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

  const typeDefs = gql`
  type Lo{
    locId: Int,
    name: String
  }
  type Event{
    eventId: Int,
    name: String,
    loc: Lo,
    quota: Int
  }
  type Loc{
    locId: Int,
    name: String,
    quota: Int
  }
  type Query{
    hello:String,
    events:[Event],
    event(id:Int!):Event,
    locations:[Loc],
    location(id:Int!):Loc
  }`;
  const resolvers = {
    Query: {
      hello: () => 'hi',
      events: async () => {
        let result = "empty";
        const t = await Event.find({}, '-_id eventId name loc quota')
          .populate('loc', '-_id locId name')
        // console.log(t)
        return t;
      },
      event: async (parent, { id }) => {
        let result = "empty";
        // console.log(id)
        const t = await Event.findOne({ eventId: id }, '-_id eventId name loc quota')
          .populate('loc', '-_id locId name')
        // console.log(t)
        return t;
      },
      locations: async () => {
        const t = await Location.find({}, '-_id locId name quota')
        return t;
      },
      location: async (p, { id }) => {
        const t = await Location.findOne({ locId: id }, '-_id locId name quota')
        return t;
      }
    },
  }


  const s = new ApolloServer({ typeDefs, resolvers });
  s.start().then(res => { s.applyMiddleware({ app }); });

  app.use((req, res, next) => {
    res.set('Content-Type', 'text/plain');
    next();
  })

  app.get('/*', (req, res, next) => {

    console.log(req.cookies);
    req.cookies.query_no = req.cookies.query_no ? parseInt(req.cookies.query_no) + 1 : 1;
    res.cookie("query_no", req.cookies.query_no, { maxAge: 300000 });
    next();
  })

  // my requests
  app.get('/create', async (req, res) => {
    await Location.create({
      locId: 1,
      name: "SHB924",
      quota: 10
    }, err => console.log(err));
    await Location.create({
      locId: 2,
      name: "ERB LT",
      quota: 5
    }, err => console.log(err));
    // await Location.findOne({ locId: 1 })
    //   .exec((err, loc) => {
    //     if (err) res.send(err);
    //     else {
    //       Event.create({
    //         eventId: 1,
    //         name: 'A nice event',
    //         loc: loc._id,
    //         quota: 2
    //       }, err => console.log(err));
    //     }
    //   });
    res.send('initialize database...done!');
  });
  app.get('/clear', async (req, res) => {
    await Event.deleteMany({});
    await Location.deleteMany({});
    res.send('clear the database...done!');
  })
  app.get('/forms.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'forms.html'))
  })

  // q1
  app.get('/ev/:eventId', (req, res) => {

    Event.findOne({ eventId: req.params['eventId'] }, '-_id eventId name loc quota')
      .populate('loc', '-_id locId name')
      .exec((err, event) => {
        if (err)
          res.send(err);
        else {
          if (event == null) {
            res.status(404);
            res.send('can not find result');
          } else {
            res.send(JSON.stringify(event) + "," + JSON.stringify(req.cookies));
          }
        }
      });
  });

  // q4 q7
  app.get('/ev', (req, res) => {
    req.query.q = req.query.q ? req.query.q : 0;

    Event.find({}, '-_id eventId name loc quota')
      .where({ quota: { $gte: req.query.q } })
      .populate('loc', '-_id locId name')
      .exec((err, events) => {
        if (err)
          res.send(err);
        else {
          res.send(JSON.stringify(events) + "," + JSON.stringify(req.cookies));
        }
      });
  });

  // q5
  app.get('/lo/:locId', (req, res) => {

    Location.findOne({ locId: req.params['locId'] }, '-_id locId name quota')
      .exec((err, location) => {
        if (err)
          res.send(err);
        else {
          if (location == null) {
            res.status(404);
            res.send('can not find result');
          } else {
            res.send(JSON.stringify(location) + "," + JSON.stringify(req.cookies));
          }
        }
      });
  })

  // q6
  app.get('/lo', (req, res) => {

    Location.find({}, '-_id locId name quota', (err, locations) => {
      if (err)
        res.send(err);
      else
        res.send(JSON.stringify(locations) + "," + JSON.stringify(req.cookies));
    });
  });

  //q2

  app.post('/ev', (req, res) => {

    // console.log(req.body)
    Location.findOne()
      .where({ locId: req.body['locId'], quota: { $gte: req.body['quota'] } })
      .exec((err, location) => {
        // console.log(location);
        if (location == null) {
          res.status(406);
          res.send('invalid location!(wrong locId or insufficient quota)');
        }
        else {
          Event.find()
            .sort({ eventId: -1 })
            .limit(1)
            .exec((err, events) => {
              if (err)
                console.log(err);
              // console.log(events);
              // console.log('max id: ' + events[0].eventId);
              let newId = events[0] ? events[0].eventId + 1 : 1;

              Event.create({
                eventId: newId,
                name: req.body['name'],
                loc: location._id,
                quota: req.body['quota']
              }, err => console.log(err));

              res.status(201);
              res.send('url: localhost:3000/ev/' + newId);
            });
        }
      });
  });

  //q3
  app.delete('/ev/:eventId', (req, res) => {
    Event.deleteOne({ eventId: req.params.eventId }, (err, eve) => {
      if (err) res.send(err);
      console.log("DELETE")
      console.log(eve)
      if (eve.deletedCount>0) {
        res.status(204);
        res.send("");
      } else {
        res.status(404);
        res.send("can not find!");
      }
    })
  });

  //q8
  app.get('/ev4q8/:eventId', (req, res) => {

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
            res.send(JSON.stringify(event));
          }
        }
      });
  });

  app.put('/ev/:eventId', (req, res) => {
    console.log('PUT')

    // console.log(req)

    console.log(req.body)
    Location.findOne({ locId: req.body.loc }, (err, loc) => {
      if (err)
        res.send(err);
      else {
        console.log(loc);
        if (loc)
          Event.updateOne({ eventId: req.params.eventId }, {
            name: req.body.name,
            loc: loc._id,
            quota: req.body.quota
          }, (err, eve) => {
            if (err)
              res.send(err);
            console.log(eve);

            res.send('url: localhost:3000/ev/' + req.params.eventId)
          })
        else {
          res.status(404);
          res.send('can not update!(wrong locId or wrong eventId)')
        }
      }
    })


  })



  // explaination
  app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'index.html'))
  });

  // other
  // app.all('/*', (req, res) => {

  //   res.send('can not handle');
  // });
});

const server = app.listen(3000);
