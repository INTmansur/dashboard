const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    dateOfBirth : {type : String},
    sex : {type : String},
    bloodGroup : {type : String},
    contactNumber : {type : String},
    emergencyContactNumber : {type : String},
    presentAddress : {type : String},
    hobbies : {type : String},
    panNumber : {type : String},
    adharNumber : {type : String},
    motherTongue : {type : String},
    fatherName : {type : String},
    motherName : {type : String},
    role : {type : String},
    task : [{
        taskId : {type : String}
    }],
    project_create : {type : String},
    project_update : {type : String},
    project_delete : {type : String},
    task_create : {type : String},
    task_update : {type : String},
    task_delete : {type : String},
    user_create : {type : String},
    user_update : {type : String},
    user_delete : {type : String},
    role_update : {type : String},




    username : {type : String},
    password : {type : String},
})









userSchema.pre("save",function(next) {
    if(!this.isModified("password")) return next();
    var hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash;
    next();
})

userSchema.methods.checkPassword = function (password) {
    let match = bcryptjs.compareSync(password, this.password);
    return match;
}   









const User = mongoose.model("user", userSchema);


module.exports = User;