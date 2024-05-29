const express = require('express');
const app = express();

const db = require('./Models/db');

app.get("/", async (req, res) => {
    res.send("Página inicial - CONPAT2 ");

});

app.get("/cadastrar", async (req, res) => {
    res.send("Pagina cadastrar")

});


app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")

}); 
