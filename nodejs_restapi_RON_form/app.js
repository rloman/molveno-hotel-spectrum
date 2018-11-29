// load our app server using express somehow...

const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('./public'))

app.use(morgan('short'))

app.post('/guests_create', (req, res) => {
  console.log("Trying to create a new guest...")
  console.log("How do we get the form data???")

  console.log("First name: " + req.body.create_firstName)

  const firstName = req.body.create_firstName
  const lastName = req.body.create_lastName
  const address = req.body.create_address
  const homeTown = req.body.create_homeTown
  const postalCode = req.body.create_postalCode
  const telephoneNumber = req.body.create_telephoneNumber
  const country = req.body.create_country
  const emailAddress = req.body.create_emailAddress

  const queryString = "INSERT INTO guests (firstName, lastName, address, homeTown, postalCode, telephoneNumber, country, emailAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  getConnection().query(queryString, [firstName, lastName, address, homeTown, postalCode, telephoneNumber, country, emailAddress], (err, results, fields) => {
    if (err) {
      console.log("Failed to insert a new guest: " + err)
      res.sendStatus(500)
      return
    }
    console.log("Inserted a new guest with id: ", results.insertId);
    res.end()
  })

})

function getConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'ron',
    password: 'ron2018!',
    database: 'molveno'

  })
}

app.get('/guests/:id', (req, res) => {
  console.log("Fetching guests with id: " + req.params.id)

  const connection = getConnection()


  const userId = req.params.id;
  const queryString = "SELECT * FROM guests WHERE ID = ?"
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      return
    }

    console.log("I think we fetched guests succesfully")

    //const users = rows.map((row) => {
    //return {FIRSTNAME: row.firstName}
    //})

    //res.json(users)
    res.json(rows)
  })

  //res.end()
})

app.get("/", (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from ROOOOT")
})

app.get("/users", (req, res) => {
  var user1 = {
    firstName: "Stephen",
    lastName: "Curry"
  }
  const user2 = {
    firstName: "Kevin",
    lastName: "Durant"
  }

  res.json([user1, user2])



  //res.send("Nodemon auto updates when I save this file")
})


// localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening on 3003...")
})
