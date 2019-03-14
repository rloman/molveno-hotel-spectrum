"use strict";

const mysql = require('mysql');
let express = require('express');
let http = require('http');
let app = express();
let jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nick',
  password: 'nick2018!',
  database: 'molveno'
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    let now = new Date;
    console.log(now + ': Connected! Waiting... (Use CTRL-C to quit)');
  }
});

app.get('/api/guests', function(req, res) {
  connection.query('SELECT * FROM guests', (err, guests) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(guests));
      let now = new Date;
      console.log(now + `: Guests List Returned (${req.connection.remoteAddress})!`);
      console.log(now + ': Waiting... (Use CTRL-C to quit)');
    } else {
      throw err;
    }
  });
});

app.get('/api/guests/:id', function(req, res) {
  let id = req.params.id;
  connection.query('SELECT * FROM guests WHERE id = ?', id, (err, rows) => {
    if (!err) {
      let now = new Date;
      let guest = rows[0];
      if (guest) {
        console.log(`${now}: Guest ${id} returned (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(guest));
      } else {
        console.log(`${now}: Guest ${id} doesn't exist (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
        res.setHeader('Content-Type', 'application/json');
        res.status(404).end();
      }
    } else {
      throw err;
    }
  });
});

//Posting a new entry into tables
app.post('/api/guests', function(req, res) {
  let guest = req.body;
  connection.query('INSERT INTO guests SET ?', guest, (err, result) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      connection.query('SELECT * FROM guests WHERE id = ?', result.insertId, (err, rows) => {
        if (!err) {
          let guest = rows[0];
          if (guest) {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).end(JSON.stringify(guest));
            let now = new Date;
            console.log(`${now}: Guest ${JSON.stringify(guest)} added (${req.connection.remoteAddress})!`);
          } else {
            res.setHeader('Content-Type', 'application/json');
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

//Updating 1 item in a table
app.put('/api/guests/:id', function(req, res) {
  let id = req.params.id
  let inputGuest = req.body;
  let now = new Date;
  console.log(now + ": Changing guest with id: " + id);
  console.log(now + ': Waiting... (Use CTRL-C to quit)');
  connection.query(
    'UPDATE guests SET firstName = ?, lastName = ?, address = ?, homeTown = ?, postalCode = ?, country = ?, telephoneNumber = ?, emailAddress = ? WHERE id = ?',
    [inputGuest.firstName, inputGuest.lastName, inputGuest.address, inputGuest.homeTown, inputGuest.postalCode, inputGuest.country,
     inputGuest.telephoneNumber, inputGuest.emailAddress, id],
    (err, result) => {
      if (!err) {
        console.log(now + `: Changed ${result.changedRows} row(s)`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
        connection.query('SELECT * FROM guests WHERE id = ?', [id], (err, rows) => {
          if (!err) {
            console.log(now + ': Data received from Database:');
            let guest = rows[0];
            console.log(guest);
            console.log(now + ': Waiting... (Use CTRL-C to quit)');
            if (guest) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(guest));
            } else {
              res.setHeader('Content-Type', 'application/json');
              console.log(now + `: Not found!!! (Request from ${req.connection.remoteAddress})`);
              console.log(now + ': Waiting... (Use CTRL-C to quit)');
              res.status(404).end();
            }
          } else {
            throw err;
          }
        });
      }
      else {
        throw err;
      }
    }
  );
});

//Deleting 1 item from a table
app.delete('/api/guests/:id', function(req, res) {
  let id = req.params.id;
  connection.query(
    'DELETE FROM guests WHERE id = ?', [id], (err, result) => {
      if (!err) {
        let now = new Date;
        console.log(now + `: Deleted ${result.affectedRows} row(s)`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
        res.status(204).end();
      }
      else {
        throw err;
      }
    }
  );
});

app.get('/api/rooms', function(req, res) {
  connection.query('SELECT * FROM rooms', (err, rooms) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(rooms));
      let now = new Date;
      console.log(now + `: Rooms List Returned (${req.connection.remoteAddress})!`);
      console.log(now + ': Waiting... (Use CTRL-C to quit)');
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

app.put('/api/rooms/:id', function(req, res) {
  let id = +req.params.id
  let inputRoom = req.body;
  connection.query(
    'UPDATE rooms SET roomNumber=?, roomType=?, numberOfBeds = ?, roomPrice = ? Where ID = ?',
    [inputRoom.roomNumber, inputRoom.roomType, inputRoom.numberOfBeds, inputRoom.roomPrice, id],
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

app.post('/api/reservations', function(req, res) {
  let reservation = req.body;
  connection.query('INSERT INTO reservations SET ?', reservation, (err, result) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      connection.query('SELECT * FROM reservations WHERE id = ?', result.insertId, (err, rows) => {
        if (!err) {
          let reservation = rows[0];
          if (reservation) {
            res.setHeader('Content-Type', 'application/json');
            res.status(201).end(JSON.stringify(reservation));
            let now = new Date;
            console.log(`${now}: Reservation ${JSON.stringify(reservation)} added (${req.connection.remoteAddress})!`);
          } else {
            res.setHeader('Content-Type', 'application/json');
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
  connection.query('select guests.firstName, guests.lastName, rooms.roomNumber, \
  rooms.roomType, reservations.* from guests inner join reservations on \
  guests.id = reservations.guest_id inner join rooms on \
  reservations.room_id = rooms.id;', (err, reservations) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(reservations));
      let now = new Date;
      console.log(now + `: Reservations List Returned (${req.connection.remoteAddress})!`);
      console.log(now + ': Waiting... (Use CTRL-C to quit)');
    } else {
      throw err;
    }
  });
});

app.get('/api/reservations/:id', function(req, res) {

  let id = +req.params.id

  connection.query('select guests.firstName, guests.lastName, rooms.roomNumber, \
  rooms.roomType, reservations.* from guests inner join reservations on \
  guests.id = reservations.guest_id inner join rooms on \
  reservations.room_id = rooms.id where reservations.id=?', id, (err, rows) => {
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
    'UPDATE reservations SET guest_id=?, room_id=?, numberOfGuests=?, arrivalDate=?, departureDate=?, guestHasCheckedIn=?, guestHasPaid=?, guestHasCheckedOut=? Where ID = ?',
    [inputReservations.guest_id, inputReservations.room_id, inputReservations.numberOfGuests, inputReservations.arrivalDate, inputReservations.departureDate, inputReservations.guestHasCheckedIn, inputReservations.guestHasPaid, inputReservations.guestHasCheckedOut, id],
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

app.get('/api/accessories', function(req, res) {
  connection.query('SELECT * FROM accessories', (err, accessories) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(accessories));
      let now = new Date;
      console.log(now + `: Accessories List Returned (${req.connection.remoteAddress})!`);
      console.log(now + ': Waiting... (Use CTRL-C to quit)');
    } else {
      throw err;
    }
  });
});

//Getting filtered lists from tables
app.get('/api/reservations/:arrival', function(req, res) {
  let arrival = req.params.arrival;
  connection.query('SELECT * FROM reservations WHERE arrivalDate = ?', arrival, (err, reservations) => {
    if (!err) {
      let now = new Date;
      if (reservations[0]) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reservations));
        console.log(now + `: Reservations of arrival date ${arrival} Returned (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reservations));
        console.log(now + `: Reservations of arrival date ${arrival} don't exist! (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
      }
    } else {
      throw err;
    }
  });
});

//Getting 1 item from tables with join
app.get('/api/reservationjoinguest/:arrival', function(req, res) {
  let id = req.params.arrival;
  let columns = "guests.firstName, guests.lastName, guests.address, guests.postalCode, guests.homeTown,\
                 guests.country, guests.emailAddress, guests.telephoneNumber, reservations.id, reservations.guest_id,\
                 reservations.room_id, reservations.arrivalDate, reservations.departureDate, reservations.numberofGuests,\
                 reservations.guestHasCheckedIn, reservations.guestHasPaid, reservations.paymentMethod, reservations.cardNumber,\
                 rooms.roomNumber, rooms.roomType, rooms.numberOfBeds, rooms.price";
  connection.query(
    `SELECT ${columns} FROM guests INNER JOIN reservations ON reservations.guest_id = guests.id INNER JOIN rooms ON\
     reservations.room_id = rooms.id WHERE reservations.arrivalDate = ?`,
    arrival, (err, reservations) => {
    if (!err) {
      let now = new Date;
      if (reservations[0]) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reservations));
        console.log(now + `: Reservations of arrival date ${arrival} returned with guest and room info (${req.connection.remoteAddress})!`);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reservations));
        console.log(now + `: Reservations of arrival date ${arrival} don't exist! (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
      }
    } else {
      throw err;
    }
  });
});

app.get('/api/reservationjoinguestonid/:id', function(req, res) {
  let id = +req.params.id;
  let columns = "guests.firstName, guests.lastName, guests.address, guests.postalCode, guests.homeTown,\
                 guests.country, guests.emailAddress, guests.telephoneNumber, reservations.id, reservations.guest_id,\
                 reservations.room_id, reservations.arrivalDate, reservations.departureDate, reservations.numberofGuests,\
                 reservations.guestHasCheckedIn, reservations.guestHasPaid, reservations.guestHasCheckedOut,\
                 rooms.roomNumber, rooms.roomType, rooms.numberOfBeds, rooms.roomPrice";
  connection.query(
    `SELECT ${columns} FROM guests INNER JOIN reservations ON reservations.guest_id = guests.id INNER JOIN rooms ON\
     reservations.room_id = rooms.id WHERE reservations.id = ?`,
    id, (err, rows) => {
    if (!err) {
      let now = new Date;
      let reservations = rows[0];
      if (reservations) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reservations));
        console.log(now + `: Reservation ${id} returned with guest and room info (${req.connection.remoteAddress})!`);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(reservations));
        console.log(now + `: Reservation ${id} doesn't exist! (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
      }
    } else {
      throw err;
    }
  });
});

// get accessories of a reservation
app.get('/api/accessoriesofreservation/:id', function(req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT reservations.id,\
     accessories.accessoryName, accessories.accessoryPrice, accessories.accessoryAvailability\
     FROM reservations JOIN res_acc ON reservations.id = res_acc.reservation_id JOIN accessories ON\
     res_acc.accessory_id = accessories.id WHERE reservations.id = ${id}`,
    (err, acces) => {
    if (!err) {
      let now = new Date;
      if (acces[0]) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(acces));
        console.log(now + `: Accessories of reservation ${id} returned! (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(acces));
        console.log(now + `: No Accessories for reservation ${id} found! (${req.connection.remoteAddress})!`);
        console.log(now + ': Waiting... (Use CTRL-C to quit)');
      }
    } else {
      throw err;
    }
  });
});

// Obtains a list of all guests in the database if the authorization token is correct, else it will return 403 Forbidden
// In Postman you'll have to add a key (authorization) with the value (bearer <token_value>)
app.get('/api/guestsJWT', verifyToken, (req, res) => {
  jwt.verify(req.token, 'its_a_secret_to_everyone', (err) => {
      if (err) {
          res.sendStatus(403);
      } else {
          connection.query('SELECT * FROM guests', (err, guests) => {
              if (!err) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(guests));
              } else {
                  throw err;
              }
          });
      }
  });
});

app.post('/api/login', (req, res) => {
  // Mock user
  let user = {
      id: 1,
      username: 'nick',
      password: 'nick2019!'
  }
  // Signs the JSON Web Token with the private key (its_a_secret_to_everyone) which expires in 10 minutes!
  jwt.sign({ user }, 'its_a_secret_to_everyone', { expiresIn: '10m' }, (err, token) => {
      if (err) {
          throw err;
      } else {
          res.json({ token });
      }
  });
});

// Format of token
// Authorization: Bearer <token_value>

// Verify token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
  } else {
      // Forbidden
      res.sendStatus(403);
  }
}

let server = app.listen(8081, () => {
  let now = new Date;
  console.log(now + ": Rest app listening at http://%s:%s", server.address().address, server.address().port);
});
