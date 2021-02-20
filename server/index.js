const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const PORT = 3001;

const {encrypt, decrypt} = require("./EncryptionManager");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Rootjose.$21', 
    database: 'PasswordManager',
});


app.get('/', (req, res) => {
    res.send("Hello World!! This is an app running nodejs on express!!");
});

app.post('/addpassword', (req, res) => {
   const {name, url, username, password} = req.body; 

   db.query(
       "INSERT INTO passwords (name, url, username, password) VALUES (?,?,?,?)",
       [name, url, username, password], 
       (err, result) => {
           if (err) {
               console.log(err);
            } else {
                res.send("Success");
            }
        }
    );
});

app.listen(PORT, () => {
    console.log('Server is running');
});