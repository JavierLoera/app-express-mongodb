const express = require("express");
const path = require('path');
const router = require('./routes/rutas.js')
const database = require('./dbConfig/database.js');
const dotenv = require('dotenv');

const app = express();

dotenv.config()

const port = process.env.PORT || 5000

database.configDatabase();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'node_modules')));


app.use(express.urlencoded({ extended: true }));



app.listen(port, (req, res) => {
    console.log(`Listening on http://localhost:${port}`);
});

app.use("/", router);