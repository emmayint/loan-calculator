const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");

const index = require('./routes/index');

const app = express();

const port = 4000;
app.use(cors());
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.listen(port, () => console.log(`server is listening on port ${port}!`));


module.exports = app;
