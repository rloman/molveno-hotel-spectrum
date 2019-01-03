"use strict";

const mysql = require('mysql');
let express = require('express');
let http = require('http');
let app = express();
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
  user: 'ans',
  password: 'command',
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

//Getting lists from tables
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

app.get('/api/reservations', function(req, res) {
  connection.query('SELECT * FROM reservations', (err, reservations) => {
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
  let arrival = req.params.arrival;
  let columns = "guests.firstName, guests.lastName, guests.address, guests.postalCode, guests.homeTown,\
                 guests.country, guests.email, guests.phone, guests.mobile, reservations.id, reservations.guest_id,\
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

// get accessories of a reservation
app.get('/api/accessoriesofreservation/:id', function(req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT reservations.id,\
     accessories.name, accessories.price, accessories.amount\
     FROM reservations JOIN reservationaccessories ON reservations.id = reservationaccessories.reservations_id JOIN accessories ON\
     reservationaccessories.accessories_id = accessories.id WHERE reservations.id = ${id}`,
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

//Getting 1 item from the tables
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

//Updating 1 item in a table
app.put('/api/guests/:id', function(req, res) {
  let id = req.params.id
  let inputGuest = req.body;
  let now = new Date;
  console.log(now + ": Changing guest with id: " + id);
  console.log(now + ': Waiting... (Use CTRL-C to quit)');
  connection.query(
    'UPDATE guests SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ?, postalCode = ?, homeTown = ?, country = ?, mobile = ? WHERE id = ?',
    [inputGuest.firstName, inputGuest.lastName, inputGuest.email, inputGuest.phone, inputGuest.address, inputGuest.postalCode,
     inputGuest.homeTown, inputGuest.country, inputGuest.mobile, id],
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
              res.status(205).end(JSON.stringify(guest));
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

var server = app.listen(8081, function() {
  let now = new Date;
  console.log(now + ": Rest app listening at http://%s:%s", server.address().address, server.address().port);
});
