// guests is de tablename in de database
// /api/guest = http://localhost:8081/api/guest
"use strict";

// import the mysql NPM module to be able to use mysql
const mysql = require('mysql');

// import express module (webserver)
var express = require('express');

// use the express module in the app object
var app = express();

// import body-parser module here
var bodyParser = require('body-parser');

// say to the app (express instance) that he might sometimes render
// the body of a POST/PUT from JSON to an Object
app.use(bodyParser.json());


// for now this is to say that everyone can reach this webserver
// from everywhere
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// create a MySQL connection, change user, pw and database name to your own credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hotelmolveno',
  password: 'hotelmolvenorocks2018!',
  database: 'molveno'
});

// this method is invoked AFTER the connection is made
// so just to mention "Connected!" (the connection is made above)
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');
  }
});

// this is to enable posting to 'api/guests' using the callback function
// /api/guest guests kan ieder benaming hebben als het maar overal hetzelfde is.

///////////// guest///////////////////////////////////////////////////////////////////////////////////////
app.post('/api/guests', function(req, res) {

  // this is to read the big string from the body to a user
  // that process is called 'parsing'
  //(using the body-parser module above)
  let user = req.body;

  // in this function (the POST callback) execute this query
  // the user is the parsed user
  // the err is a (potential) error
  // the result is the result of the MYSQL insertion (THAT IS NOT A JSON OBJECT BUT A TECHNICAL MYSQL OBJECT)
  connection.query('INSERT INTO guests SET ?', user, (err, result) => {
    if (!err) {

      // set the Content-Type in header to application/json
      res.setHeader('Content-Type', 'application/json')

      // validate the insert and return that as JSON
      connection.query('SELECT * FROM guests where id=?', result.insertId, (err, rows) => {
        if (!err) {
          // since we are getting rows here (hopefully one) we have
          // to read out the first row since that should be the result
          let user = rows[0];

          // OK we found a user
          if (user) {
            res.setHeader('Content-Type', 'application/json')
            // response end with a string of the found user
            res.status(201).end(JSON.stringify(user)); // rloman dit nog ophalen en test via select ...
          } else {
            // error, we did NOT find a user
            res.setHeader('Content-Type', 'application/json')

            // so render the common 404 (Not found)
            res.status(404).end();
          }
        } else {
          throw err;
        }
      });
    } else {
      throw err;
    }
  });
});

// this is to enable getting from 'api/guests' using the callback function
app.get('/api/guests', function(req, res) {

  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM guests', (err, guests) => {
    if (!err) {
      res.end(JSON.stringify(guests));
    } else {
      throw err;
    }
  });
});


// this is to enable http://localhost:8081/api/guest/3 or something
// look that the 'id' is read out below
app.get('/api/guests/:id', function(req, res) {

  let id = +req.params.id

  connection.query('SELECT * FROM guests where id=?', id, (err, rows) => {
    if (!err) {
      console.log('Data received from Db:\n');

      // since we are getting rows here (hopefully one) we have
      // to read out the first row since that should be the result
      let user = rows[0];

      // OK we found a user
      if (user) {
        res.setHeader('Content-Type', 'application/json')
        // response end with a string of the found user
        res.end(JSON.stringify(user));
      } else {
        // error, we did NOT find a user
        res.setHeader('Content-Type', 'application/json')

        // so render the common 404 (Not found)
        res.status(404).end();
      }
    } else {
      throw err;
    }
  });
});

app.put('/api/guests/:id', function(req, res) {
  let id = +req.params.id
  let inputGuest = req.body;

  console.log("Received first name: " + inputGuest.firstName);
  console.log("Received last name: " + inputGuest.lastName);
  console.log("Received email: " + inputGuest.emailAddress);

  connection.query(
    // Parameters here, if params are not mentioned then they will not be changed!
    'UPDATE guests SET firstName=?, lastName=?, address=?, homeTown=?, postalCode=?, country=?, telephoneNumber=?, emailAddress= ? Where ID = ?',
    [inputGuest.firstName, inputGuest.lastName, inputGuest.address,
      inputGuest.homeTown, inputGuest.postalCode, inputGuest.country,
      inputGuest.telephoneNumber, inputGuest.emailAddress, id
    ],
    (err, result) => {
      if (!err) {
        console.log(`Changed ${result.changedRows} row(s)`);
        connection.query('SELECT * FROM guests where id=?', [id], (err, rows) => {
          if (!err) {
            console.log('Data received from DB:\n');

            let guest = rows[0];

            console.log(guest);
            if (guest) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(guest));
            } else {
              res.setHeader('Content-Type', 'application/json')
              console.log("Not found!");
              res.status(404).end();
            }
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
});

app.delete('/api/guests/:id', function(req, res) {
  let id = +req.params.id;

  connection.query(
    'DELETE FROM guests WHERE id = ?', [id], (err, result) => {
      if (!err) {
        console.log(`Deleted ${result.affectedRows} row(s)`);
        res.status(204).end();
      } else {
        throw err;
      }
    }
  );
});
///////////////////  rooms  ///////////////////////////////////
app.post('/api/rooms', function(req, res) {

  let user = req.body;

  connection.query('INSERT INTO rooms SET ?', user, (err, result) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json')
      connection.query('SELECT * FROM rooms where id=?', result.insertId, (err, rows) => {
        if (!err) {
          let user = rows[0];
          if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.status(201).end(JSON.stringify(user));
          } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(404).end();
          }
        } else {
          throw err;
        }
      });
    } else {
      throw err;
    }
  });
});

