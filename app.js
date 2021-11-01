const express = require("express");
const path = require('path');
const router = require('./routes/rutas.js')
const database = require('./dbConfig/database.js');

require('dotenv').config({ path: '.env' })

const app = express();
const host = process.env.Host || '0.0.0.0';
const port = process.env.Port || 3000;

database.configDatabase();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'node_modules')));


app.use(express.urlencoded({ extended: true }));



app.listen(port, host, (req, res) => {
    console.log(`Listening on http://localhost:${port}`);
});

app.use("/", router);