const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nick',
  password: 'nick2018!',
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

    console.log(`Last insert ID: ${result.insertId}`);
  });
}

function list() {
  connection.query('SELECT * FROM guests', (err, guests) => {
    if (err) {
      throw err;
    } else {
      for (let guest of guests) {
        console.log(`${guest.firstName} ${guest.lastName}`);
      }
    }
  });
}

function findById(id) {
  connection.query('SELECT * FROM guests where id=?', [id], (err, row) => {
    if (err) {
      throw err;
    } else {
      console.log(row);
    }
  });
}

function updateName(id, firstName, lastName) {
  connection.query(
    'UPDATE guests SET firstName = ?, lastName = ? WHERE ID = ?',
    [firstName, lastName, id],
    (err, result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );
}

function updateAddress(id, address, homeTown, postalCode, country) {
  connection.query(
    'UPDATE guests SET address = ?, homeTown = ?, postalCode = ?, country = ? Where ID = ?',
    [address, homeTown, postalCode, country, id],
    (err, result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );
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

function remove(id) {
  connection.query(
    'DELETE FROM guests WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      console.log(`Deleted ${result.affectedRows} row(s)`);
    }
  );
}


//insert('Ivon', 'de Klos', 'Emmaweg 2', 'Renesse', '4325 AJ', '0111-232120', 'The Netherlands', 'i.de.klos@zeelandnet.nl');
//insert('Eric', 'Clapton', 'Main Street 123', 'London', '24212 OP', '+44 0387-298121', 'Great-Britain', 'e.clapton@gmail.com');
//updateEmailAddress(3, 'kareltje@hotmail.com');
//updateName(5, 'De Blauwe', 'Gestel');
//updateAddress(6, 'Piraatstraat 40', 'Het Schip', '8880 YA', 'Maritiem');
//findById(2);
remove(8);
//remove(11);
//list();
