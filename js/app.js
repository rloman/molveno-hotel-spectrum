"use strict";

const mysql = require('mysql');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'molveno'
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');
  }
});

app.post('/api/guests', function(req, res) {
  let guest = req.body;
  connection.query('INSERT INTO guests SET ?', guest, (err, result) => {
    if (!err) {
      res.setHeader('Content-Type', 'application/json')
      connection.query('SELECT * FROM guests where id=?', result.insertId, (err, rows) => {
        if (!err) {
          let guest = rows[0];
          if (guest) {
            res.setHeader('Content-Type', 'application/json')
            res.status(201).end(JSON.stringify(guest));
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

app.get('/api/guests/:id', function(req, res) {
  let id = +req.params.id
  connection.query('SELECT * FROM guests where id=?', id, (err, rows) => {
    if (!err) {
      console.log('Data received from DB:\n');
      let guest = rows[0];
      if (guest) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(guest));
      } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(404).end();
      }
    } else {
      throw err;
    }
  });
});
// The ID in the URI is mandatory!
app.put('/api/guests/:id', function(req, res) {
        let id = +req.params.id
        let inputGuest = req.body;

        console.log("Received first name: "+inputGuest.firstName);
        console.log("Received last name: "+inputGuest.lastName);
        console.log("Received email: "+inputGuest.emailAddress);

        connection.query(
          // Parameters here, if params are not mentioned then they will not be changed!
          'UPDATE guests SET firstName=?, lastName=?, address=?, homeTown=?, postalCode=?, country=?, telephoneNumber=?, emailAddress= ? Where ID = ?',
          [inputGuest.firstName, inputGuest.lastName, inputGuest.address,
            inputGuest.homeTown, inputGuest.postalCode, inputGuest.country,
            inputGuest.telephoneNumber, inputGuest.emailAddress, id],
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
            }
            else {
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
      }
      else {
        throw err;
      }
    }
  );
});
var server = app.listen(8081, function() {
  console.log("Example app listening at http://%s:%s", server.address().address, server.address().port)
});
