const express = require("express")
const mysql = require('mysql')
const authorization = require('./db')
const cors = require("cors");

const app = express();
app.use(express.json())

const db = mysql.createConnection(authorization)

app.use(cors());


db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

app.get("/", (req, res) => {
    res.json({
        "type" : "success"
    })
})

app.get('/api/contacts' , (req, res, next)=>{
    db.query("select * from contact",
    function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.post('/api/contacts' , (req, res, next)=>{
    const donnee = "insert into contact (name, secondName, bio, groupe, imageUrl) values ?"
    const values = []
    if(req.body.name !== "" && req.body.secondName !== ""){
        values.push([req.body.name, req.body.secondName, req.body.bio, req.body.groupe, req.body.imageUrl])
    }
    console.log(values);
    db.query(donnee, [values] , function (err, result){
        if(err) throw err;
        console.log("One element inserted !" + result.insertId)
    })
    res.send({message : "reçu !"}) 
})

app.post('/api/contact', (req, res, next)=>{
    db.query(`select * from contact where id = ${req.body.id}` , (err, response) => {
        if(err) throw err;
        res.send(response)
    })
})





module.exports = app;