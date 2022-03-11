const express = require("express");
const app = express();
var cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser')

app.use(express.json());
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '/')));


app.use(express.urlencoded({ extended: false }));


















//All controllers 

const projectController = require("./controllers/project.controller")
const taskController = require("./controllers/task.controller")
const userController = require("./controllers/user.controller")

app.use("/project", projectController);
app.use("/task", taskController);
app.use("/user", userController);




module.exports = app;