app.get('/api/rooms', function(req, res) {

  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM rooms', (err, guests) => {
    if (!err) {
      res.end(JSON.stringify(guests));
    } else {
      throw err;
    }
  });
});

app.get('/api/rooms/:id', function(req, res) {

  let id = +req.params.id

  connection.query('SELECT * FROM rooms where id=?', id, (err, rows) => {
    if (!err) {
      console.log('Data received from Db:\n');

      let user = rows[0];

      if (user) {
        res.setHeader('Content-Type', 'application/json')

        res.end(JSON.stringify(user));
      } else {

        res.setHeader('Content-Type', 'application/json')

        res.status(404).end();
      }
    } else {
      throw err;
    }
  });
});

app.put('/api/rooms/:id', function(req, res) {

  let id = +req.params.id
  let inputRoom = req.body;

  connection.query(
    'UPDATE rooms SET roomNumber=?, roomType=?, numberOfBeds = ? Where ID = ?',
    [inputRoom.roomNumber, inputRoom.roomType, inputRoom.numberOfBeds, id],
    (err, result) => {
      if (!err) {
        console.log(`Changed ${result.changedRows} row(s)`);

        connection.query('SELECT * FROM rooms where id=?', [id], (err, rows) => {
          if (!err) {
            console.log('Data received from Db:\n');

            let user = rows[0];

            console.log(user);
            if (user) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(user));
            } else {
              res.setHeader('Content-Type', 'application/json')
              console.log("Not found!!!");
              res.status(404).end();
            }
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
});

app.delete('/api/rooms/:id', function(req, res) {
  let id = +req.params.id;

  connection.query(
    'DELETE FROM rooms WHERE id = ?', [id], (err, result) => {
      if (!err) {
        console.log(`Deleted ${result.affectedRows} row(s)`);
        res.status(204).end();
      } else {
        throw err;
      }
    }
  );
});
///////////////////////  reservations  //////////////////////////////
app.post('/api/reservations', function(req, res) {

  let user = req.body;

  connection.query('INSERT INTO reservations SET ?', user, (err, result) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json')

      connection.query('SELECT * FROM reservations where id=?', result.insertId, (err, rows) => {
        if (!err) {

          let user = rows[0];

          if (user) {
            res.setHeader('Content-Type', 'application/json')
            res.status(201).end(JSON.stringify(user));
          } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(404).end();
          }
        } else {
          throw err;
        }
      });
    } else {
      throw err;
    }
  });
});

app.get('/api/reservations', function(req, res) {

  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM reservations', (err, guests) => {
    if (!err) {
      res.end(JSON.stringify(guests));
    } else {
      throw err;
    }
  });
});

app.get('/api/reservations/:id', function(req, res) {

  let id = +req.params.id

  connection.query('SELECT * FROM reservations where id=?', id, (err, rows) => {
    if (!err) {
      console.log('Data received from Db:\n');

      let user = rows[0];

      if (user) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(user));
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(404).end();
      }
    } else {
      throw err;
    }
  });
});

app.put('/api/reservations/:id', function(req, res) {

  let id = +req.params.id
  let inputReservations = req.body;

  connection.query(
    'UPDATE reservations SET guest_id=?, room_id=?, arrivalDate=?, departureDate=?, numberOfGuests=?, guestHasCheckedIn=?, guestHasPaid=? Where ID = ?',
    [inputReservations.guest_id, inputReservations.room_id, inputReservations.arrivalDate, inputReservations.departureDate, inputReservations.numberOfGuests, inputReservations.guestHasCheckedIn, inputReservations.guestHasPaid, id],
    (err, result) => {
      if (!err) {
        console.log(`Changed ${result.changedRows} row(s)`);

        connection.query('SELECT * FROM reservations where id=?', [id], (err, rows) => {
          if (!err) {
            console.log('Data received from Db:\n');

            let user = rows[0];

            console.log(user);
            if (user) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(user));
            } else {
              res.setHeader('Content-Type', 'application/json')
              console.log("Not found!!!");
              res.status(404).end();
            }
          } else {
            throw err;
          }
        });
      } else {
        throw err;
      }
    });
});

app.delete('/api/reservations/:id', function(req, res) {
  let id = +req.params.id;

  connection.query(
    'DELETE FROM reservations WHERE id = ?', [id], (err, result) => {
      if (!err) {
        console.log(`Deleted ${result.affectedRows} row(s)`);
        res.status(204).end();
      } else {
        throw err;
      }
    }
  );
});



// and finally ... run it :-)
// get the server from the app which runs on port 8081
var server = app.listen(8081, function() {

  console.log("Example app listening at http://%s:%s", server.address().address, server.address().port)
});
