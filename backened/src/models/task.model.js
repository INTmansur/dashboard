const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name : {type : String},
    description : {type : String},
    time : {type : String},
    assign_to : [{type : String}],
    status : {type : String},
    project_id : {type : String}
})


const Task = mongoose.model("task", taskSchema);

module.exports = Task