require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes");

// var morgan = require('morgan');
// var cors = require('cors');

// app.use(morgan('dev'));
// app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

//set up routes
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);
