const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3001;

const {encrypt, decrypt} = require("./EncryptionHandler.js");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', 
    database: 'passwordmanager',
});


app.post('/addpassword', (req, res) => {
    const {name, url, username, password} = req.body;
    const hashedPassword = encrypt(password);

    db.query( "INSERT INTO passwords (name, url, username, password, iv) VALUES (?,?,?,?,?)",[
        name, 
        url, 
        username, 
        hashedPassword.password, 
        hashedPassword.iv
    ], (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send('Success!!!')
        }
    });
});


app.get('/showpasswords', (req, res) => {
    db.query("SELECT * FROM passwords", (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }        
    });
});

app.post('/decryptpassword', (req, res)=> {
    res.send(decrypt(req.body));
});

// Servidor escuchando por el puerto previamente definido
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
