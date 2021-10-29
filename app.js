const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

// conex a mysql
var con = mysql.createConnection({
  host: "LocalHost",
  user: "root",
  password: "root",
  database: "becas"
});

// verificar conex
con.connect(function (err) {
  if (err) throw err;
  console.log("Conectado a bd");
});

app.get('/', (req, res) => {
  res.send('Ruta INICIO');
});

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, () => {
  console.log("Server Ok en puerto: " + puerto);
});

//todos los becados (lo reduje a 10)
app.get('/api/becados', (req, res) => {
  con.query("SELECT * FROM becas.datosaspirante LIMIT 10;", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//Mostrar nombre del becado por dni
app.get('/api/becados/:dni', (req, res) => {
  con.query("SELECT NombreApellido FROM becas.datosaspirante WHERE anio=2021 and dni=?;", [req.params.dni], function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// insertar en bd preInscripcion
app.post('/api/becados', (req, res) => {
  let data = { Apelnom: req.body.Apelnom, fechaNac: req.body.fechaNac, DNI: req.body.DNI, Telefono: req.body.Telefono, sexo: req.body.sexo, anio: req.body.anio, email: req.body.email }
  let sql = "INSERT INTO becas.preinscripcionbeca SET ?;";
  con.query(sql, data, function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      Object.assign(data,{id: result.insertId})
      res.send(data);
    }

  });
});