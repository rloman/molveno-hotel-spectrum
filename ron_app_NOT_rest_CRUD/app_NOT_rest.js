const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ron',
  password: 'ron2018!',
  database: 'molveno'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

function insert(firstName, lastName, address, homeTown, postalCode, telephoneNumber, country, emailAddress) {
  const guest = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    homeTown: homeTown,
    postalCode: postalCode,
    telephoneNumber: telephoneNumber,
    country: country,
    emailAddress: emailAddress
  };
  connection.query('INSERT INTO guests SET ?', guest, (err, result) => {
    if (err) throw err;

    console.log('Last insert ID:', result.insertId);
  });
}

function list() {
  connection.query('SELECT * FROM guests', (err, guests) => {
    if (err){
      throw err;
    }
    else {
      for(let guest of guests) {
        console.log(guest.firstName);
      }
    }
  });
}




function findById(id) {
  connection.query('SELECT * FROM guests where id=?', [id], (err, row) => {
    if (err) {
                throw err;
        }
        else {
                 console.log(row);
        }
  });
}


function updateEmailAddress(id, emailAddress) {
  connection.query(
    'UPDATE guests SET emailAddress = ? Where ID = ?',
    [emailAddress, id],
    (err, result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );
}

function updateAddress(id, address) {
  connection.query(
    'UPDATE guests SET address = ? Where ID = ?',
    [address, id],
    (err, result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );
}


function remove(id) {
  connection.query(
    'DELETE FROM guests WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      console.log(`Deleted ${result.affectedRows} row(s)`);
    }
  );
}


//insert('winnie', 'wpoe', 'Posthoornstraat 5243', 'Rotterdam', '3011 WD', '010-8459854', 'The Netherlands', 'w@example.com');
//insert('Donald', 'Duck', 'Postkoetstraat 67', 'Amsterdam', '1141 AZ', '020-3354558', 'The Netherlands', 'donald.duck@duckstad.nl');
//list();
//updateEmailAddress(5, 'poedel@example.com');
updateAddress(3, 'Postkoetsstraat 67');
//list();
//findById(2);
//update(2, 'winnie.the.poeh@disney.com');
//remove(1);
