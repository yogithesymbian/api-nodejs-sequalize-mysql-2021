const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

global.__basedir = __dirname; // global path

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

console.log('run mode on : ', process.env.NODE_ENV);

// production
const db = require("./src/db/models");

// db.sequelize.sync();
db.sequelize.sync().then((req) => {
    // console.log('req model : ', req.models);
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to yogi arif widodo application." });
});

// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/question.routes")(app);

// const fs = require('fs');
// const path = require('path');
// const basename = path.basename(__filename);

// fs
//   .readdirSync(__dirname + '/app/routes')
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const data = require(path.join(__dirname + "/app/routes/", file));
// });

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
