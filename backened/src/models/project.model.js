const mongoose = require("mongoose");




const projectSchema = new mongoose.Schema({
    title : {type : String},
    description : {type : String},
    task : [{
        taskId : {type : String}
    }]
})


const Project = mongoose.model("project", projectSchema);

module.exports = Project;