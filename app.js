const express = require("express")
const mysql = require('mysql')
const app = express();
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Birh-Cub_04",
    database: "mika"
})

const data = {};

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

app.get('/api/contacts' , (req, res, next)=>{
    db.query("select * from contact",
    function (err, result) {
        if (err) throw err;
        res.send(result)
    });
})

app.post('/api/create_contact' , (req, res, next)=>{
    const donnee = "insert into contact (name, second_name, bio, groupe) values ?"
    const values = [[req.body.name, req.body.second_name, req.body.bio, req.body.groupe]]
    console.log(values);
    db.query(donnee, [values] , function (err, result){
        if(err) throw err;
        console.log("One element inserted !" + result.insertId)
    })
    res.send({message : "reçu !"}) 
})




module.exports = app;