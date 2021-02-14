const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 3001;

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Rootjose', 
    database: 'PasswordManager',
});


app.get('/', (req, res) => {
    res.send("Hello Mundo from nodejs and express!!");
});


app.listen(PORT, () => {
    console.log('Server is running');
});