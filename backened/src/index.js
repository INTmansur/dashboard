const express = require("express");
const app = express();

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
//All controllers 

const projectController = require("./controllers/project.controller")
const taskController = require("./controllers/task.controller")
const userController = require("./controllers/user.controller")

app.use("/project", projectController);
app.use("/task", taskController);
app.use("/user", userController);




module.exports = app;