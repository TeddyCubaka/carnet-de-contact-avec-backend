const express = require("express")
const mysql = require('mysql')
const authorization = require('./db')
const cors = require("cors")

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

app.post('/api/create_contact' , (req, res, next)=>{
    const donnee = "insert into contact (name, secondName, bio, groupe) values ?"
    const values = [[req.body.name, req.body.second_name, req.body.bio, req.body.groupe]]
    console.log(values);
    db.query(donnee, [values] , function (err, result){
        if(err) throw err;
        console.log("One element inserted !" + result.insertId)
    })
    res.send({message : "reçu !"}) 
})





module.exports = app;