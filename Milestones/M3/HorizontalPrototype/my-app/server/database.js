// Using Express to create API endpoints that will be accessed by the client-side react app
const express = require('express');

//This is to establish connectinn with database.
const mysql = require("mysql");

// This is to allow cross-origin requests. So that the client-side react app can access the API endpoints
const cors = require('cors');

const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());

// Creating a connection to the MySQL database
const db = mysql.createConnection({
  host: 'database-1.cjhdgriivebl.us-west-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'password1',
  database: 't6db',
  ssh: {
    host: 'ec2-50-18-108-83.us-west-1.compute.amazonaws.com',
    user: 'ubuntu',
    privateKey: fs.readFileSync("../../../../../credentials/key.pem"),
  },
});

db.connect((error) => {
  if(error){
    console.log('Error connecting to the MySQL Database', error);
    return;
  }
  console.log('Connection established sucessfully');
});

// CORS middleware to allow cross-origin requests
app.use(cors());


// API endpoint that returns all the users from the database
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM Users';
  db.query(sql, (error, result) => {
    if(error){
      console.error(error.message);
      return;
    }
    res.send(result);
  });
});


// API endpoint that registers a new user
app.post('/register', (req, res) => {
  const Ufirstname = req.body.Ufirstname;
  const Ulastname = req.body.Ulastname;
  const Uusername = req.body.Uusername;
  const Upassword = req.body.Upassword;
  const Uemail = req.body.Uemail;
  const sql = 'INSERT INTO Users (Ufirstname, Ulastname, Uusername, Upassword, Uemail) VALUES (?,?,?,?,?)';
  
  db.query(sql, 
    [Ufirstname, Ulastname, Uusername, Upassword, Uemail], 
    (error, result) => {
    if(error){
      console.error(error.message);
      return;
    }
    res.send(result);
  });
});


app.get('/login', (req, res) => {
  const Uusername = req.body.Uusername;
  const Upassword = req.body.Upassword;

  const sql = 'SELECT * FROM Users WHERE Uusername = ? AND Upassword = ?';
  
  db.query(sql, 
    [Uusername, Upassword], 
    (error, result) => {
    if(error){
      //res.send({err: error})
      console.error(error.message);
      return;
    }
    if (result.length > 0) {
      res.send(result);
    }
    else {
      res.send({message: "Username or Password not found"})
    }
  });
});

// API endpoint that returns all the tutors from the database
app.get('/tutors', (req, res) => {
  const sql = 'SELECT * FROM Tutors';
  db.query(sql, (error, result) => {
    if(error){
      console.error(error.message);
      return;
    }
    res.send(result);
  });
});

// API endpoint that returns a search retult for tutors from the database
app.get('/tutors/search', (req, res) => {
  const search = req.query.search;
  const sql = `SELECT * FROM Tutors WHERE TutorFirstName LIKE '%${search}%' OR TutorLastName LIKE '%${search}%'`;
  db.query(sql, (error, result) => {
    if (error) {
      console.error(error.message);
      return;
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});